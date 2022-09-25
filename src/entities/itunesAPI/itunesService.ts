import axios from "axios";
import IItunesInterface from "./itunesInteface";
import _ from 'lodash';
const itunesLookUpEndpoint = "https://itunes.apple.com/lookup";
class ItunesService {


    public async getArtistById(artistId:string){
       try {
         const respose =  await axios.get(`${itunesLookUpEndpoint}?id=${artistId}`);
    return respose.data?.results;
       } catch (error:any) {
        throw error;
       }

    }
    public async getArtists(artists:string="2541832,577675,909253,78500,115234"){
        try {
     const response =  await axios.get(`${itunesLookUpEndpoint}?id=${artists}`);

     return response.data?.results;
        } catch (error:any) {
         throw error;
        }
     }
     public async getAlbumsByArtistId({limit=100,artistId}:any){
        try {
        
         const response = await axios.get(`${itunesLookUpEndpoint}?id=${artistId}&entity=album&limit=${limit}`);
       
         return  this.getShaffuledData(response?.data?.results)?.slice(-3);
        } catch (error:any) {
         throw error;
        }
     }
     public async getRandomArtist(){
      try {
       const response = await this.getArtists();
   
       return  this.getShaffuledData(response)?.[0];
      } catch (error:any) {
       throw error;
      }
   }

   public  getShaffuledData(data:any){
     
      return  _.shuffle(data);
   }
    
}

export const itunesService = new ItunesService();
