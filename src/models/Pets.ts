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
  image: string,
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
  image: string,
}

class Pets {

  async create_table() {
    const query = `
      create type specie_type as enum ('dog', 'cat');

      create type gender_type as enum ('male', 'female');

      create type size_type as enum ('small', 'medium', 'big');

      create table if not exists iad.pets (
      id serial primary key,
      name varchar(25),
      specie specie_type,
      gender gender_type,
      size	size_type,
      price real,
      image text,
      organization_id integer,
      creation_date date
      );
    `;

    await connection.query(query);
  }

  async set(petData: IPetsData) {
    const query = {
      text: `insert into iad.pets (name, specie, gender, size, price, image, organization_id, creation_date) values($1, $2, $3, $4, $5, $6, $7, $8)`,
      values: [petData.name, petData.specie, petData.gender, petData.size, petData.price, petData.image, petData.organization_id, petData.creation_date]
    }

    try {
      await connection.query(query);
      return { status: 201, data: petData };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async getAll() {
    const query = `select * from iad.pets`;
    try {
      const data = await connection.query(query);
      return { status: 200, data: data.rows };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async get(id: number) {
    const query = `select * from iad.pets where id = '${id}'`;
    const data = await connection.query(query);
    return data.rows[0]
  }

  async edit(petUpdate: IPetsUpdate) {
    const query = `update iad.pets set
    name = '${petUpdate.name}',
    specie = '${petUpdate.specie}',
    gender = '${petUpdate.gender}',
    size = '${petUpdate.size}',
    price = '${petUpdate.price}',
    image = '${petUpdate.image}'
    where id = ${petUpdate.id}`;

    try {
      await connection.query(query);
      return { status: 200, data: 'Pet edited successfully' };
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
