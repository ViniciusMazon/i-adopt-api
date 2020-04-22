import connection from '../database/connection';

class Types {

  async createTypes() {

    const query = `
      CREATE TYPE type_residence AS ENUM ('house','apartment','farm');
      CREATE TYPE status_type AS ENUM ('accept', 'new', 'adopted', 'canceled', 'rejected');
      CREATE TYPE marital_status AS ENUM ('single', 'married', 'divorced', 'widower');
      CREATE TYPE specie_type AS ENUM ('dog', 'cat');
      CREATE TYPE gender_type AS ENUM ('male', 'female');
      CREATE TYPE size_type AS ENUM ('small', 'medium', 'big');
    `;

    await connection.query(query);
  }
}

export = Types;
