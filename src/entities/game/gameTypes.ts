import { ID } from "../Base/baseType"

type CreateGame={
    ipAddress:string,
    userId?:ID,
    artistId:number,
    isResetted?:boolean,
    isComplete?:boolean,
    totalPoint?:number,
}
type UpdateGame={
    ipAddress?:string,
    userId?:ID,
    artistId?:number,
    isResetted?:boolean,
    isComplete?:boolean,
    totalPoint?:number,
}
export {
    CreateGame,
    UpdateGame
}