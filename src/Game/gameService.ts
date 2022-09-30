import { itunesService } from '../ItunesAPI/itunesService';
import  mongoose  from 'mongoose';
import { gameRepository } from './gameRepository';
import { CreateGame, UpdateGame } from './gameTypes';

import { roundService } from '../Round/roundService';

class GameService{

    gameRepository:any;
    itunesService:any;
    roundService:any;
    constructor({gameRepository,itunesService,roundService}:any){
        this.gameRepository = gameRepository;
        this.itunesService = itunesService;
        this.roundService = roundService;
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
            return this.gameRepository.findMany({isComplete:true},"totalPoint","-1");
        } catch (error:any) {
            throw error;
        }
    }
    private     AddMoreAlbums(albums:any,count:number):any{
        if(count<3 && count>0){
            albums.push(albums[count-1]);
          return   this.AddMoreAlbums(albums,albums?.length);
        }else{
            return albums
        }
    }
    private   getAlbumIds(albums:any){
        return albums.map((album:any)=>{return album.collectionId})
    }
    private  getUnAnsweredQuestions(mainQuestions:any,deliveredQuestions:any){
        if(deliveredQuestions.length<=0) return mainQuestions;;
        let newQuestions:any =[];
        for(const mainQ of mainQuestions){
            //check if question is already answered;
            for(const deliQ of deliveredQuestions){
                if(mainQ.collectionId !==deliQ.albumId){
                    newQuestions.push(mainQ);
                }
            }
        }
        return newQuestions;
    }
  public async loadGamesWithQuestions(gameId:string){
     try {
        
        let albums:any
        const game = await gameService.getbyGameId(gameId);
    if(game!== null){
    let response = await this.itunesService.getRandomArtist();
            
    const _albums = await this.itunesService.getAlbumsByArtistId({artistId:response?.artistId});
       albums = await this.AddMoreAlbums(_albums,_albums?.length);
      
        const AlbumsIDs = this.getAlbumIds(albums);
      // return only questions that aren't showed to the user;
    const deliveredQuestions = await this.roundService.getAllRounds({$and:[{gameId:game._id},{albumId:{$in:AlbumsIDs}}]});
    const newQuestions = this.getUnAnsweredQuestions(albums,deliveredQuestions);
    albums = newQuestions;
    }
    
   return {
    albums,
    game
   };

           
        
     } catch (error:any) {
       throw error;
     }
    }

}


export const gameService = new GameService({gameRepository,itunesService,roundService});