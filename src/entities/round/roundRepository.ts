import { ID } from "../Base/baseType";
import { RoundModel ,RoundAttemptModel} from "./roundModel";
import { CreateRound, CreateRoundAttempt } from "./roundTypes";

class RoundRepository{
    roundModel;
    constructor({RoundModel}:any){
        this.roundModel = RoundModel;
    }

    public async create(params:CreateRound){
        return await this.roundModel.create(params)
    }

    public async findById(id:ID){
        return await this.roundModel.getById(id);
    }
    public async findOne(params:object={}){
        return await this.roundModel.findOne(params)
    }
    public async findMany(params:object={}){
        return await this.roundModel.find(params);
    }
    public async deleteOne(params:object){
        return await this.roundModel.updateOne(params,{
            $set: {isDelete:true}
        })
    }
    public async count(params:object={}){
        return await this.roundModel.count(params);
    }
    public async deleteMany(params:object){
        return await this.roundModel.updateMany(params,{
            $set: {isDelete:true}
        })
             }
    public async updateOne(criteria:object,params:CreateRound){
        return  await this.roundModel.updateOne(criteria,{
            $set: params
        })
    }
    public async updateMany(criteria:object,params:CreateRound){ 
           return await this.roundModel.updateMany(criteria,{
            $set: params
        })
         }


}

class RoundAttemptRepository{
    roundAttemptModel;
    constructor({RoundAttemptModel}:any){
        this.roundAttemptModel = RoundAttemptModel;
    }

    public async create(params:CreateRoundAttempt){
        return await this.roundAttemptModel.create(params)
    }

    public async findById(id:ID){
        return await this.roundAttemptModel.getById(id);
    }
    public async findOne(params:object={}){
        return await this.roundAttemptModel.findOne(params)
    }
    public async findMany(params:object={}){
        return await this.roundAttemptModel.find(params);
    }
    public async count(params:object={}){
        return await this.roundAttemptModel.count(params);
    }
    public async deleteOne(params:object){
        return await this.roundAttemptModel.updateOne(params,{
            $set: {isDelete:true}
        })
    }
    public async deleteMany(params:object){
        return await this.roundAttemptModel.updateMany(params,{
            $set: {isDelete:true}
        })
             }
    public async updateOne(criteria:object,params:CreateRoundAttempt){
        return  await this.roundAttemptModel.updateOne(criteria,{
            $set: params
        })
    }
    public async updateMany(criteria:object,params:CreateRoundAttempt){ 
           return await this.roundAttemptModel.updateMany(criteria,{
            $set: params
        })
         }


}

export const roundRepository = new RoundRepository({RoundModel});
export const roundAttemptRepository = new RoundAttemptRepository({RoundAttemptModel});
