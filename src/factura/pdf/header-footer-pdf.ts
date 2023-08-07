/* ############################ ENCABEZADO ################################# */

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}




/* ############################ PIE DE PAGINA ################################# */

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      700,
      { align: "center", width: 500 }
    );
}


/* ############################ INFORMACION DEL CLIENTE ################################# */

function generateCustomerInformation(doc, cliente) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Id:", 50, customerInformationTop)
    .font("Helvetica")
    .text("Fecha:", 50, customerInformationTop + 15)
    .text("Nombre:", 50, customerInformationTop + 30)
    

    .font("Helvetica-Bold")
    .text(cliente.id, 300, customerInformationTop)
    .font("Helvetica")
    .text(Date.now(), 300, customerInformationTop + 15)
    .text(
      cliente.cliente.nombre + ' ' + cliente.cliente.apellido,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}


/* ############################ GENERAR LINEAS ################################# */

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}


export function page(doc:any, cliente){
  let pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      if(i==0)generateCustomerInformation(doc, cliente)
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

}



