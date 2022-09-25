import mongoose from 'mongoose';
import baseSchema from '../Base/baseSchema';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:{type:String, unique:true, required:true, lowercase:true},
    
}, {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
})
UserSchema.add(baseSchema);
UserSchema.method('toJSON', function(){
    const obj:any = this.toObject();
    obj.id = obj._id
    return obj;
     
})
UserSchema.virtual("games",{
    ref:'Game',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
})
const UserModel = mongoose.model('User',UserSchema);

export {
    UserModel 
}