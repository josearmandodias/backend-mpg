import dbconnection from '../db/db.connection';
import { League, Team } from '../controllers/main.controller';

export default {
  /**
    * Get all users from specific league
    * @param {number} - Id of the league choosen by the user
    * @return {Object} 200 - success response - application/json
    * @return {Error} 500 - Internal Server Error - application/json
    */
  getAllUsersInLeague: async (leagueId: number) => {
    const cluster = await dbconnection();

    const id = 'mpg_league_' + Number(leagueId);
    
    let result = await cluster.query((`
      SELECT *
      FROM mpg
      WHERE id=$1;
    `), { parameters: [id] });
    
    const rows = result.rows[0];

    return rows;
  },
  /**
    * Create a league
    * @returns - A new league with specificities
    */
  createLeague: async (input: League) => {
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
  /**
    * Update a league
    * @returns - The choosen team with the id with the update from the user input
    */
  updateTeamName: async (input: Team, id: number) => {
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