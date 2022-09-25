import { Application } from "express";
import { Endpoints } from "../../contants/allEndpoints";
import RoundController from "./roundController";

module.exports = (app:Application) =>{
    app.post(`${Endpoints.rounds}`, RoundController.createRound);
   
}