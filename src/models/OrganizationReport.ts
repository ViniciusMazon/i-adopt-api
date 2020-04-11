import connection from '../database/connection';

class OrganizationReport {

  async getGenderAndSize(specie: string, organization_id: number) {
    const query = `
      SELECT
        gender, size
      FROM
        iad.pets
      WHERE
        specie = '${specie}'
        AND organization_id = ${organization_id};
    `;
    const response = await connection.query(query);
    return response.rows;
  }

  async getApplicationStatus(specie: string, organization_id: number) {
    const query = `
      SELECT
        A.status
      FROM
        iad.applications
      AS A JOIN (
        SELECT
          id
        FROM
          iad.pets
        WHERE specie = '${specie}' AND organization_id = ${organization_id}
      ) AS P ON A.pet_id = P.id;
    `;

    const response = await connection.query(query);
    return response.rows;
  }

}

export = OrganizationReport;
