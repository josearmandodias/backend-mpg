import dataMapper from '../models/datamapper.models';
import { Request, Response } from 'express';

export default {
  getUsersInLeague: async (req: Request, res: Response) => {
    const leagueId: number = parseInt(req.params.leagueId);
    const result = await dataMapper.getAllUsersInLeague(leagueId);
  },
}