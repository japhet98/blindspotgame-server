import  mongoose  from 'mongoose';
import { AttemptLevel, RoundType, RoundTypesNumbs } from '../../contants/rounds';
import { roundRepository,roundAttemptRepository } from './roundRepository';
import { CreateRound, CreateRoundAttempt, UpdateRoundAttempt } from './roundTypes';

class RoundService{

    roundRepository:any;
    roundAttemptService:any;
    constructor({roundRepository,roundAttemptService}:any){
        this.roundRepository = roundRepository;
        this.roundAttemptService =roundAttemptService;
    }
    private getPoint(attemptedLevel:number){
        const pointMapper:any ={
            [AttemptLevel.levelOne]:{isAnswered:true,point:5},
            [AttemptLevel.levelTwo]:{isAnswered:true,point:3},
            [AttemptLevel.levelThree]:{isAnswered:true,point:1},
            [AttemptLevel.levelFour]:{isAnswered:false,point:0},

        }
        return pointMapper[attemptedLevel];
    }
    
    public getRoundType(roundCount:number){
        const roundTypeMapper:any ={
            [RoundTypesNumbs.One]:'First Round',
            [RoundTypesNumbs.Two]:'Second Round',
            [RoundTypesNumbs.Three]:'Third Round',
            [RoundTypesNumbs.Four]:'Fourth Round',
            [RoundTypesNumbs.Five]:'Final Round'

        }
        return roundTypeMapper[roundCount];
    }
    
    public async createRound(_round:CreateRound){
       try {
        const {gameId,album,artistName} = _round;
          //get all rounds for game {gameId};
          const rounds = await this.getAllRounds({gameId});
          const roundType =this.getRoundType(1+rounds?.length);
               //check and count round attempt;
               const roundCount = await this.countRounds({gameId});
               if(roundCount===5) return [false,"Sorry, you have exhauted all five rounds for this game."]
               const round = await this.getRound({$or:[
                {$and:[{gameId},{roundType}]},
                {$and:[{gameId},{albumId:album?.collectionId}]}
              
              ]});
              if(round)return [false,`You have already answered a question in ${roundType}`];
              
              const currentAttempt = await this.roundAttemptService.getRoundAttempt({gameId,roundType});
              let attemptId:any;
              let attemptLevel:number;
              if(currentAttempt === null){
               //create new round attempt for this game;
               attemptLevel =1;
             const _respon=  await this.roundAttemptService.createRoundAttempt({
                 gameId,
                 attemptLevel,
                 roundType
               })
               attemptId = _respon._id;
              }
              else{
               attemptLevel=1+currentAttempt?.attemptLevel;
               attemptId = currentAttempt._id;
              }

              const response  = this.getPoint(attemptLevel);
             const point = response.point;
             const isAnswered = response.isAnswered;
            
              //check if its not the last attempt;
              if(album?.artistName !== artistName){
                if(attemptLevel <3){
                  
           await this.roundAttemptService.updateRoundAttemptById(attemptId,{
                  attemptLevel:attemptLevel
                });
          
              return [false,"Sorry! You' got this attempt wrong. Try again."];
                          }         
                          else{
                          
                            //create new round;
                            return this.roundRepository.create({
                                gameId,
                                albumId:album?.collectionId,
                                roundType,
                                attemptLevel,
                                point:0,
                                isAnswered,
                              });
  
                   
                          } 
             }
             else{
  
              ///Create new round;
             
              return this.roundRepository.create({
                gameId,
                albumId:album?.collectionId,
                roundType,
                attemptLevel,
                point,
                isAnswered,
              });
             }

       } catch (error:any) {
        throw error;
       }
    }
    

   

    public async getbyRoundID(roundId:string){
        try {
            return this.roundRepository.findById(roundId);
        } catch (error:any) {
            throw error;
        }
    }

    public async getRound(round:object){
        try {
            return this.roundRepository.findOne(round);
        } catch (error:any) {
            throw error;
        }
    }

    public async getAllRounds(params={}){
        try {
            return this.roundRepository.findMany(params);
        } catch (error:any) {
            throw error;
        }
    }
    public async countRounds(params={}){
        try {
            return this.roundRepository.count(params);
        } catch (error:any) {
            throw error;
        }
    }

}




class RoundAttemptService{

    roundattemptRepository:any
    constructor({roundAttemptRepository}:any){
        this.roundattemptRepository = roundAttemptRepository;
    }
 
    public async createRoundAttempt(roundattempt:CreateRoundAttempt){
       try {
        
        return this.roundattemptRepository.create(roundattempt);
       } catch (error:any) {
        throw error;
       }
    }

   

    public async getbyRoundAttemptID(roundattemptId:string){
        try {
            return this.roundattemptRepository.findById(roundattemptId);
        } catch (error:any) {
            throw error;
        }
    }
    public async updateRoundAttemptById(roundattemptId:string,params:UpdateRoundAttempt){
        try {
            return this.roundattemptRepository.updateOne({_id:roundattemptId},params);
        } catch (error:any) {
            throw error;
        }
    }

    public async getRoundAttempt(roundattempt:object){
        try {
            return this.roundattemptRepository.findOne(roundattempt);
        } catch (error:any) {
            throw error;
        }
    }

    public async getAllRoundAttempts(params={}){
        try {
            return this.roundattemptRepository.findMany(params);
        } catch (error:any) {
            throw error;
        }
    }

}
export const roundAttemptService = new RoundAttemptService({roundAttemptRepository});
export const roundService = new RoundService({roundRepository,roundAttemptService});
