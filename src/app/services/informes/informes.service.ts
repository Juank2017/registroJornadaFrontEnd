import { Injectable } from '@angular/core';
import pdfMake from '../../../../node_modules/pdfmake/build/pdfmake';
import pdfFonts from '../../../../node_modules/pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  constructor() { }
  generatePdf() {
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).print();
  }

  getDocumentDefinition() {
    
    
     return {
       content: [
         {
           text: 'Informe',
           bold: true,
           fontSize: 20,
           alignment: 'center',
           margin: [0, 0, 0, 20]
         },
         {
           columns: [
             [{
               text: 'prueba',
               style: 'name'
             },
             {
               text: 'prueba'
             },
             {
               text: 'Email : ' + 'prueba',
             },
             {
               text: 'Contant No : ' + 'prueba',
             },
             {
               text: 'GitHub: ' + 'prueba',
               link: 'prueba',
               color: 'blue',
             }
             ],
             [
               // Document definition for Profile pic
             ]
           ]
         }],
         styles: {
           name: {
             fontSize: 16,
             bold: true
           }
         }
     };
   }
}
