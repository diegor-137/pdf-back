import fs from "fs";
import PDFDocument from "pdfkit-table";
import { Pdf } from '../pdf/entities/pdf.entity';


export function pdftable(res:any, data:Pdf[]){

  let doc = new PDFDocument({ margin: 30, size: 'letter' });
  
  doc.pipe(fs.createWriteStream("./document123.pdf"));

  const table = {
    title: "LISTADO",
    subtitle: "TODOS LOS NOMBRES INSCRITOS",
    headers: [
        { label:"Id", property: 'id'},
        { label:"Nombre", property: 'nombre'},
        { label:"Apellido", property: 'apellido'},
        { label:"Edad", property: 'edad'},
    ],
    datas:data
  };

  doc.table( table); 

  doc.pipe(res);
  doc.end();
};