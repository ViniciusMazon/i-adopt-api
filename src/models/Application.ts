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

  async get(id: number, pet_name: string) {
    const query = `
      SELECT
        P.id as pet_id,
        P.name,
        P.specie,
        P.gender,
        P.size,
        P.price,
        PI.url as pet_url,
        T.id as tutor_id,
        T.first_name as tutor_name,
        T.last_name as tutor_last_name,
        T.date_of_birth,
        T.marital_status,
        T.profession,
        AD.street,
        AD.neighborhood,
        AD.num,
        AD.city,
        AD.region,
        AD.zip_code,
        AD.type_of_residence,
        AD.adult_residents,
        AD.children_residents,
        AD.has_smokers,
        H.already_adopted,
        H.animals_home,
        H.animals_home_description,
        H.sick_animals_home,
        H.add_budget_spend,
        H.why_want_adopt,
        H.have_questions,
        CO.area_code,
        CO.phone,
        CO.email,
        A.id as application_id,
        A.date_creation,
        A.status,
        P.id_image
      FROM
        iad.applications AS A
      JOIN iad.pets AS P ON A.pet_id = P.id
      JOIN iad.petimages AS PI on PI.id = P.id_image
      JOIN iad.tutors AS T ON A.tutor_id = T.id
      JOIN iad.address AS AD ON T.address_id = AD.id
      JOIN iad.historics AS H ON T.historic_id = H.id
      JOIN iad.contacts AS CO ON T.contact_id = CO.id
      WHERE A.id = ${id} OR P.name = '${pet_name}';
    `;
    const data = await connection.query(query);
    return data.rows;
  }

  async setStatus(id: number, status: status_type) {
    const query = `update iad.applications set status = '${status}' where id = ${id} returning id;`;
    return await connection.query(query);
  }

}

export = Application;
