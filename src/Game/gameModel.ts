import mongoose from 'mongoose';
import baseSchema from '../Common/baseSchema';
const Schema = mongoose.Schema;
const GameSchema = new Schema({
  ipAddress:{type:String, required:true},
userId:{type:mongoose.Types.ObjectId, ref:"User", required:false},
isResetted:{type:Boolean, default:false},
isComplete:{type:Boolean,default:false},
totalPoint:{type:Number, default:0},
artistId:{type:Number, required:true}
}, {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
})

GameSchema.add(baseSchema);
GameSchema.method('toJSON', function(){
    const obj:any = this.toObject();
    obj.id = obj._id
    return obj;
     
})

GameSchema.virtual("rounds",{
    ref:'Round',
    localField: '_id',
    foreignField: 'gameId',
    justOne: false
})

GameSchema.virtual("user",{
    ref:'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
})

GameSchema.virtual("attempts",{
    ref:'RoundAttempt',
    localField: '_id',
    foreignField: 'gameId',
    justOne: false
})

const GameModel = mongoose.model('Game',GameSchema);

export {
    GameModel 
}