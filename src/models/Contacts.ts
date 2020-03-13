import connection from '../database/connection';

interface IContactData {
  area_code: string,
  phone: string,
  email: string
}

class Contacts {

  async create_table() {
    const query = `
    create table if not exists iad.contacts (
      id serial primary key,
      area_code varchar(2),
      phone varchar(9),
      email varchar(25)
    )
    `;

    await connection.query(query);
  }

  async setContact(contactData: IContactData) {
    const query = {
      text: `insert into iad.contacts (
        area_code,
        phone,
        email
      ) values ($1, $2, $3) RETURNING id`,
      values: [
        contactData.area_code,
        contactData.phone,
        contactData.email
      ]
    }

    const result = await connection.query(query);
    return result.rows[0].id;
  }

  async getContact(id: number) {
    const query = `select * from iad.contacts where id=${id}`
    const data = await connection.query(query);
    return data.rows[0];
  }
}

export = Contacts;
