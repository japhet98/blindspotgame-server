import {Request,Response,NextFunction} from 'express';
import { gameService } from './gameService';



export default class GameController{

     static async createGame(req:Request,res:Response,next:NextFunction){
       try {
        const ipAddress = req.ip;
              const {artistId} = req.body;
        const game = await gameService.createGame({ipAddress,artistId});
        res.status(201).json({message:"Game created successfully", data:game});
       } catch (error:any) {
        res.status(400).json({message:error?.message})
       }
    }
    static async geteGameById(req:Request,res:Response,next:NextFunction){
        
        try {
            const {id} = req.params;
                const game = await gameService.getbyGameId(String(id));
                
                res.status(200).json({message:game?"Game fetched successfully":"No game found", data:game});
            } catch (error:any) {
             res.status(400).json({message:error?.message})
            }
     }
     static async getCompletedGames(req:Request,res:Response,next:NextFunction){
        
        try {
          
                const games = await gameService.getCompletedGames();
                
                res.status(200).json({message:games?.length>0?"Games fetched successfully":"No game found", data:games});
            } catch (error:any) {
             res.status(400).json({message:error?.message})
            }
     }
    static async getIncompleteGame(req:Request,res:Response,next:NextFunction){ 
       try {
     

        const ipAddress = req.ip;

            const incompletedGame = await gameService.getIncompleteGame(ipAddress);

            res.status(200).json({message:incompletedGame?"Incompleted game fetched successfully":"No incompleted game found", data:incompletedGame});
        } catch (error:any) {
         res.status(400).json({message:error?.message})
        }
    }

    static async loadGamesWithQuestions(req:Request,res:Response,next:NextFunction){
     try {
        const {gameId} = req.params;
    const data = await gameService.loadGamesWithQuestions(gameId);
    
    res.json({
        data,
        message:"Question fetched successfully."
      })
     } catch (error:any) {
        res.status(400).json({message:error?.message});
     }
    }

    static async resetGame(req:Request,res:Response,next:NextFunction){ 
        try {
            const {gameId} = req.body;
              await gameService.resetGame(String(gameId));
                
                res.status(200).json({message:`Game with id ${gameId} is resetted successfully`});
            } catch (error:any) {
             res.status(400).json({message:error?.message})
            }
    }
}