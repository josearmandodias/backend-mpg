import express, { Request, Response, NextFunction } from "express";
import mainController from '../controllers/main.controller';
import ErrorApi from "../errors/errorApi";

const router = express.Router();

// Get all users in specific league with id
router.get('/:leagueId', mainController.getUsersInLeague);
// Create new league
router.post('/newleague', mainController.createOneLeague);
// Update a team name with hher id
router.patch('/:teamId', mainController.updateTeamName);

// Route API not found middleware
router.use(() => {
  throw new ErrorApi('Error. API Route Not Found');
});

export default router;