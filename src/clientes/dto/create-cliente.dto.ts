import { IsOptional, IsString } from 'class-validator';



export class CreateClienteDto {
    @IsOptional()
    id?:number

    @IsString()
    nombre:string
    @IsString()
    apellido:string
}
