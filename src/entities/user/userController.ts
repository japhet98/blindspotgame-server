import {Request,Response,NextFunction} from 'express';
import { gameService } from '../game/gameService';
import { userService } from './userService';

export default class UserController{

     static async createUser(req:Request,res:Response,next:NextFunction){
        try {
            const {username,gameId} = req.body;
            const game =await gameService.getbyGameId(gameId);
            let totalPoint =0;
            if( game){
                if(game.rounds?.length<5) return res.status(400).json({message:"Complete all rounds to create account"})
                const {rounds} = game;
                for(const round of rounds){
                    totalPoint += round?.point;
                }
            }
            
            let user = await userService.getbyUserName(username);
            let userId;
            if(!user){
                const newUser = await userService.createUser({username});
                userId = newUser._id;
                user = newUser;
            }
            else{
                userId = user?._id;
            }
          
           await gameService.updateGame(gameId,{userId,totalPoint,isComplete:true});
           let Newuser = await userService.getbyUserName(username);
           res.status(200).json({message:"User account created successfully", data:Newuser});
        } catch (error: any) {
            res.status(400).json({message:error?.message})
        }
     



    }

    static async me(req:Request,res:Response,next:NextFunction){
        try {
            const response = await userService.me(req.params.id);
            res.json({message:"Accoun fetched successfully",data:response})
        } catch (error:any) {
            res.status(400).json({message:error?.message});
        }
    }
}