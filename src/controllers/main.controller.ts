import dataMapper from '../models/datamapper.models';
import { Request, Response } from 'express';

export default {
  getUsersInLeague: async (req: Request, res: Response) => {
    try {
      const leagueId: number = parseInt(req.params.leagueId);
      const result = await dataMapper.getAllUsersInLeague(leagueId);
      const users = result.users;
      res.json({ users });
    } catch (err: any) {
      throw new Error(err);
    }
  },
}