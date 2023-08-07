import { Factura } from '../entities/factura.entity';
import PdfPrinter = require("pdfmake");
import { TDocumentDefinitions, BufferOptions } from "pdfmake/interfaces";
import fs from "fs";
import { FacturaDetalle } from '../../factura-detalle/entities/factura-detalle.entity';
import { numeroALetras } from '../../common/numerosAletras';
var fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};
const printer = new PdfPrinter(fonts);

export function pdfmaker(factura: Factura, res: any) {

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'LETTER',
    //footer: function (currentPage, pageCount) { return 'Pagina ' + currentPage.toString() + ' de ' + pageCount; },
    footer: {
      columns: [
        'Left part',
        { text: 'Right part', alignment: 'right' }
      ]
    },
    header: function (currentPage, pageCount, pageSize) {
      // you can apply any logic and return any valid pdfmake element

      return [
        { text: 'DISTRIBUIDORA EMMANUEL', fontSize: 16, alignment: 'center', color: '#047886' }
        //{ text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
        //{ canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
      ]
    },

    content: [
      /* ################################################################################################################ */
      {text: 'FACTURA.', fontSize: 20, bold: true, alignment: 'center', decoration: 'underline', color: 'skyblue'},
      { text: 'Detalles del Cliente', style: 'sectionHeader' },
      {
        columns: [
          [
            { text: factura.cliente.nombre + " " + factura.cliente.apellido, bold: true },
          ],
          [
            { text: `Fecha: ${factura.fecha.toLocaleDateString("es-gt", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", formatMatcher: "best fit" })}`, alignment: 'right' },
            { text: `Factura No. ${factura.id}`, alignment: 'right' }
          ]
        ]
      },
      { text: 'Detalles de la Factura', style: 'sectionHeader' },
      {
        table: {
          dontBreakRows: false,
          headerRows: 1,
          widths: [25, 'auto', 'auto', 'auto', 'auto'],
          body: [
            ['Id', 'Producto', 'Precio', 'Cantidad', 'Total'],
            ...extracData(factura.facturaDetalle),
            [{ text: 'Total', colSpan: 3 }, {}, {}, {}, total(factura.facturaDetalle)]
          ]
        },
        layout: 'lightHorizontalLines',

      },
      { text: 'Detalles de la Factura', style: 'sectionHeader' },
      {
        table: {          
          dontBreakRows:true,
          //headerRows: 1,
          
          widths: [25, 'auto', 'auto', 'auto', 'auto'],
          body: [
            ['Id', 'Producto', 'Precio', 'Cantidad', 'Total'],
            ...extracData(factura.facturaDetalle),
            [{ text: 'Total', colSpan: 3 }, {}, {}, {}, total(factura.facturaDetalle)]
          ]
        },
        layout: 'lightHorizontalLines',
        
      },

      { text: 'Aporte en letras', style: 'sectionHeader' },
      { text: numeroALetras(total(factura.facturaDetalle), {}), margin: [0, 0, 0, 15] },
      /* ############################################################################################################### */
    ],
    styles: {
      sectionHeader: { bold: true, decoration: 'underline', fontSize: 14, margin: [0, 15, 0, 15] },
      cellRight: { alignment: 'right' },
    },

  };

  const options: BufferOptions = {
    // ...
  }

  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream('pdfmake.pdf'));
  pdfDoc.pipe(res);
  pdfDoc.end();
}

function extracData(data: FacturaDetalle[]) {
  return data.map(row => [row.id, row.producto, (row.precio).toFixed(2), row.cantidad, { text: (row.precio * row.cantidad).toFixed(2), style: 'cellRight' }]);
}

function total(data: FacturaDetalle[]) {
  return data.reduce((sum, p) => sum + (p.cantidad * p.precio), 0).toFixed(2)
}