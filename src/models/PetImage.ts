import connection from '../database/connection';

interface IPetsImage {
  name: string,
  size: Number,
  url: string,
  creation_date: Date
}

class PetImage {

  async create_table() {
    const query = `create table if not exists iad.petImages (
      id serial primary key,
      name varchar(50),
      size integer,
      url varchar(100),
      creation_date date
    );`;

    await connection.query(query);
  }

  async set(petImage: IPetsImage) {
    const query = {
      text: `insert into iad.petImages(name, size, url, creation_date) values($1, $2, $3, $4) returning id, url`,
      values: [petImage.name, petImage.size, petImage.url, petImage.creation_date]
    }

    const response = await connection.query(query);
    return response.rows[0];
  }

  async delete(id: number) {
    const query = `delete from iad.petimages where id = ${id}`;
    await connection.query(query);
  }

}

export = PetImage;
