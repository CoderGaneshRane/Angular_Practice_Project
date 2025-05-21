import { Component } from '@angular/core';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent {
  pdfBlobUrl: string | null = null;

  // printContent(){  
  //   const printContent = document.getElementById('print-content')?.innerHTML; // Ensure the section exists
  //   if (!printContent) {
  //     console.error("Print section not found!");
  //     alert("Print section not found!");
  //     return;
  //   }

  //   const printWindow = window.open('', '_blank');
  //   if (!printWindow) {
  //     console.error("Popup blocked! Allow popups and try again.");
  //     alert("Popup blocked! Allow popups and try again.");
  //     return;
  //   }

  //   let styles = `
  //     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  //   `;
  //   document.querySelectorAll('style, link[rel="stylesheet"]').forEach((style) => {
  //     styles += style.outerHTML;
  //   });

  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>Print Rx</title>
  //         ${styles}
  //         <style>
  //           @media print {
  //           }
  //         </style>
  //       </head>
  //       <body onload="setTimeout(() => { window.print(); window.close(); }, 1000);">
  //         <div>${printContent}</div>
  //       </body>
  //     </html>
  //   `);
  //   printWindow.document.close();
  // }

//  async printContent() {
//     const element = document.getElementById('print-content');
//     if (!element) {
//       alert("Print section not found!");
//       return;
//     }

//     const blob: Blob = await html2pdf()
//       .from(element)
//       .set({
//         filename: 'prescription.pdf',
//         html2canvas: { scale: 2 },
//         jsPDF: { format: 'a4', orientation: 'portrait' }
//       })
//       .outputPdf('blob');

//     if (this.pdfBlobUrl) {
//       URL.revokeObjectURL(this.pdfBlobUrl); 
//     }
//     this.pdfBlobUrl = URL.createObjectURL(blob);
//     console.log(this.pdfBlobUrl)
//     const printContent = element.innerHTML;
//     const printWindow = window.open('', '_blank');
//     if (!printWindow) {
//       alert("Popup blocked!");
//       return;
//     }

//     let styles = `
//       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
//     `;
//     document.querySelectorAll('style, link[rel="stylesheet"]').forEach((style) => {
//       styles += style.outerHTML;
//     });

//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Print Rx</title>
//           ${styles}
//           <style>
//             @media print {
//               body {
//                 margin: 0;
//                 padding: 0;
//               }
//             }
//           </style>
//         </head>
//         <body onload="setTimeout(() => { window.print(); window.close(); }, 500);">
//           <div>${printContent}</div>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   }
 async printContent() {
    const element = document.getElementById('print-content');
    if (!element) {
      alert('Print section not found!');
      return;
    }

    // === Generate PDF Blob ===
    const blob: Blob = await html2pdf()
      .from(element)
      .set({
        filename: 'prescription.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { format: 'a4', orientation: 'portrait' },
      })
      .outputPdf('blob');

    // Create download link URL
    if (this.pdfBlobUrl) {
      URL.revokeObjectURL(this.pdfBlobUrl);
    }
    this.pdfBlobUrl = URL.createObjectURL(blob);

    console.log(this.pdfBlobUrl);
    const base64Pdf = await this.blobToBase64(blob);
    // If your backend expects raw base64 without prefix:
    const base64Data = base64Pdf.split(',')[1];

    console.log(base64Data);

    // this.http
    //   .post('/api/upload-pdf', { file: base64Data })
    //   .subscribe({
    //     next: () => console.log('PDF uploaded successfully'),
    //     error: (err) => console.error('Upload failed', err),
    //   });

    // === Your existing print logic ===
    const printContent = element.innerHTML;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Popup blocked! Please allow popups and try again.');
      return;
    }

    let styles = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    `;
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach((style) => {
      styles += style.outerHTML;
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Rx</title>
          ${styles}
          <style>
            @media print {
              body {
                margin: 0; padding: 0;
              }
            }
          </style>
        </head>
        <body onload="setTimeout(() => { window.print(); window.close(); }, 500);">
          <div>${printContent}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reader.abort();
        reject(new Error('Failed to read blob as base64'));
      };
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }



  // Testing code to check downloaded PDF 
//  downloadPDF() {
//     const options = {
//       margin: 0.5,
//       filename: 'Prescription.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
//     };

//    const content: HTMLElement = this.printableContent.nativeElement;

//     html2pdf().set(options).from(content).save();
//   }


//   generateAndSendPDF() {
//     const content: HTMLElement = this.printableContent.nativeElement;

//     const options = {
//       margin: 0.5,
//       filename: 'Prescription-file.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };

//     html2pdf()
//       .set(options)
//       .from(content)
//       .outputPdf('blob')  
//       .then((pdfBlob: Blob) => {
//         const formData = new FormData();
//         formData.append('file', pdfBlob, 'exported-file.pdf');
//         console.log(pdfBlob);
//         this.doctorService.sendRxPdf(formData).subscribe({
//           next: (res:any)=>{
//             console.log(res);
//           },
//           error:(err:any)=>{
//             console.log(err);
//           }
//         })
//       });
//   }
}
