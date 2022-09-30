import { ID } from "../Common/baseType";
import { RoundModel ,RoundAttemptModel} from "./roundModel";
import { CreateRound, CreateRoundAttempt } from "./roundTypes";

class RoundRepository{
    roundModel;
    constructor({RoundModel}:any){
        this.roundModel = RoundModel;
    }

    public  create(params:CreateRound){
        return  this.roundModel.create(params)
    }

    public  findById(id:ID){
        return  this.roundModel.getById(id);
    }
    public  findOne(params:object={}){
        return  this.roundModel.findOne(params)
    }
    public  findMany(params:object={}){
        return  this.roundModel.find(params);
    }
    public  deleteOne(params:object){
        return  this.roundModel.updateOne(params,{
            $set: {isDelete:true}
        })
    }
    public  count(params:object={}){
        return  this.roundModel.count(params);
    }
    public  deleteMany(params:object){
        return  this.roundModel.updateMany(params,{
            $set: {isDelete:true}
        })
             }
    public  updateOne(criteria:object,params:CreateRound){
        return   this.roundModel.updateOne(criteria,{
            $set: params
        })
    }
    public  updateMany(criteria:object,params:CreateRound){ 
           return  this.roundModel.updateMany(criteria,{
            $set: params
        })
         }


}

class RoundAttemptRepository{
    roundAttemptModel;
    constructor({RoundAttemptModel}:any){
        this.roundAttemptModel = RoundAttemptModel;
    }

    public  create(params:CreateRoundAttempt){
        return  this.roundAttemptModel.create(params)
    }

    public  findById(id:ID){
        return  this.roundAttemptModel.getById(id);
    }
    public  findOne(params:object={}){
        return  this.roundAttemptModel.findOne(params)
    }
    public  findMany(params:object={}){
        return  this.roundAttemptModel.find(params);
    }
    public  count(params:object={}){
        return  this.roundAttemptModel.count(params);
    }
    public  deleteOne(params:object){
        return  this.roundAttemptModel.updateOne(params,{
            $set: {isDelete:true}
        })
    }
    public  deleteMany(params:object){
        return  this.roundAttemptModel.updateMany(params,{
            $set: {isDelete:true}
        })
             }
    public  updateOne(criteria:object,params:CreateRoundAttempt){
        return   this.roundAttemptModel.updateOne(criteria,{
            $set: params
        })
    }
    public  updateMany(criteria:object,params:CreateRoundAttempt){ 
           return  this.roundAttemptModel.updateMany(criteria,{
            $set: params
        })
         }


}

export const roundRepository = new RoundRepository({RoundModel});
export const roundAttemptRepository = new RoundAttemptRepository({RoundAttemptModel});
