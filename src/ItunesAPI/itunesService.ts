import axios from "axios";
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
    public async getArtists(artists:string="577675,909253,254183278500,115234"){
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
       
         return  this.getRandom(response?.data?.results,3);
        } catch (error:any) {
         throw error;
        }
     }
     public async getRandomArtist(){
      try {
       const response = await this.getArtists();
   
       return  this.getRandom(response,1)?.[0];
      } catch (error:any) {
       throw error;
      }
   }
   private     AddMore(arr:any,count:number):any{
      if(count<3 && count>0){
          arr.push(arr[0]);
        return   this.AddMore(arr,arr?.length);
      }else{
          return arr
      }
  }
   private getRandom(arr:any, n:number) {
      var result = new Array(n),
          len = arr.length,
          taken = new Array(len);
      if (n > len)
     {
      const _res = this.AddMore(arr,arr.length);
       this.getRandom(_res,_res?.length);
         }
      while (n--) {
        
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        
      }
      return result;
  }
    
}

export const itunesService = new ItunesService();
