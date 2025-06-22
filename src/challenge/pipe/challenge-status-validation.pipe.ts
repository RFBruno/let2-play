import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';

export class ChallengeStatusValidation implements PipeTransform{
    readonly statusAllow = [
        ChallengeStatus.ACEITO,
        ChallengeStatus.NEGADO,
        ChallengeStatus.CANCELADO,
    ];
    transform(value: any, metadata: ArgumentMetadata) {
        const status = value.status.toUpperCase();

        if(!this.isStatusAllow(status)){
            throw new BadRequestException(`${status} é um status inválido`);
        }

        return value;
    }

    private isStatusAllow(status:any): boolean{
        const index = this.statusAllow.indexOf(status);
        return index !== -1;
    }
}