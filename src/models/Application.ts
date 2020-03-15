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

  async get(id: number) {
    const query = `
    SELECT
    pe."name",
    pe.specie,
    pe.gender,
    pe."size",
    pe.price,
    "t".first_name,
    "t".last_name,
    "t".date_of_birth,
    "t".marital_status,
    "t".profession,
    ad.street,
    ad.neighborhood,
    ad.num,
    ad.city,
    ad.region,
    ad.zip_code,
    ad.type_of_residence,
    ad.adult_residents,
    ad.children_residents,
    ad.has_smokers,
    h.already_adopted,
    h.animals_home,
    h.animals_home_description,
    h.sick_animals_home,
    h.add_budget_spend,
    h.why_want_adopt,
    h.have_questions,
    co.area_code,
    co.phone,
    co.email,
    "a"."id" as id_application,
    "a".date_creation,
    "a".status,
    pe.image
    FROM
    iad.applications AS "a"
    JOIN iad.pets AS pe ON "a".pet_id = pe."id"
    JOIN iad.tutors AS "t" ON "a".tutor_id = "t"."id"
    JOIN iad.address AS ad ON "t".address_id = ad."id"
    JOIN iad.historics AS h ON "t".historic_id = h."id"
    JOIN iad.contacts AS co ON "t".contact_id = co."id"
    WHERE
    "a"."id" = ${id};
    `
    const data = await connection.query(query);
    return data.rows[0];
  }

  async setStatus(id: number, status: status_type) {
    const query = `update iad.applications set status = '${status}' where id = ${id};`;
    await connection.query(query);
  }

  async delete(id: number) {

  }

}

export = Application;
