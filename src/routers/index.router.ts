import express, { Request, Response } from "express";
import mainController, { League } from '../controllers/main.controller';
import ErrorApi from "../errors/errorApi";

const router = express.Router();

/**
     * GET /
     * @summary Welcome the client on my api
     * @return {ErrorApi} 500 - Wrong route
     * @return {string} 200 - success response - application/json
     * @return {ErrorApi} 500 - Internal Server Error - application/json
     */
router.get(('/'), (req: Request, res: Response) => {
     res.send("Allez l'OM");
})

/**
     * GET /{leagueId}
     * @summary Get all users in a specific league (the one with the choosen id)
     * @param {number} leagueId.path.required - League identifier - req.params.id
     * @return {League} 200 - success response - application/json
     * @return {ErrorApi} 500 - Wrong route
     * @return {ErrorApi} 400 - Bad request response - application/json
     * @return {ErrorApi} 404 - League not found - application/json
     * @return {ErrorApi} 500 - Internal Server Error - application/json
     */
// Get all users in specific league with id
router.get('/:leagueId', mainController.getUsersInLeague);

/**   
     * POST /newLeague
     * @summary Create a new league object and save it in database
     * @param {League}  request.body.required - New league infos input 
     * @return {ErrorApi} 500 - Wrong route
     * @return {League} 200 - success response - application/json
     * @return {ErrorApi} 500 - Internal Server Error - application/json
     */
// Create new league
router.post('/newleague', mainController.createOneLeague);

/**
     * PATCH /{teamId}
     * @summary Update team name with the given id
     * @param {number} teamId.path.required - Team identifier - req.params.id
     * @param {Team} request.body.required - New league infos input 
     * @return {ErrorApi} 500 - Wrong route
     * @return {League} 200 - success response - application/json
     * @return {ErrorApi} 500 - Internal Server Error - application/json
     */
// Update a team name with her id
router.patch('/:teamId', mainController.updateTeamName);

// Route API not found middleware
router.use(() => {
  throw new ErrorApi('Error. API Route Not Found');
});

export default router;