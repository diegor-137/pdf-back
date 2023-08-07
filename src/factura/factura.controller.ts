import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { pdfFactura } from './pdf/factura-pdf';
import { PdfService } from '../pdf/pdf.service';
import { facturaThermal } from './thermal/printer-thermal';
import { reporteFactura } from './pdf/reporte-facturas';
import { Response, Request } from 'express';
import { pdfConstruct } from './pdf/pdfkit-construc';
import { pdfmaker } from './pdf/pdfmake';
//import { example } from './thermal/printer-thermal';

@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService, private readonly pdfService: PdfService) {}

  @Post()
  async create(@Body() createFacturaDto: CreateFacturaDto) {
    return await this.facturaService.create(createFacturaDto);
  }

  @Get()
  findAll() {
    return this.facturaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.facturaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacturaDto: UpdateFacturaDto) {
    return this.facturaService.update(+id, updateFacturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturaService.remove(+id);
  }

  @Get('pdf/:id')
  async pdf2(@Param('id') id: string, @Res()res:any) { 
    const factura = await this.findOne(id)
    const datos = await this.pdfService.findAll();
  
    pdfFactura(res, factura)
    
  }

  @Get('thermal/:id')
  async thermal(@Param('id') id: string) { 
    const factura = await this.findOne(id)

    facturaThermal(factura);        
    return {msg: 'HOLA'}    
  }

  @Get('reportefactura/:id')
  async reporte(@Param('id') id: string, @Res()res:Response) {
     
    const factura = await this.findOne(id)
    reporteFactura(factura, res);
    
    //pdfConstruct(res);
    /* const factura = await this.findOne(id)
    pdfmaker(factura, res); */
  }
}
