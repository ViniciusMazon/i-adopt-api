import connection from '../database/connection';

enum specie {
  dog = 'dog', cat = 'cat'
}

enum gender {
  male = 'male', female = 'female'
}

enum size {
  small = 'small', medium = 'medium', big = 'big'
}

interface IPetsData {
  name: string,
  specie: specie,
  gender: gender,
  size: size,
  price: number,
  id_image: number,
  organization_id: number,
  creation_date: Date
}

interface IPetsUpdate {
  id: number,
  name: string,
  specie: specie,
  gender: gender,
  size: size,
  price: number,
  id_image: number,
}

class Pets {

  async create_table() {
    const query = `
      create table if not exists iad.pets (
      id serial primary key,
      name varchar(25),
      specie specie_type,
      gender gender_type,
      size	size_type,
      price real,
      id_image integer references iad.petImages(id),
      organization_id integer references iad.organization(id),
      creation_date date
      );
    `;

    await connection.query(query);
  }

  async set(petData: IPetsData) {
    const query = {
      text: `insert into iad.pets (name, specie, gender, size, price, id_image, organization_id, creation_date) values($1, $2, $3, $4, $5, $6, $7, $8) returning *`,
      values: [petData.name, petData.specie, petData.gender, petData.size, petData.price, petData.id_image, petData.organization_id, petData.creation_date]
    }

    try {
      const response = await connection.query(query);
      return { status: 201, data: response.rows[0] };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async getAll(organization_id: number) {
    const query = `select p.*, i.url from iad.pets as p join iad.petimages as i on p.id_image = i.id where organization_id = ${organization_id}`;
    try {
      const data = await connection.query(query);
      return { status: 200, data: data.rows };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async get(id: number) {
    const query = `select p.*, i.url from iad.pets as p join iad.petimages as i on p.id_image = i.id where p.id = ${id}`;
    const data = await connection.query(query);
    console.log(data);
    return data.rows[0];
  }

  async edit(petUpdate: IPetsUpdate) {
    const query = `update iad.pets set
    name = '${petUpdate.name}',
    specie = '${petUpdate.specie}',
    gender = '${petUpdate.gender}',
    size = '${petUpdate.size}',
    price = '${petUpdate.price}',
    id_image = '${petUpdate.id_image}'
    where id = ${petUpdate.id} returning *`;

    try {
      const resonse = await connection.query(query);
      return { status: 200, data: resonse.rows[0]};
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async delete(id: number) {
    const query = `delete from iad.pets where id = ${id} `;
    try {
      await connection.query(query);
      return { status: 200, data: 'Pet successfully deleted' };
    } catch (error) {
      return { status: 200, data: error };
    }
  }
}

export = Pets;
