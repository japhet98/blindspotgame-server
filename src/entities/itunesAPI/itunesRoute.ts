import { Application } from "express";
import { Endpoints } from "../../contants/allEndpoints";
import ItunesController from "./itunesController";

module.exports = (app:Application) =>{
    app.get(`${Endpoints.itunes}/albums/:artistId`, ItunesController.getAlbumsByArtistId);
    app.get(`${Endpoints.itunes}/artists/starting`, ItunesController.getStartingArtist);
    app.get(`${Endpoints.itunes}/artists/:artistId`, ItunesController.getArtistById);
    app.get(`${Endpoints.itunes}/artists`, ItunesController.getArtists);
}