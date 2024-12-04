import { IsDate, IsInt, IsString, Max, MaxLength, Min, MinLength } from "class-validator"
import { Subject } from "../../../../shared/types"

export class CreateLessonDto {
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
    @IsDate()
    startTime: Date

    @IsDate()
    endTime: Date

    subjects: Subject[]
}
