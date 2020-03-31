import connection from '../database/connection';

enum marital_status {
  single, married, divorced, widower
}

interface ITutorData {
  first_name: string,
  last_name: string,
  profession: string,
  date_of_birth: Date,
  marital_status: marital_status,
  address_id: number,
  contact_id: number,
  historic_id: number
}

class Tutors {

  async create_table() {
    const query = `
    create table if not exists iad.tutors (
          id serial primary key,
          first_name varchar(25) not null,
          last_name varchar(25) not null,
          profession varchar(12) not null,
          date_of_birth date not null,
          marital_status marital_status not null,
          address_id integer not null references iad.address(id),
          contact_id integer not null references iad.contacts(id),
          historic_id integer not null references iad.historics(id)
          );
    `;

    await connection.query(query);
  }

  async setTutor(tutorData: ITutorData) {
    const query = {
      text: `insert into iad.tutors (
        first_name,
        last_name,
        profession,
        date_of_birth,
        marital_status,
        address_id,
        contact_id,
        historic_id
      ) values ($1, $2, $3, $4, $5, $6, $7, $8)`,
      values: [
        tutorData.first_name,
        tutorData.last_name,
        tutorData.profession,
        tutorData.date_of_birth,
        tutorData.marital_status,
        tutorData.address_id,
        tutorData.contact_id,
        tutorData.historic_id
      ]
    }

    try {
      await connection.query(query);
      return { status: 201, data: tutorData };
    } catch (error) {
      return { status: 200, data: error };
    }
  }

  async getTutor(id: number) {
    const query = `select * from iad.tutors where id=${id}`
    const data = await connection.query(query);
    return data.rows[0];
  }
}

export = Tutors;
