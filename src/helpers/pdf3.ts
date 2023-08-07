import PDFDocument from "pdfkit";
import { Pdf } from "src/pdf/entities/pdf.entity";
import fs from "fs";

/* GENERAR PDF */

export function pdfReporte(datos:Pdf[], path: string, res:any) {
    let doc = new PDFDocument({ size: "A4", margin: 50, autoFirstPage: false, bufferPages: true});
    doc.pipe(fs.createWriteStream(path));
    doc.pipe(res);

    if(datos.length==0){
        doc.addPage();
        doc.text("NO HAY INFORMACION", 150, 330);
      }


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
    
  
    doc.end();
  }



/* ENCABEZADO */

export function generateHeader(doc: typeof PDFDocument) {
	doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Distribuidora Emanuel.", 110, 57)
    .fontSize(10)
    .text("Emanuel Inc.", 200, 50, { align: "right" })
    .text("5ta ave. Sector Parque", 200, 65, { align: "right" })
    .text("Nebaj, Quiche, Guatemala, 14013", 200, 80, { align: "right" })
    .moveDown();
}


/* CUERPO DEL PDF */


  function generateInvoiceTable(doc: typeof PDFDocument, data:Pdf[]) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      invoiceTableTop,
      "Id",
      "Nombre",
      "Apellido"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");
  
    for (i = 0; i < data.length; i++) {
      const dato = data[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        dato.id,
        dato.nombre,
        dato.apellido,
      );
      generateHr(doc, position + 20);
    }

  }



/* FOOTER */

export function generateFooter(doc: typeof PDFDocument) {
	doc.fontSize(10)
       .text('Confiamos en Dios. Gracias por su compra.',50,700,{ align: 'center', width: 500 },
	);
}




/* LINEAS */
function generateHr(doc: typeof PDFDocument, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }

/* FILAS DE TABLAS */ 

  function generateTableRow(
    doc,
    y,
    id,
    nombre,
    apellido,
  ) {
    doc
      .fontSize(10)
      .fillColor("#444444")
      .text(id, 50, y)
      .text(nombre, 150, y)
      .text(apellido, 280, y, { width: 90, align: "right" })
  }