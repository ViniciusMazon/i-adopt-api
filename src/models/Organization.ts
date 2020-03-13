import connection from '../database/connection';

interface IOrganizationData {
  name: string
}

interface IOrganizationUpdate {
  id: number,
  name: string
}

class Organization {
  async create_table() {
    const query = `
      create table if not exists iad.organization (
      id serial primary key,
      name varchar(25) not null
      )
    `;

    await connection.query(query);
  }


  async set(organizationData: IOrganizationData) {
    const query = {
      text: `insert into iad.organization (name) values($1)`,
      values: [organizationData.name]
    }

    try {
      await connection.query(query);
      return { status: 201, data: organizationData };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async get(name: string) {
    const query = `select * from iad.organization where name='${name}'`;
    const data = await connection.query(query);
    return data.rows[0]
  }

  async getAll() {
    const query = `select * from iad.organization`;
    try {
      const data = await connection.query(query);
      return { status: 200, data: data.rows };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async edit(organizationUpdate: IOrganizationUpdate) {
    const query = `update iad.organization set
    name = '${organizationUpdate.name}'
    where id = ${organizationUpdate.id}`;

    try {
      await connection.query(query);
      return { status: 200, data: 'Organization edited successfully' };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async delete(id: number) {
    const query = `delete from iad.organization where id = ${id} `;
    try {
      await connection.query(query);
      return { status: 200, data: 'Organization successfully deleted' };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

}

export = Organization;
