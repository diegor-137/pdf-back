import { Injectable } from '@nestjs/common';
import { CreateFacturaDetalleDto } from './dto/create-factura-detalle.dto';
import { UpdateFacturaDetalleDto } from './dto/update-factura-detalle.dto';

@Injectable()
export class FacturaDetalleService {
  create(createFacturaDetalleDto: CreateFacturaDetalleDto) {
    return 'This action adds a new facturaDetalle';
  }

  findAll() {
    return `This action returns all facturaDetalle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facturaDetalle`;
  }

  update(id: number, updateFacturaDetalleDto: UpdateFacturaDetalleDto) {
    return `This action updates a #${id} facturaDetalle`;
  }

  remove(id: number) {
    return `This action removes a #${id} facturaDetalle`;
  }
}
