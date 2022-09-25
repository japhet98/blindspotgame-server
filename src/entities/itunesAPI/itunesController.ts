import {Request,Response,NextFunction} from 'express';
import {itunesService  } from './itunesService';

export default class ItunesController{
   public static async getArtistById(req:Request,res:Response,next:NextFunction){
        try {
            const response:any = await itunesService.getArtistById(req.params.artistId);
            if(response){
                const albums = await itunesService.getAlbumsByArtistId({artistId:req.params.artistId});
                response[0].albums = albums;
            }
            return res.status(200).json({message:"Artist fetched successfully", data:response?.[0]})
        } catch (error:any) {
            res.status(400).json({message:error?.message})
        }
    }
   public static async getArtists(req:Request,res:Response,next:NextFunction){
        try {
           
            const response = await itunesService.getArtists();
            return res.status(200).json({message:"Artists fetched successfully", data:response})
        } catch (error:any) {
            res.status(400).json({message:error?.message})
        }
    }
    public static async getStartingArtist(req:Request,res:Response,next:NextFunction){
        try {
           
            let response = await itunesService.getRandomArtist();
            
            const albums = await itunesService.getAlbumsByArtistId({artistId:response?.artistId});
            response.albums = albums;
            return res.status(200).json({message:"Artist fetched successfully", data:response})
        } catch (error:any) {
            res.status(400).json({message:error?.message})
        }
    }
  public static async  getAlbumsByArtistId(req:Request,res:Response,next:NextFunction){
        try {
            const response = await itunesService.getAlbumsByArtistId(req.params.artistId);
            return res.status(200).json({message:"Albums fetched successfully", data:response})
        } catch (error:any) {
            res.status(400).json({message:error?.message})
        }
    }


}