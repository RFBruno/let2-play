export interface Challenge {
    readonly _id: string;
    dateTimeChallenge:Date;
    applicant:string;
    players: Array<string>;
    category: string;
    dateTimeRequest: Date;
    status: string;
    match?: Match;
}
export interface Match {
    readonly _id: string;
    def: string;
    result:Array<Result>;
}

export interface Result {
    set:string;
}
