import { ID } from "../Base/baseType";
import { UserModel } from "./userModel";
import { CreateUser } from "./userTypes";

class UserRepository{
    userModel;
    constructor({UserModel}:any){
        this.userModel = UserModel;
    }

    public  create(params:CreateUser){
        return  this.userModel.create(params)
    }

    public  findById(id:ID){
        return  this.userModel.findById(id).populate("games");
    }
    public  findOne(params:object={}){
        return  this.userModel.findOne(params).populate("games")
    }
    public  findMany(params:object={}){
        return  this.userModel.find(params).populate("games");
    }
    public  deleteOne(params:object){
        return  this.userModel.updateOne(params,{
            $set: {isDelete:true}
        })
    }
    public  deleteMany(params:object){
        return  this.userModel.updateMany(params,{
            $set: {isDelete:true}
        })
             }
    public  updateOne(criteria:object,params:CreateUser){
        return   this.userModel.updateOne(criteria,{
            $set: params
        })
    }
    public  updateMany(criteria:object,params:CreateUser){ 
           return  this.userModel.updateMany(criteria,{
            $set: params
        })
         }


}


export const userRepository = new UserRepository({UserModel});