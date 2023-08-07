import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('pdf-example')
export class Pdf {


    @PrimaryGeneratedColumn({name: 'id_registro'})
    id:number;

    @Column({name: 'nombre',type: 'varchar', length: 45, nullable: false}) 
    nombre:string

    @Column({name: 'apellido',type: 'varchar', length: 45, nullable: false}) 
    apellido:string
    
    @Column({type: 'int'})
    edad:number

    @CreateDateColumn({ name: 'registered_at', type: 'timestamp', select: false })
    registeredAt: Date;


    

}
