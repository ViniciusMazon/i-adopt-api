import connection from '../database/connection';

enum Type_residence {
  house, apartment, farm
}

interface IAddressData {
  street: string,
  neighborhood: string,
  num: string,
  city: string,
  region: string,
  zip_code: string,
  type_of_residence: Type_residence,
  adult_residents: string,
  children_residents: string,
  has_smokers: boolean
}

class Address {
  async create_table() {
    const query = `
    create type type_residence as enum ('house','apartment','farm');
    create table if not exists iad.address (
        id serial primary key,
        street varchar(25) not null,
        neighborhood varchar(25) not null,
        num varchar(10) not null,
        city varchar(25) not null,
        region varchar(25) not null,
        zip_code varchar(10),
        type_of_residence type_residence not null,
        adult_residents varchar(3) not null,
        children_residents varchar(3) not null,
        has_smokers boolean not null
      );
    `;

    await connection.query(query);
  }

  async setAddress(addressData: IAddressData) {
    const query = {
      text: `insert into iad.address (
        street,
        neighborhood,
        num,
        city,
        region,
        zip_code,
        type_of_residence,
        adult_residents,
        children_residents,
        has_smokers
      ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      values: [
        addressData.street,
        addressData.neighborhood,
        addressData.num,
        addressData.city,
        addressData.region,
        addressData.zip_code,
        addressData.type_of_residence,
        addressData.adult_residents,
        addressData.children_residents,
        addressData.has_smokers
      ]
    }

    const result = await connection.query(query);
    return result.rows[0].id;
  }

  async getAddress(id: number) {
    const query = `select * from iad.address where id=${id}`
    const data = await connection.query(query);
    return data.rows[0];
  }
}

export = Address;
