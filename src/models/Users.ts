import connection from '../database/connection';

interface IUserData {
  first_name: string,
  last_name: string,
  organization_id: number,
  email: string,
  hash_password: string,
  creation_date: Date
}

interface IUserUpdate {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  // hash_password: string
}

class User {

  async create_table() {
    const query = `
      create table if not exists iad.users (
      id serial primary key,
      first_name varchar(25) not null,
      last_name varchar(25) not null,
      organization_id integer not null references iad.organization(id),
      email varchar(25) not null,
      hash_password varchar(100) not null,
      creation_date date not null
      )
    `;

    await connection.query(query);
  }

  async set(userData: IUserData) {
    const query = {
      text: `insert into iad.users (first_name, last_name, organization_id, email, hash_password, creation_date) values($1, $2, $3, $4, $5, $6) returning *`,
      values: [userData.first_name, userData.last_name, userData.organization_id, userData.email, userData.hash_password, userData.creation_date]
    }
    console.log(userData)
    const result = await connection.query(query);
    console.log(result)
    return result.rows[0];
  }

  async get(email: string) {
    const query = `select * from iad.users where email='${email}'`;
    const data = await connection.query(query);
    return data.rows[0]
  }

  async getAll() {
    const query = `select * from iad.users`;
    try {
      const data = await connection.query(query);
      return { status: 200, data: data.rows };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async edit(userUpdate: IUserUpdate) {
    const query = `update iad.users set
    first_name = '${userUpdate.first_name}',
    last_name = '${userUpdate.last_name}',
    email = '${userUpdate.email}',
    where id = ${userUpdate.id}`;

    try {
      await connection.query(query);
      return { status: 200, data: 'User edited successfully' };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async delete(id: number) {
    const query = `delete from iad.users where id = ${id} `;
    try {
      await connection.query(query);
      return { status: 200, data: 'User successfully deleted' };
    } catch (error) {
      return { status: 200, data: error };
    }
  }
}

export = User;
