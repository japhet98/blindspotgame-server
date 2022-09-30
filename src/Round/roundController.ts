import {Request,Response,NextFunction} from 'express';

import { roundService } from './roundService';
export default class RoundController{

     static async createRound(req:Request,res:Response,next:NextFunction){
      try {
        const response = await roundService.createRound(req.body);
        if(response?.[0]===false) return res.status(400).json({message:response?.[1]});
           res.status(201).json({message:"Round completed successfully", data:response})
      } catch (error:any) {
        res.status(400).json({message:error?.message})
      }

    }
}