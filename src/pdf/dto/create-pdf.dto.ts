import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreatePdfDto {

    @IsOptional()
    id?:number

    @IsString()
    nombre:string
    @IsString()
    apellido:string
    @IsNumber()
    edad:number
}
