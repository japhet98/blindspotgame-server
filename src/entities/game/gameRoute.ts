import { Application } from "express";
import { Endpoints } from "../../contants/allEndpoints";
import { IpAddressMiddleware } from "../Base/baseMiddleware";
import GameController from "./gameController";

module.exports = (app:Application) =>{

    app.post(`${Endpoints.games}/reset`,GameController.resetGame);
    app.post(`${Endpoints.games}`, GameController.createGame);
    app.get(`${Endpoints.games}/me/incompleted`,GameController.getIncompleteGame);
    app.get(`${Endpoints.games}/completed`,GameController.getCompletedGames);
    app.get(`${Endpoints.games}/game-questions/:gameId`,GameController.loadGamesWithQuestions);
    app.get(`${Endpoints.games}/:id`,GameController.geteGameById);
   
}