import mongoose from 'mongoose';
import { AttemptLevel, RoundType } from '../../contants/rounds';
import baseSchema from '../Base/baseSchema';
const Schema = mongoose.Schema;
const RoundSchema = new Schema({
    point:{type:Number},
    gameId:{type:mongoose.Types.ObjectId, ref:"Game"},
    roundType:{type:String, enum:RoundType},
    attemptLevel:{type:Number, enum:AttemptLevel},
    isAnswered:{type:Boolean,},
    albumId:{type:Number,required:true}
    
    
}, {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
})


const RoundAttemptSchema = new Schema({
    // _id:{type:mongoose.Types.ObjectId, required:true},
    gameId:{type:mongoose.Types.ObjectId, ref:"Game"},
    roundType:{type:String, enum:RoundType},
    attemptLevel:{type:Number, enum:AttemptLevel},
}, {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});
RoundAttemptSchema.add(baseSchema);
RoundSchema.add(baseSchema);
RoundSchema.method('toJSON', function(){
    const obj:any = this.toObject();
    obj.id = obj._id
    return obj;
     
})
RoundAttemptSchema.method('toJSON', function(){
    const obj:any = this.toObject();
    obj.id = obj._id
    return obj;
     
})

const RoundModel = mongoose.model('Round',RoundSchema);
const RoundAttemptModel = mongoose.model('RoundAttempt',RoundAttemptSchema);
export {
    RoundModel,
    RoundAttemptModel 
}