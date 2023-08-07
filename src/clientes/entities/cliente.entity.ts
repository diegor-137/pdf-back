import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Factura } from '../../factura/entities/factura.entity';


@Entity('clientes')
export class Cliente {

    @PrimaryGeneratedColumn({name: 'id_cliente'})
    id:number;

    @Column({name: 'nombre',type: 'varchar', length: 45, nullable: false}) 
    nombre:string

    @Column({name: 'apellido',type: 'varchar', length: 45, nullable: false}) 
    apellido:string

    @OneToMany(() => Factura, factura => factura.cliente)
    facturas: Factura[];

}
