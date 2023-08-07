import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Factura]),
    PdfModule
  ],
  controllers: [FacturaController],
  providers: [FacturaService]
})
export class FacturaModule {}
