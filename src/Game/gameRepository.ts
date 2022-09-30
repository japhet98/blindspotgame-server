import { ID } from "../Common/baseType";
import { GameModel } from "./gameModel";
import { CreateGame } from "./gameTypes";

class GameRepository{
    GameModel;
    constructor({GameModel}:any){
        this.GameModel = GameModel;
    }

    public  create(params:CreateGame){
        return  this.GameModel.create(params)
    }

    public  findById(id:ID){
        return  this.GameModel.findById(id)
        .populate("rounds").populate("user").populate("attempts");
    }
    public  findOne(params:object={}){
        return  this.GameModel.findOne(params).populate("rounds").populate("user").populate("attempts");
    }
    public  findMany(params:object={},sortBy:any=null,orderBy:any=null){
        return  this.GameModel.find(params).populate("rounds").populate("user").populate("attempts").sort({[sortBy]:orderBy});
    }
    public  deleteOne(params:object){
        return  this.GameModel.updateOne(params,{
            $set: {isDelete:true}
        })
    }
    public  deleteMany(params:object){
        return  this.GameModel.updateMany(params,{
            $set: {isDelete:true}
        })
             }
    public  updateOne(criteria:object,params:CreateGame){
        return   this.GameModel.updateOne(criteria,{
            $set: params
        })
    }
    public  updateMany(criteria:object,params:CreateGame){ 
           return  this.GameModel.updateMany(criteria,{
            $set: params
        })
         }


}


export const gameRepository = new GameRepository({GameModel});