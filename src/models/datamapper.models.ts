import dbconnection from '../db/db.connection';

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
      const mpgObject: any = rows.mpg;

      let users: Array<any>;

      if(!mpgObject.usersTeams){
        users = [];
      } else {
        users = Object.keys(mpgObject.usersTeams);
      }

      return users;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}