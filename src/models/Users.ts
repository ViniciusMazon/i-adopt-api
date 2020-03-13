import connection from '../database/connection';

interface IUserData {
  first_name: string,
  last_name: string,
  organization: number,
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

class user {

  async create_table() {
    const query = `
      create table if not exists iad.users (
      id serial primary key,
      first_name varchar(25) not null,
      last_name varchar(25) not null,
      organization integer not null,
      email varchar(25) not null,
      hash_password varchar(25) not null
      )
    `;

    await connection.query(query);
  }

  async set(userData: IUserData) {
    const query = {
      text: `insert into iad.users (first_name, last_name, organization, email, hash_password, creation_date) values($1, $2, $3, $4, $5, $6)`,
      values: [userData.first_name, userData.last_name, userData.organization, userData.email, userData.hash_password, userData.creation_date]
    }

    try {
      await connection.query(query);
      return { status: 201, data: userData };
    } catch (error) {
      return { status: 200, data: error };
    }
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

export = user;
