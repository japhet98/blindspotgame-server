import {Request,Response,NextFunction} from 'express';
import { RoundType } from '../../contants/rounds';
import { userService } from '../user/userService';
import { roundService, roundAttemptService } from './roundService';
export default class RoundController{

     static async createRound(req:Request,res:Response,next:NextFunction){
      try {
        //check if round already exists
        const {gameId,album,artistName} = req.body;
        // console.log(req.body)
           //get all rounds for game {gameId};
           const rounds = await roundService.getAllRounds({gameId});
           const roundType =roundService.getRoundType(1+rounds?.length);
                //check and count round attempt;
                const roundCount = await roundService.countRounds({gameId});
        if(roundCount===5) return res.status(400).json({message:"Sorry, you have exhauted all five rounds for this game."}) 
        const round = await roundService.getRound({$or:[
          {$and:[{gameId},{roundType}]},
          {$and:[{gameId},{albumId:album?.collectionId}]}
        
        ]});
        if(round)return res.status(400).json({message:`You have already answered a question in ${roundType}`})
        
           const currentAttempt = await roundAttemptService.getRoundAttempt({gameId,roundType});
           let attemptId:any;
           let attemptLevel:number;
           if(currentAttempt === null){
            //create new round attempt for this game;
            attemptLevel =1;
          const _respon=  await roundAttemptService.createRoundAttempt({
              gameId,
              attemptLevel,
              roundType
            })
            attemptId = _respon._id;
           }
           else{
            attemptLevel=1+currentAttempt?.attemptLevel;
            attemptId = currentAttempt._id;
            // console.log(attemptLevel);
           }
           //check if its not the last attempt;
          
            if(album?.artistName !== artistName){
              if(attemptLevel <3){
                
          const data =     await roundAttemptService.updateRoundAttemptById(attemptId,{
                attemptLevel:attemptLevel
              });
        
              res.status(200).json({message:"Sorry! You' got this attempt wrong. Try again.", })
                        }         
                        else{
                        
                          //create new round;
                          const gameRound = await roundService.createRound({
                            gameId,
                            albumId:album?.collectionId,
                            roundType,
                            attemptLevel:attemptLevel+1,
                          })

                          res.status(201).json({message:"Round completed successfully", data:gameRound})
                        } 
           }
           else{

            ///Create new round;
            const gameRound = await roundService.createRound({
              gameId,
              albumId:album?.collectionId,
              roundType,
              attemptLevel,
            })

            res.status(201).json({message:"Round completed successfully", data:gameRound})
           }

      } catch (error:any) {
        res.status(400).json({message:error?.message})
      }

    }
}