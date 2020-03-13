import connection from '../database/connection';


interface IHistoricData {
  already_adopted: boolean,
  animals_home: boolean,
  animals_home_description: string,
  sick_animals_home: boolean,
  add_budget_spend: boolean,
  why_want_adopt: string,
  have_questions: string
}

class Historics {
  async create_table() {
    const query = `
  create table if not exists iad.historics (
    id serial primary key,
    already_adopted boolean not null,
    animals_home boolean not null,
    animals_home_description varchar(15),
    sick_animals_home boolean not null,
    add_budget_spend boolean not null,
    why_want_adopt text not null,
    have_questions text
  );
    `;

    await connection.query(query);
  }

  async setHistoric(historicData: IHistoricData) {
    const query = {
      text: `insert into iad.historics (
        already_adopted,
        animals_home,
        animals_home_description,
        sick_animals_home,
        add_budget_spend,
        why_want_adopt,
        have_questions
      ) values ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      values: [
        historicData.already_adopted,
        historicData.animals_home,
        historicData.animals_home_description,
        historicData.sick_animals_home,
        historicData.add_budget_spend,
        historicData.why_want_adopt,
        historicData.have_questions
      ]
    }

    const result = await connection.query(query);
    return result.rows[0].id;
  }

  async getHistoric(id: number) {
    const query = `select * from iad.historics where id=${id}`
    const data = await connection.query(query);
    return data.rows[0];
  }
}

export = Historics;
