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

  async getAll(organization_id: number, filters) {
    const query = `
      SELECT
        A.id AS application_id,
        A.pet_id,
        P.name AS pet_name,
        PI.url AS pet_url,
        A.tutor_id,
        T.first_name AS tutor_name,
        A.date_creation,
        A.status
      FROM
        iad.applications
        AS A JOIN iad.pets AS P ON A.pet_id = P.id
        JOIN iad.petimages AS PI ON P.id_image = PI.id
        JOIN iad.tutors AS T ON A.tutor_id = T.id
        WHERE P.organization_id = ${organization_id}
        AND A.status IN (${filters.status});
    `;

    const data = await connection.query(query);
    return data.rows;
  }

  async get(id: number) {
    const query = `
    SELECT
    pe."name",
    pe.specie,
    pe.gender,
    pe."size",
    pe.price,
		pi.url,
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
    pe.id_image
    FROM
    iad.applications AS "a"
    JOIN iad.pets AS pe ON "a".pet_id = pe."id"
		JOIN iad.petimages AS pi on "pi".id = pe."id_image"
    JOIN iad.tutors AS "t" ON "a".tutor_id = "t"."id"
    JOIN iad.address AS ad ON "t".address_id = ad."id"
    JOIN iad.historics AS h ON "t".historic_id = h."id"
    JOIN iad.contacts AS co ON "t".contact_id = co."id"
    WHERE
    "a"."id" = ${id};
    `;
    const data = await connection.query(query);
    return data.rows[0];
  }

  async setStatus(id: number, status: status_type) {
    const query = `update iad.applications set status = '${status}' where id = ${id} returning id;`;
    return await connection.query(query);
  }

}

export = Application;
