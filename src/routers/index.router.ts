import express, { Request, Response } from "express";
import mainController from '../controllers/main.controller';

const router = express.Router();

// Get all users in specific league with id
router.get('/:leagueId', mainController.getUsersInLeague);
// Create new league
router.post('/newleague', mainController.createOneLeague);

export default router;