import dataMapper from '../models/datamapper.models';
import express, { Request, Response } from 'express';

export default {
  getAll: async (req: Request, res: Response) =>{
    const result = await dataMapper.findAll()
    console.log(result);
  },
}