import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'
import {Level, Subject} from '../../../../shared/types'
export class CreateGuideDto {

    @IsString()
    @MinLength(4)
    @MaxLength(40)
    title: string
    
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    description: string
    @IsInt()
    @Min(0)
    @Max(500000)
    price: number
    subjects: Subject[]
    level: Level
}
