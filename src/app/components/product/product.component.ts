import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  printContent(){  
    const printContent = document.getElementById('print-content')?.innerHTML; // Ensure the section exists
    if (!printContent) {
      console.error("Print section not found!");
      alert("Print section not found!");
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error("Popup blocked! Allow popups and try again.");
      alert("Popup blocked! Allow popups and try again.");
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
            }
          </style>
        </head>
        <body onload="setTimeout(() => { window.print(); window.close(); }, 1000);">
          <div>${printContent}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
