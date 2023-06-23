import dataMapper from '../models/datamapper.models';
import { Request, Response } from 'express';

/**
 * @typedef {object} League
 * @property {string} id - League Id
 * @property {string} name - League name
 * @property {string} description - Random description
 * @property {string} adminId - User Id
 */

export interface League {
  id: string,
  name: string,
  description?: string,
  adminId: number
}

/**
 * @typedef {object} Team
 * @property {string} id - League Id
 * @property {string} name - Team name
 * @property {string} type - Team type
 */

export interface Team {
  id: string,
  name: string,
  type: string
}

export default {
  /**
   * Controller to get all users in specific league.
   * ExpressMiddleware signature
   * @param {object} req Express req.object
   * @param {object} res Express response object
   * @returns Object with a "name" array and objects with a name property
   */
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
  /**
   * Controller create a league.
   * ExpressMiddleware signature
   * @param {object} req Express req.object
   * @param {object} res Express response object
   * @returns League object with all the new league's properties
   */
  createOneLeague: async (req: Request, res: Response) => {
    try {
      const input: League = req.body;

      if(!input.adminId || !input.description || !input.name || !input.id){
        res.status(500).send('Internal Server Error. Missing property');
      }

      const result = await dataMapper.createLeague(input);

      if (!result) {
        res.status(500).send('Internal Server Error');
      }
      
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  /**
   * Controller to update a specific team with with her id
   * ExpressMiddleware signature
   * @param {object} req Express req.object
   * @param {object} res Express response object
   * @returns Team object with the team name freshsly updated
   */
  updateTeamName: async (req: Request, res: Response) => {
    try {
      const teamId: number = parseInt(req.params.teamId);
      const userInput = req.body;

      if(!userInput){
        res.status(500).send('Internal Server Error. Property missing');
      }

      const result = await dataMapper.updateTeamName(userInput, teamId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
}