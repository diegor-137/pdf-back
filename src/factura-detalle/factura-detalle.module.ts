import { Module } from '@nestjs/common';
import { FacturaDetalleService } from './factura-detalle.service';
import { FacturaDetalleController } from './factura-detalle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaDetalle } from './entities/factura-detalle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FacturaDetalle])
  ],
  controllers: [FacturaDetalleController],
  providers: [FacturaDetalleService]
})
export class FacturaDetalleModule {}
