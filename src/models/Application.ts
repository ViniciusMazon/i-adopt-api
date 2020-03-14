import connection from '../database/connection';

enum status_type {
  'accept', 'new', 'adopted', 'canceled', 'rejected'
}

interface IApplicationData {
  pet_id: number,
  tutor_id: number,
  date_creation: Date,
}

class Application {

  async create_table() {
    const query = `
    create type status_type as enum ('accept', 'new', 'adopted', 'canceled', 'rejected');

    create table if not exists iad.applications (
      id serial primary key,
      pet_id integer not null references iad.pets(id),
      tutor_id integer not null references iad.tutors(id),
      status status_type default 'new',
      date_creation date not null
    );
    `;

    await connection.query(query);
  }

  async set(applicationData: IApplicationData) {
    const query = {
      text: `insert into iad.applications (
        pet_id,
        tutor_id,
        date_creation
      ) values ($1, $2, $3)`,
      values: [
        applicationData.pet_id,
        applicationData.tutor_id,
        applicationData.date_creation
      ]
    }

    try {
      await connection.query(query);
      return { status: 201, data: applicationData };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async getAll() {
    const query = `select a.id as application_id, a.pet_id, p.name as pet_name, a.tutor_id, t.first_name as tutor_name, a.date_creation, a.status
    from iad.applications as a join iad.pets as p on a.pet_id = p.id
    join iad.tutors as t on a.tutor_id = t.id;`;
    try {
      const data = await connection.query(query);
      return { status: 200, data: data.rows };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async delete(id: number) {

  }

  async get(id: number) {
    const query = `select * from iad.application where id=${id}`
    const data = await connection.query(query);
    return data.rows[0];
  }
}

export = Application;
