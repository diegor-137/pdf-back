import { PartialType } from '@nestjs/mapped-types';
import { CreateFacturaDetalleDto } from './create-factura-detalle.dto';

export class UpdateFacturaDetalleDto extends PartialType(CreateFacturaDetalleDto) {}
