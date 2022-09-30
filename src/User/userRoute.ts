import { Application } from "express";
import { Endpoints } from "../contants/allEndpoints";
import UserController from "./userController";

module.exports = (app:Application) =>{
    app.post(`${Endpoints.users}`, UserController.createUser);
    app.get(`${Endpoints.users}/:id`, UserController.me);

}