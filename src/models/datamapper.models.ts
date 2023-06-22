import dbconnection from '../db/db.connection';
import { Post } from '../controllers/main.controller';

export default {
  getAllUsersInLeague: async (leagueId: number) => {
    try {
      const cluster = await dbconnection();

      const id = 'mpg_league_' + Number(leagueId);
      
      let result = await cluster.query((`
        SELECT *
        FROM mpg
        WHERE id=$1;
      `), { parameters: [id] });

      const rows = result.rows[0];

      return rows;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  createLeague: async (input: Post) => {
    const cluster = await dbconnection();

    const { id, name, description, adminId } = input;

    let result = await cluster.query((`
        INSERT INTO mpg (KEY, VALUE)
        VALUES ($1, 
        { 
          "id": $1, 
          "name": $2, 
          "description": $3, 
          "adminId": $4 
        })
        RETURNING *;
      `), { 
      parameters: 
        [
          id,
          name,
          description, 
          adminId
        ]
    });
      
      return result.rows[0];
  },

  updateTeamName: async (input: Post, id: number) => {
    const cluster = await dbconnection();

    const teamId = 'mpg_team_1_' + Number(id);

    const { name } = input;

    let result = await cluster.query((`
        UPDATE mpg
        USE KEYS $1
        SET name = $2
        RETURNING *;
      `), { 
      parameters: 
        [
          teamId,
          name,
        ]
    });

    return result.rows[0];
  }
}