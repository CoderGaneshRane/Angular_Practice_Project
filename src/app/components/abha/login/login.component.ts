import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';import Panzoom from '@panzoom/panzoom';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // selectedLogin: 'mobile' | 'aadhaar' | null = null;
  // mobileNumber: string = '';
  // aadhaarNumber: string = '';

  // constructor(private toastr:ToastrService){

  // }
  // selectLogin(method: 'mobile' | 'aadhaar') {
  //   this.selectedLogin = method;
  // }
  // allowOnlyNumbers(event: KeyboardEvent): void {
  //   const charCode = event.which ? event.which : event.keyCode;
  //   if (charCode < 48 || charCode > 57) {
  //     event.preventDefault();
  //   }
  // }
  
  // loginWithMobile() {
  //   if (!this.mobileNumber || this.mobileNumber.length !== 10 || !/^[0-9]{10}$/.test(this.mobileNumber)) {
  //     this.toastr.warning('Please enter a valid 10-digit mobile number.');
  //     return;
  //   }
  //   console.log('Logging in with Mobile:', this.mobileNumber);
  // }

  // loginWithAadhaar() {
  //   if (!this.aadhaarNumber || this.aadhaarNumber.length !== 12 || !/^[0-9]{12}$/.test(this.aadhaarNumber)) {
  //     this.toastr.warning('Please enter a valid 12-digit Aadhaar number.');
  //     return;
  //   }
  //   console.log('Logging in with Aadhaar:', this.aadhaarNumber);
  // }
 
//  panzoomInstance: any;
//   canvas!: HTMLCanvasElement;
//   ctx!: CanvasRenderingContext2D;
//   isDrawing = false;
//   lastPos: { x: number; y: number } | null = null;

//   ngAfterViewInit(): void {
//     const modal = document.getElementById('imageZoomModal');

//     modal?.addEventListener('shown.bs.modal', () => {
//       const image = document.getElementById('zoomImage') as HTMLImageElement;
//       const container = document.getElementById('image-container')!;
//       this.canvas = document.getElementById('drawCanvas') as HTMLCanvasElement;

//       // Set canvas size to match container
//       this.canvas.width = container.clientWidth;
//       this.canvas.height = container.clientHeight;

//       this.ctx = this.canvas.getContext('2d')!;
//       this.ctx.lineWidth = 2;
//       this.ctx.strokeStyle = 'red';

//       // Panzoom init
//       this.panzoomInstance = Panzoom(image, {
//         maxScale: 5,
//         minScale: 1,
//         contain: 'outside',
//         zoomSpeed: 0.07
//       });

//       container.addEventListener('wheel', (event) => {
//         event.preventDefault();
//         this.panzoomInstance.zoomWithWheel(event);
//       });

//       this.enableDrawing();
//     });

//     modal?.addEventListener('hidden.bs.modal', () => {
//       if (this.panzoomInstance) {
//         this.panzoomInstance.destroy();
//         this.panzoomInstance = null;
//       }
//     });
//   }

//   enableDrawing() {
//     const canvas = this.canvas;

//     canvas.addEventListener('mousedown', (e) => {
//       this.isDrawing = true;
//       this.lastPos = this.getMousePos(e);
//     });

//     canvas.addEventListener('mousemove', (e) => {
//       if (!this.isDrawing || !this.lastPos) return;
//       const pos = this.getMousePos(e);
//       this.ctx.beginPath();
//       this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
//       this.ctx.lineTo(pos.x, pos.y);
//       this.ctx.stroke();
//       this.lastPos = pos;
//     });

//     ['mouseup', 'mouseleave'].forEach((ev) =>
//       canvas.addEventListener(ev, () => {
//         this.isDrawing = false;
//         this.lastPos = null;
//       })
//     );
//   }

//   getMousePos(evt: MouseEvent) {
//     const rect = this.canvas.getBoundingClientRect();
//     return {
//       x: evt.clientX - rect.left,
//       y: evt.clientY - rect.top
//     };
//   }
panzoomInstance: any;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  isDrawing = false;
  lastPos: { x: number; y: number } | null = null;

  ngAfterViewInit(): void {
    const modal = document.getElementById('imageZoomModal');

    modal?.addEventListener('shown.bs.modal', () => {
      const image = document.getElementById('zoomImage') as HTMLImageElement;
      const container = document.getElementById('image-container')!;
      this.canvas = document.getElementById('drawCanvas') as HTMLCanvasElement;

      // Set canvas size to match container
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;

      this.ctx = this.canvas.getContext('2d')!;
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'red';

      // Panzoom initialization
      this.panzoomInstance = Panzoom(image, {
        maxScale: 5,
        minScale: 1,
        contain: 'outside',
        zoomSpeed: 0.07
      });

      container.addEventListener('wheel', (event) => {
        event.preventDefault();
        this.panzoomInstance.zoomWithWheel(event);

        // Clear canvas on zoom
        this.clearCanvas();
      });

      this.enableDrawing();
    });

    modal?.addEventListener('hidden.bs.modal', () => {
      if (this.panzoomInstance) {
        this.panzoomInstance.destroy();
        this.panzoomInstance = null;
      }
    });
  }

  enableDrawing() {
    const canvas = this.canvas;

    canvas.addEventListener('mousedown', (e) => {
      this.isDrawing = true;
      this.lastPos = this.getMousePos(e);
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!this.isDrawing || !this.lastPos) return;
      const pos = this.getMousePos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
      this.lastPos = pos;
    });

    ['mouseup', 'mouseleave'].forEach((ev) =>
      canvas.addEventListener(ev, () => {
        this.isDrawing = false;
        this.lastPos = null;
      })
    );
  }

  getMousePos(evt: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

//  saveImageWithDrawings() {
//   const image = document.getElementById('zoomImage') as HTMLImageElement;
//   const canvasOverlay = this.canvas;

//   const exportCanvas = document.createElement('canvas');
//   exportCanvas.width = image.naturalWidth;
//   exportCanvas.height = image.naturalHeight;

//   const exportCtx = exportCanvas.getContext('2d')!;

//   exportCtx.drawImage(image, 0, 0, exportCanvas.width, exportCanvas.height);

//   exportCtx.drawImage(
//     canvasOverlay,
//     0, 0, canvasOverlay.width, canvasOverlay.height,
//     0, 0, exportCanvas.width, exportCanvas.height
//   );

//   exportCanvas.toBlob((blob) => {
//     if (!blob) return;
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'marked-image.png';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   }, 'image/png');
// }

saveImageWithDrawings() {
  const image = document.getElementById('zoomImage') as HTMLImageElement;
  const overlayCanvas = this.canvas;
  const container = document.getElementById('image-container') as HTMLElement;

  if (!image || !overlayCanvas || !container) {
    console.error('Missing image, canvas, or container elements.');
    return;
  }

  // Get Panzoom scale (zoom level) and pan (position)
  const scale = this.panzoomInstance.getScale();
  const pan = this.panzoomInstance.getPan();

  console.log('Panzoom scale (zoom):', scale);
  console.log('Panzoom pan (position):', pan);

  // Create export canvas that matches the container size
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = container.clientWidth;
  exportCanvas.height = container.clientHeight;
  const ctx = exportCanvas.getContext('2d');
  if (!ctx) {
    console.error('Failed to get canvas context');
    return;
  }

  // Step 1: Apply pan/zoom transform to the image
  // First, we need to scale and translate the image correctly:
  // Apply pan (x, y) and zoom (scale) before drawing the image.
  ctx.setTransform(scale, 0, 0, scale, pan.x, pan.y);
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

  // Step 2: Reset transform and draw the overlay canvas (markings)
  // Now that the image is drawn, we reset the transformation for the overlay
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(overlayCanvas, 0, 0);

  // Step 3: Export the canvas to an image (PNG format)
  exportCanvas.toBlob((blob) => {
    if (!blob) {
      console.error('Failed to create image blob');
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marked-image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('Image saved!');
  }, 'image/png');
}





}
