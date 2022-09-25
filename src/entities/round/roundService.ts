import  mongoose  from 'mongoose';
import { AttemptLevel, RoundType, RoundTypesNumbs } from '../../contants/rounds';
import { roundRepository,roundAttemptRepository } from './roundRepository';
import { CreateRound, CreateRoundAttempt, UpdateRoundAttempt } from './roundTypes';

class RoundService{

    roundRepository:any
    constructor({roundRepository}:any){
        this.roundRepository = roundRepository;
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
    
    public async createRound(round:CreateRound){
       try {
        const {attemptLevel} = round;
        const response  = this.getPoint(attemptLevel);
        console.log(response);
        round.point = response.point;
        round.isAnswered = response.isAnswered;
        return this.roundRepository.create(round);
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
export const roundService = new RoundService({roundRepository});
export const roundAttemptService = new RoundAttemptService({roundAttemptRepository});
