import dataMapper from '../models/datamapper.models';
import { Request, Response } from 'express';

export interface Post {
  id: string,
  name: string,
  description: string,
  adminId: number
}

export default {
  getUsersInLeague: async (req: Request, res: Response) => {
    try {
      const leagueId: number = parseInt(req.params.leagueId);
      const result = await dataMapper.getAllUsersInLeague(leagueId);
      
      if(!result.mpg){
        result.mpg = {}
      }

      const mpgObject: any = result.mpg;

      let users: Array<any>;

      if(!mpgObject.usersTeams){
        users = [];
      } else {
        users = [];

        const keys = Object.keys(mpgObject.usersTeams);

        for(const key in keys){
          const obj = { name: keys[key] }
          users.push(obj);
        } 
      }

      res.json({ users });
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  createOneLeague: async (req: Request, res: Response) => {
    try {
      const input: Post = req.body;

      const result = await dataMapper.createLeague(input);

      if (!result) {
        res.status(500).send('Internal Server Error');
      }
      
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
}