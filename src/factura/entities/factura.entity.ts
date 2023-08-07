import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { FacturaDetalle } from '../../factura-detalle/entities/factura-detalle.entity';


@Entity('factura')
export class Factura {
    
    @PrimaryGeneratedColumn({name: 'id_factura'})
    id:number;

    @CreateDateColumn({ name: 'fecha', type: 'timestamp'})
    fecha:Date

    @ManyToOne(() => Cliente, cliente => cliente.facturas)
    @JoinColumn({ name: "id_cliente" })
    cliente: Cliente;

    @OneToMany(() => FacturaDetalle, FacturaDetalle => FacturaDetalle.factura)
    facturaDetalle: FacturaDetalle[];
}
