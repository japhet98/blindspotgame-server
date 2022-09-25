import { roundService } from './../round/roundService';
import {Request,Response,NextFunction} from 'express';
import { itunesService } from '../itunesAPI/itunesService';
import { gameService } from './gameService';

export default class GameController{

     static async createGame(req:Request,res:Response,next:NextFunction){
       try {
        const ipAddress = req.ip;
        const {artistId} = req.body;
        const game = await gameService.createGame({ipAddress,artistId});
        res.status(200).json({message:"Game created successfully", data:game});
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
            const incompletedGame = await gameService.getIncompleteGame(String(ipAddress));
            
            res.status(200).json({message:incompletedGame?"Incompleted game fetched successfully":"No incompleted game found", data:incompletedGame});
        } catch (error:any) {
         res.status(400).json({message:error?.message})
        }
    }
  private  static   AddMoreAlbums(albums:any,count:number):any{
        if(count<3 && count>0){
            albums.push(albums[count-1]);
          return   this.AddMoreAlbums(albums,albums?.length);
        }else{
            return albums
        }
    }
    private static  getAlbumIds(albums:any){
        return albums.map((album:any)=>{return album.collectionId})
    }
    private static getUnAnsweredQuestions(mainQuestions:any,deliveredQuestions:any){
        if(deliveredQuestions.length<=0) return mainQuestions;;
        // console.log("HYYY")
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
    static async loadGamesWithQuestions(req:Request,res:Response,next:NextFunction){
     try {
        const {gameId} = req.params;
        let albums:any
        const game = await gameService.getbyGameId(gameId);
    if(game!== null){
       
    //   artistAlbums = await itunesService.getAlbumsByArtistId({artistId:game.artistId});
    let response = await itunesService.getRandomArtist();
            
    const _albums = await itunesService.getAlbumsByArtistId({artistId:response?.artistId});

    
       albums = await GameController.AddMoreAlbums(_albums,_albums?.length);
      
        const AlbumsIDs = GameController.getAlbumIds(albums);
      // return only questions that aren't showed to the user;
    const deliveredQuestions = await roundService.getAllRounds({$and:[{gameId:game._id},{albumId:{$in:AlbumsIDs}}]});
    const newQuestions = GameController.getUnAnsweredQuestions(albums,deliveredQuestions);
    albums = newQuestions;
    }
    
    res.json({
        data:{
            albums,
            game
        },
        message:"Question fetched successfully."
      })
     } catch (error:any) {
        res.status(40).json({message:error?.message});
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