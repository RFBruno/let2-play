export interface Challenge {
    readonly _id: string;
    dateTimeChallenge:Date,
    applicant:string,
    players: Array<string>
}
