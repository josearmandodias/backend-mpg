import express, { Request, Response } from "express";
import mainController from '../controllers/main.controller';

const router = express.Router();

router.get('/:leagueId', mainController.getUsersInLeague);

export default router;