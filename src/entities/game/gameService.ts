import  mongoose  from 'mongoose';
import { gameRepository } from './gameRepository';
import { CreateGame, UpdateGame } from './gameTypes';

class GameService{

    gameRepository:any
    constructor({gameRepository}:any){
        this.gameRepository = gameRepository;
    }

    public async createGame(game:CreateGame){
       try {
        return this.gameRepository.create(game);
       } catch (error:any) {
        throw error;
       }
    }

    public async getIncompleteGame(ipAddress:string){
        try {
            
            return this.gameRepository.findOne({$and:[{isComplete:false},{isResetted:false},{ipAddress}]});
        } catch (error:any) {
            throw error;
        }
    }
    public async resetGame(gameId:string){
        try {
            const game = await this.getbyGameId(gameId);
            if(!game) throw new Error("Game not found");
            return this.gameRepository.updateOne({_id:gameId},{isResetted:true})
        } catch (error:any) {
            throw error;
        }
    }

    public async updateGame(id:string,params:UpdateGame){
    try {
        const _id = new mongoose.Types.ObjectId(id);
        return this.gameRepository.updateOne({_id},params);
    } catch (error:any) {
        throw error;
    }
       
    }

    public async getbyGameId(gameId:string){
        try {
            return this.gameRepository.findById(new mongoose.Types.ObjectId(gameId));
        } catch (error:any) {
            throw error;
        }
    }

    public async getAllGames(){
        try {
            return this.gameRepository.findMany();
        } catch (error:any) {
            throw error;
        }
    }
    public async getCompletedGames(){
        try {
            return this.gameRepository.findMany({isCompleted:true},"totalPoint","-1");
        } catch (error:any) {
            throw error;
        }
    }

}


export const gameService = new GameService({gameRepository});