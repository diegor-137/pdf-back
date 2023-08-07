import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { generateHeader, generateFooter, generateCustomerInformation, generateInvoiceTable } from '../helpers/pdf';
import fs from "fs";
import PDFDocument from "pdfkit";
import { Pdf } from './entities/pdf.entity';
import { pdfReporte } from 'src/helpers/pdf3';
import { pdftable } from '../helpers/pdf-tablas';


@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  create(@Body() createPdfDto: CreatePdfDto) {
    return this.pdfService.create(createPdfDto);
  }

  @Get()
  findAll() {
    return this.pdfService.findAll();
  }

  @Get('reporte')
  async pdf(@Res() res) {
    /* const doc = new PDFDocument({ size: "LETTER", margin: 50});

    let data = await this.pdfService.findOne(41);
    let datos = await this.findAll();
    

    generateHeader(doc);
    generateCustomerInformation(doc, data);
    generateInvoiceTable(doc, datos);
    generateFooter(doc);

    doc.pipe(fs.createWriteStream('prueba1.pdf'));
    doc.pipe(res);
   
    doc.end(); */

    const doc = new PDFDocument({
      autoFirstPage: false,
      bufferPages: true,
    });

    let datos = await this.findAll();
    let i;
    let contador = 0
    let info: Pdf[]=[]
    for (i = 0; i < datos.length; i++){
      contador++
      info.push(datos[i])
      if(contador==10){
        contador=0;
        doc.addPage()
        generateInvoiceTable(doc, info);
        info=[]
      }      
      
    }
    
    if(info.length!=0){
      doc.addPage();
      generateInvoiceTable(doc, info);
    }

    if(datos.length==0){
      doc.addPage();
      doc.text("NO HAY INFORMACION", 150, 330);
    }
    
    
    //Global Edits to All Pages (Header/Footer, etc)
    let pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);

      //Header
      generateHeader(doc);
    
      //Footer: Add page number
      generateFooter(doc);
      let oldBottomMargin = doc.page.margins.bottom;
      doc.page.margins.bottom = 0 //Dumb: Have to remove bottom margin in order to write into it
      doc
        .text(
          `Pagina: ${i + 1} de ${pages.count}`,
          0,
          doc.page.height - (oldBottomMargin/2), // Centered vertically in bottom margin
          { align: 'right'}
        );
      doc.page.margins.bottom = oldBottomMargin; // ReProtect bottom margin
    }
    doc.pipe(fs.createWriteStream('prueba.pdf'));
    doc.pipe(res);
    doc.end();
    
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pdfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePdfDto: UpdatePdfDto) {
    return this.pdfService.update(+id, updatePdfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pdfService.remove(+id);
  }

  @Get('pdf/reporte2')
  async pdf2(@Res() res:any) { 
    const datos = await this.pdfService.findAll();   
    /* pdfReporte(datos, "nombres.pdf", res); */
    pdftable(res, datos);
  }
}



/*Agregar "esModuleInterop": true para poder usar el tipado de typescript en importaciones (pdfkit)*/ 
