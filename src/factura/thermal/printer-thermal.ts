import printer from "@thiagoelg/node-printer";
import { ajustarTexto } from "src/common/ajustarTexto";
import { numeroALetras } from "src/common/numerosAletras";
import { Factura } from "../entities/factura.entity";
const ThermalPrinter = require("node-thermal-printer").printer;
const Types = require("node-thermal-printer").types;

export async function facturaThermal(factura:Factura) {
  
  let epsonThermalPrinter = new ThermalPrinter({
    type: Types.EPSON,
    width: 42,
    characterSet: 'SLOVENIA',
    removeSpecialCharacters: false,
    lineCharacter: "-",
  });

  epsonThermalPrinter.alignCenter();
  epsonThermalPrinter.print("Distribuidora Emanuel.");
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.print("5ta av, zona 0, sector Parque, \n Nebaj Quiche.");
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.alignLeft();
  epsonThermalPrinter.print("Factura No. : " + factura.id);
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.print("Cliente: ");
  epsonThermalPrinter.bold(true);
  epsonThermalPrinter.print(factura.cliente.nombre + " " +factura.cliente.apellido);
  epsonThermalPrinter.bold(false);
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.print("Fecha: ")
  epsonThermalPrinter.bold(true);
  epsonThermalPrinter.print(factura.fecha.toLocaleDateString("es-gt", {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", formatMatcher: "best fit"}));
  epsonThermalPrinter.bold(false);
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.alignCenter();
  epsonThermalPrinter.bold(true);
  epsonThermalPrinter.print("Descripcion");
  epsonThermalPrinter.bold(false);
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.tableCustom([
    {text: "Precio U.", align: "LEFT", cols:17, bold: true},
    {text: "Cantidad", align: "LEFT", cols:8, bold: true},        
    {text: "Sub.Total", align: "RIGHT", cols:17, bold: true}    
])
  epsonThermalPrinter.newLine();

  let sumaTotal=0;
  factura.facturaDetalle.forEach(obj => {
    let val = Number(obj.cantidad * obj.precio).toFixed(2);
    sumaTotal+=obj.cantidad * obj.precio;
    epsonThermalPrinter.tableCustom([{text: obj.producto, align: "LEFT", cols:42}]);
    epsonThermalPrinter.tableCustom([
      {text: 'Q.' + Number(obj.precio).toFixed(2), align: "LEFT", cols:19},    
      {text:  'x' + obj.cantidad, align: "LEFT", cols:8},
      {text: 'Q.', align: "RIGHT", cols:2, bold:true}, 
      {text: val, align: "RIGHT", cols:13} 
    ])
      epsonThermalPrinter.drawLine();
      epsonThermalPrinter.newLine();
  })
  epsonThermalPrinter.tableCustom([
    {text: 'TOTAL: ', align: "RIGHT",cols:27,  bold: true},
    {text: 'Q.' , align: "LEFT", cols:2, bold: true},
    {text: Number(sumaTotal).toFixed(2), align: "RIGHT", cols:13  , bold: true}
  ]);

  var total=numeroALetras(sumaTotal, {})

  
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.alignLeft();
  epsonThermalPrinter.print("Aporte en letras: ");
  epsonThermalPrinter.newLine();
  epsonThermalPrinter.alignLeft();
  epsonThermalPrinter.print(ajustarTexto(total));

  epsonThermalPrinter.partialCut();
  

  printer.printDirect({
      data: epsonThermalPrinter.getBuffer(),
      printer: 'EPSON TM-T88V Receipt',
      type: 'RAW',
      success: function (jobID) {
          console.log(`printer job: ${jobID}`);
          epsonThermalPrinter.clear();
      },
      error: function (err) {
          console.log(err);
      }
  })
  
}

