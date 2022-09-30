import  mongoose  from 'mongoose';
import { userRepository } from './userRepository';
import { CreateUser } from './userTypes';

class UserService{

    userRepository:any
    constructor({userRepository}:any){
        this.userRepository = userRepository;
    }

    public async createUser(user:CreateUser){
       try {
        return this.userRepository.create(user);
       } catch (error:any) {
        throw error;
       }
    }

    public async me(id:string){
    try {
        const _id = new mongoose.Types.ObjectId(id);
        return this.userRepository.findById(_id);
    } catch (error:any) {
        throw error;
    }
       
    }

    public async getbyUserName(userName:string){
        try {
            return this.userRepository.findOne({username:userName?.toLowerCase()});
        } catch (error:any) {
            throw error;
        }
    }

    public async getAllUsers(){
        try {
            return this.userRepository.findMany();
        } catch (error:any) {
            throw error;
        }
    }

}


export const userService = new UserService({userRepository});