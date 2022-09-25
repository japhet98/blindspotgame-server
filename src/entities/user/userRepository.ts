import { ID } from "../Base/baseType";
import { UserModel } from "./userModel";
import { CreateUser } from "./userTypes";

class UserRepository{
    userModel;
    constructor({UserModel}:any){
        this.userModel = UserModel;
    }

    public async create(params:CreateUser){
        return await this.userModel.create(params)
    }

    public async findById(id:ID){
        return await this.userModel.findById(id).populate("games");
    }
    public async findOne(params:object={}){
        return await this.userModel.findOne(params).populate("games")
    }
    public async findMany(params:object={}){
        return await this.userModel.find(params).populate("games");
    }
    public async deleteOne(params:object){
        return await this.userModel.updateOne(params,{
            $set: {isDelete:true}
        })
    }
    public async deleteMany(params:object){
        return await this.userModel.updateMany(params,{
            $set: {isDelete:true}
        })
             }
    public async updateOne(criteria:object,params:CreateUser){
        return  await this.userModel.updateOne(criteria,{
            $set: params
        })
    }
    public async updateMany(criteria:object,params:CreateUser){ 
           return await this.userModel.updateMany(criteria,{
            $set: params
        })
         }


}


export const userRepository = new UserRepository({UserModel});