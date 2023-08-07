
import { Factura } from '../entities/factura.entity';
import { FacturaDetalle } from '../../factura-detalle/entities/factura-detalle.entity';
import { numeroALetras } from "src/common/numerosAletras";

import { DocumentDefinition, Table, Txt, Columns, Cell } from 'pdfmake-wrapper/server';
import { Response } from 'express';
import fs from "fs";
import Pdfmake from 'pdfmake';

const printer = new Pdfmake({
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
});
const doc = new DocumentDefinition();

export function reporteFactura(factura: Factura, res: Response) {

    /* ###################################################### ENCABEZADO ###################################################### */
    doc.header([new Txt('DISTRIBUIDORA EMMANUEL').alignment('center').fontSize(14).color('#047886').margin(10).end]);
    /* ###################################################### CUERPO ###################################################### */
    doc.rawContent([
        new Txt('FACTURA.').fontSize(14).bold().alignment('center').decoration('underline').color('skyblue').end,
        new Txt('Detalles del Cliente').style('sectionHeader').end,
        new Columns([
            new Txt('Factura a: ').bold().width(50).end,
            new Txt([factura.cliente.nombre, factura.cliente.apellido]).bold().width('*').end,
            new Txt(`Fecha: ${factura.fecha.toLocaleDateString("es-gt", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", formatMatcher: "best fit" })}`).width('*').alignment('right').end,
        ]).end,
        new Txt(`Factura No. ${factura.id}`).alignment('right').end,
        new Txt('Detalles de la Factura').style('sectionHeader').end,
        new Table([
            ['Id', 'Producto', 'Precio', 'Cantidad', new Txt('Total').alignment('center').end],
            ...extracData(factura.facturaDetalle),
        ])
            .heights(() => {
                return 25;
            })
            .headerRows(1)
            .widths([25, 300, 'auto', 'auto', 'auto'])
            .layout('lightHorizontalLines')
            .dontBreakRows(true)
            .end,
        new Table([
            [new Cell(new Txt('Tipo Pago.').bold().end).rowSpan(3).end, new Txt('Sub-Total').bold().end, total(factura.facturaDetalle)],
            [{}, new Txt('Impuestos').bold().end, 0],
            [{}, new Txt('Total').bold().end, total(factura.facturaDetalle)],
            [new Cell(new Txt('Aporte en letras').bold().end).colSpan(3).border([true, true, true, false]).end],
            [new Cell(new Txt(numeroALetras(total(factura.facturaDetalle), {})).end).colSpan(3).border([true, false, true, true]).end],
        ])
            .pageBreak('before')
            .dontBreakRows(true)
            .widths([400, 'auto', 'auto'])
            .margin([0, 20])
            .end
    ]);

    /* ###################################################### FOOTER ###################################################### */
    doc.footer((currentPage, pageCount) => {
        return new Columns([
            new Txt('').end,
            new Txt('Copia Cliente').alignment('center').end,
            new Txt('Pagina ' + currentPage.toString() + ' de ' + pageCount).alignment('center')./* margin([0,0,45,0]). */end,
        ]).end;
    });

    /* ###################################################### CONFIGURACIONES. ###################################################### */
    doc.defaultStyle({
        fontSize: 10
    })
    doc.styles({
        sectionHeader: { bold: true, decoration: 'underline', fontSize: 12, margin: [0, 15, 0, 15] },
        cellRight: { alignment: 'right' }
    })
    doc.pageSize('LETTER')
    const pdf = printer.createPdfKitDocument(doc.getDefinition());
    pdf.pipe(res);
    pdf.end();
}

function extracData(data: FacturaDetalle[]) {
    return data.map(row => [row.id, row.producto, (row.precio).toFixed(2), row.cantidad, new Txt((row.precio * row.cantidad).toFixed(2)).style('cellRight').end]);
}

function total(data: FacturaDetalle[]) {
    return data.reduce((sum, p) => sum + (p.cantidad * p.precio), 0).toFixed(2)
}




    /* const filename = `Factura${Date.now()}.pdf`

    const stream = res.writeHead(200, {
        'Content-Type': 'aplication/pdf',
        'Content-disposition': `attachment;filename=${filename}`
    })

    pdf.on('data', (data) => { stream.write(data) })
    pdf.on('end', () => { stream.end() }); */

    //pdf.pipe(fs.createWriteStream('pdfmake.pdf'));



