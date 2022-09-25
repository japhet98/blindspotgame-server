import { ID } from "../Base/baseType";
import { GameModel } from "./gameModel";
import { CreateGame } from "./gameTypes";

class GameRepository{
    GameModel;
    constructor({GameModel}:any){
        this.GameModel = GameModel;
    }

    public async create(params:CreateGame){
        return await this.GameModel.create(params)
    }

    public async findById(id:ID){
        return await this.GameModel.findById(id)
        .populate("rounds").populate("user").populate("attempts");
    }
    public async findOne(params:object={}){
        return await this.GameModel.findOne(params).populate("rounds").populate("user").populate("attempts");
    }
    public async findMany(params:object={},sortBy:any=null,orderBy:any=null){
        return await this.GameModel.find(params).populate("rounds").populate("user").populate("attempts").sort({[sortBy]:orderBy});
    }
    public async deleteOne(params:object){
        return await this.GameModel.updateOne(params,{
            $set: {isDelete:true}
        })
    }
    public async deleteMany(params:object){
        return await this.GameModel.updateMany(params,{
            $set: {isDelete:true}
        })
             }
    public async updateOne(criteria:object,params:CreateGame){
        return  await this.GameModel.updateOne(criteria,{
            $set: params
        })
    }
    public async updateMany(criteria:object,params:CreateGame){ 
           return await this.GameModel.updateMany(criteria,{
            $set: params
        })
         }


}


export const gameRepository = new GameRepository({GameModel});