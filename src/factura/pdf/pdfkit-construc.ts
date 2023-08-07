import { Response } from 'express';
import PdfkitConstruct from 'pdfkit-construct';
import fs from "fs";

export function pdfConstruct(res:Response){

    const doc = new PdfkitConstruct({
        size: 'A4',
        margins: {top: 20, left: 10, right: 10, bottom: 20},
        bufferPages: true,
    });
    doc.setDocumentHeader({}, () => {
        doc.lineJoin('miter')
            .rect(0, 0, doc.page.width, doc.header.options.heightNumber).fill("#ededed");
        doc.fill("#115dc8")
            .fontSize(20)
            .text("Hello world header", doc.header.x, doc.header.y);
    });
    doc.setDocumentFooter({}, () => {

        doc.lineJoin('miter')
            .rect(0, doc.footer.y, doc.page.width, doc.footer.options.heightNumber).fill("#c2edbe");

        doc.fill("#7416c8")
            .fontSize(8)
            .text("Hello world footer", doc.footer.x, doc.footer.y + 10);
    });

    const datoss =[
        {id:1, producto: 'cama', precio: 300, cantidad: 1},
        {id:2, producto: 'cama', precio: 300, cantidad: 1},
        {id:3, producto: 'cama', precio: 300, cantidad: 1},
        {id:4, producto: 'cama', precio: 300, cantidad: 1},
        {id:5, producto: 'cama', precio: 300, cantidad: 1},
    ]

    doc.addTable([
        {key: 'id', label: 'Id', align: 'left'},
        {key: 'producto', label: 'Producto', align: 'left'},
        {key: 'precio', label: 'precio', align: 'left'},
        {key: 'cantidad', label: 'cantidad', align: 'right'}
    ], datoss, {
        border: null,
                    width: "fill_body",
                    striped: true,
                    stripedColors: ["#f6f6f6", "#d6c4dd"],
                    cellsPadding: 10,
                    marginLeft: 45,
                    marginRight: 45,
                    headAlign: 'left'
    })
    doc.render();
    doc.setPageNumbers((p, c) => `Page ${p} of ${c}`, "bottom right");
    doc.pipe(fs.createWriteStream("./factura.pdf"));
    doc.pipe(res);
    doc.end();
    
}


/* const filename = `Factura${Date.now()}.pdf`
const stream = res.writeHead(200, {
    'Content-Type' : 'aplication/pdf',
    'Content-disposition' : `attachment;filename=${filename}`
})

doc.on('data', (data)=>{stream.write(data)});
doc.on('end', ()=>{stream.end()}); */