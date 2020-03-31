import connection from '../database/connection';

class Types {
  async createTypes() {
    const query = `
    create type type_residence as enum ('house','apartment','farm');
    create type status_type as enum ('accept', 'new', 'adopted', 'canceled', 'rejected');
    create type marital_status as enum ('single', 'married', 'divorced', 'widower');
    create type specie_type as enum ('dog', 'cat');
    create type gender_type as enum ('male', 'female');
    create type size_type as enum ('small', 'medium', 'big');
    `;

    await connection.query(query);
  }
}

export = Types;
