import { Application } from 'express';
module.exports = (app:Application)=>{
    require("../Game/gameRoute")(app);
    require("../Round/roundRoute")(app);
    require("../User/userRoute")(app);
    require("../ItunesAPI/itunesRoute")(app);

}