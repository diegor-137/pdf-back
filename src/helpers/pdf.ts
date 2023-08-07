import PDFDocument from "pdfkit";
import { Pdf } from "src/pdf/entities/pdf.entity";
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

export function generateFooter(doc: typeof PDFDocument) {
	doc.fontSize(
		10,
	).text(
		'Confiamos en Dios. Gracias por su compra.',
		50,
		700,
		{ align: 'center', width: 500 },
	);
}


/* ########################################### */

export function generateInvoiceTable(doc: typeof PDFDocument, data:Pdf[]) {
  let i;
  const invoiceTableTop = 330;

  
  generateTableRow(
    doc,
    invoiceTableTop,
    "Id",
    "Nombre",
    "Apellido",
    "Edad"
  );
  generateHr(doc, invoiceTableTop + 20);
  



  for (i = 0; i < data.length; i++) {
    const item = data[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.id,
      item.nombre,
      item.apellido,
      item.edad
    );

    generateHr(doc, position + 20);
  }
}


function generateTableRow(
  doc : typeof PDFDocument,
  y,
  id,
  nombre,
  apellido,
  edad,
) {
  doc
    .fontSize(10)
    .text(id, 50, y)
    .text(nombre, 150, y)
    .text(apellido, 280, y, { width: 90, align:"right"})
    .text(edad, 370, y, { width: 90, align:"right"})
}



/* ########################################### */


export function generateCustomerInformation(doc, data) {
    doc
      .fillColor("#444444")
      .fontSize(20)
      .text("Datos personales", 50, 160);
  
    generateHr(doc, 185);
  
    const customerInformationTop = 200;
  
    doc
      .fontSize(10)
      .text("Numero:", 50, customerInformationTop)
      .font("Helvetica-Bold")
      .text('#200', 150, customerInformationTop)
      .font("Helvetica")
      .text("Fecha:", 50, customerInformationTop + 15)
      .text(formatDate(new Date()), 150, customerInformationTop + 15)
      .text("Balance Due:", 50, customerInformationTop + 30)
   
  
      .font("Helvetica-Bold")
      .text(data.nombre + ' '+ data.apellido, 300, customerInformationTop)
      .font("Helvetica")
      .text('5ta av.', 300, customerInformationTop + 15)
      .text('Nebaj'
        ,
        300,
        customerInformationTop + 30
      )
      .moveDown();
  
    generateHr(doc, 252);
  }


  function generateHr(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return year + "/" + month + "/" + day;
  }