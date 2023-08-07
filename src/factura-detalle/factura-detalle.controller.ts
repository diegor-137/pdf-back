import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacturaDetalleService } from './factura-detalle.service';
import { CreateFacturaDetalleDto } from './dto/create-factura-detalle.dto';
import { UpdateFacturaDetalleDto } from './dto/update-factura-detalle.dto';

@Controller('factura-detalle')
export class FacturaDetalleController {
  constructor(private readonly facturaDetalleService: FacturaDetalleService) {}

  @Post()
  create(@Body() createFacturaDetalleDto: CreateFacturaDetalleDto) {
    return this.facturaDetalleService.create(createFacturaDetalleDto);
  }

  @Get()
  findAll() {
    return this.facturaDetalleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturaDetalleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacturaDetalleDto: UpdateFacturaDetalleDto) {
    return this.facturaDetalleService.update(+id, updateFacturaDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturaDetalleService.remove(+id);
  }
}
