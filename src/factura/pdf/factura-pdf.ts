import fs from "fs";
import PDFDocument from "pdfkit-table";
import { page } from './header-footer-pdf';

export function pdfFactura(res: any, dato: any) {

  const doc = new PDFDocument({ autoFirstPage: false, bufferPages: true, size: 'LETTER' });
  doc.pipe(fs.createWriteStream("./factura.pdf"));

  let sumaTotal=0;

  function tabla(datas: any) {
    const tabla = {
      headers: [
        { label: "Id", property: 'id', width: 40, renderer: null  },
        { label: "Producto", property: 'producto', width: 200, renderer: null  },
        { label: "Cantidad", property: 'cantidad', width: 100, renderer: null },
        { label: "Precio unitario", property: 'precio', width: 80, renderer: (value) => { return `Q. ${Number(value).toFixed(2)}`} },
        { label: "Total", property: 'total', width: 80, renderer: (value, indexColumn, indexRow, row) => 
          { 
            let val = Number(row.cantidad * row.precio).toFixed(2);
            sumaTotal+=row.cantidad * row.precio;
            return `Q. ${val}` 
          }
        },
      ],
      datas,
      options :{
        x:50,
        y:300,
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        doc.font("Helvetica").fontSize(10).fillColor("#444444");
        }
      }
    };
    return tabla;
  }

  if (dato.facturaDetalle.length == 0) {
    doc.addPage();
    doc.text("NO HAY INFORMACION", 150, 330);
  } else {
    let contador = 0
    let arr: Array<any>[] = [];
   
    for (let i = 0; i < dato.facturaDetalle.length; i++) {
      
      contador++
      arr.push(dato.facturaDetalle[i])
      if (contador == 10) {
        contador = 0;
        doc.addPage();        
        doc.table(tabla(arr));
        arr = []
      }
    }

    if (arr.length != 0) {
      doc.addPage();
      doc.table(tabla(arr));
    }
  }

  const total = {
    headers: [
      { label:"", property: 'descripcion', width: 60, renderer: null },
      { label:"", property: 'total', width: 60, renderer: null },
    ],
    datas :[
      {descripcion: 'SUMA TOTAL', total: sumaTotal},      
    ],
    options : {
      x:300,
      y:600,
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        doc.font("Helvetica").fontSize(10).fillColor("#444444");
        }
    }
  }
  
  doc.table(total)

  page(doc, dato)
  doc.pipe(res);
  doc.end();
};












