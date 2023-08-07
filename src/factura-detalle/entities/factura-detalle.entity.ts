import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Factura } from '../../factura/entities/factura.entity';


@Entity('factura_detalle')
export class FacturaDetalle {

    @PrimaryGeneratedColumn({name: 'id_facturaDetalle'})
    id:string

    @Column({name: 'producto', type: 'varchar', length: 100, nullable: false})
    producto:string

    @Column({name: 'cantidad', type: 'int', nullable: false})
    cantidad:number

    @Column({name: 'precio', type: 'float', nullable: false})
    precio:number

    @ManyToOne(() => Factura, factura => factura.facturaDetalle)
    @JoinColumn({ name: "id_factura" })
    factura: Factura;

}
