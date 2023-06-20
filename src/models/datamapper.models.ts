import dbconnection from '../db/db.connection';

export default {
  getAllUsersInLeague: async (leagueId: number) => {
    try {
      const cluster = await dbconnection();

      const id = 'mpg_league_' + leagueId;
    
      let result = await cluster.query((`
        SELECT *
        FROM mpg
        WHERE id=$1;
      `), {parameters: [id]});

      console.log(result);

      return result.rows[0];
    } catch (err: any) {
      throw new Error(err);
    }
  }
}