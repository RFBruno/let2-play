import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { ChallengeStatus } from "../interfaces/challenge-status.enum";

export class UpdateChallengeDto {
    @IsOptional()
    @IsDateString()
    dateTimeChallenge!: Date;

    @IsOptional()
    status!:ChallengeStatus;
}
