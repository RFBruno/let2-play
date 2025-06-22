export interface Challenge {
    readonly _id: string;
    dateTimeChallenge:Date,
    applicant:string,
    players: Array<string>,
    category: string,
    dateTimeRequest: Date,
    status: string,
}
export interface Match {
    category: string,
    players: Array<string>,
    def: string,
    result:Array<Result>
}

export interface Result {
    set:string
}
