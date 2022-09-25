import { Application } from 'express';
module.exports = (app:Application)=>{
    require("../game/gameRoute")(app);
    require("../round/roundRoute")(app);
    require("../user/userRoute")(app);
    require("../itunesAPI/itunesRoute")(app);

}