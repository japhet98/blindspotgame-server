type CreateRound={
    gameId:string,
    attemptLevel:number,
    album:any,
    artistName:string,
    roundType:string,
    point?:number,
    isAnswered?:boolean,

}
type CreateRoundAttempt={
    _id?:string,
    gameId:string,
    attemptLevel:number,
    roundType:string,
}
type UpdateRoundAttempt={
    gameId?:string,
    attemptLevel?:number,
    roundType?:string,
}
export {
    CreateRound,
    CreateRoundAttempt,
    UpdateRoundAttempt
}