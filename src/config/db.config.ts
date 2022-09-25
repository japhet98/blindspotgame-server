/**
 * Import Modules for DB connection
 */

import { appConfig } from "./app.config";
 const mongoose = require("mongoose");


 export default class DBConfiguration {
     //assign the mongodb url from the environment variable;
  static db:any= appConfig.DB.connectionString||"";
  static async connectDB(){
    await mongoose.connect(this.db, {
        useNewUrlParser: true,
    }, (err: any) => {
        if (err) return console.log(err);
        console.log("DB Connected")
    })
  }

 }
 


 
 
 

 
 