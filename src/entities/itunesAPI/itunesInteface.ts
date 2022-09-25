

export default interface IItunesInterface{
    getArtistById(artistId:string):any
    getArtists(artists:string):any
    getAlbumsByArtistId({limit,artistId}:any):any
}