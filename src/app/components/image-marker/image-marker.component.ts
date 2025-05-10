import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-marker',
  templateUrl: './image-marker.component.html',
  styleUrls: ['./image-marker.component.css']
})
export class ImageMarkerComponent {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  private scale = 1;
  private originX = 0;
  private originY = 0;
  transform = 'scale(1)';
  transformOrigin = '0% 0%';

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resizeCanvas();
  }

  // onWheel(event: WheelEvent) {
  //   event.preventDefault();
  //   const delta = event.deltaY < 0 ? 1.1 : 0.9;
  //   const rect = this.containerRef.nativeElement.getBoundingClientRect();

  //   // Get cursor position relative to container
  //   const offsetX = event.clientX - rect.left;
  //   const offsetY = event.clientY - rect.top;

  //   // Update origin to cursor point
  //   const originPercentX = (offsetX / rect.width) * 100;
  //   const originPercentY = (offsetY / rect.height) * 100;

  //   this.transformOrigin = `${originPercentX}% ${originPercentY}%`;
  //   this.scale *= delta;
  //   this.transform = `scale(${this.scale})`;
  // }
onWheel(event: WheelEvent) {
  event.preventDefault();
  const delta = event.deltaY < 0 ? 1.1 : 0.9;
  const rect = this.containerRef.nativeElement.getBoundingClientRect();

  // Get cursor position relative to container
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  // Update origin to cursor point
  const originPercentX = (offsetX / rect.width) * 100;
  const originPercentY = (offsetY / rect.height) * 100;
  this.transformOrigin = `${originPercentX}% ${originPercentY}%`;

  // Apply zoom limit
  const newScale = this.scale * delta;
  this.scale = Math.max(1, newScale); // ⬅ Enforce minimum scale of 1
  this.transform = `scale(${this.scale})`;
}

  onMouseMove(event: MouseEvent) {
    // Only update if drawing
    if (!this.drawing) return;
    this.draw(event);
  }

  startDrawing(event: MouseEvent) {
    this.drawing = true;
    this.ctx.beginPath();
    const { x, y } = this.getRelativeCoordinates(event);
    this.ctx.moveTo(x, y);
  }

  stopDrawing() {
    this.drawing = false;
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;
    const { x, y } = this.getRelativeCoordinates(event);
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 2 / this.scale; // Scale stroke width
    this.ctx.stroke();
  }

  getRelativeCoordinates(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / this.scale,
      y: (event.clientY - rect.top) / this.scale
    };
  }

  // resizeCanvas() {
  //   const canvas = this.canvasRef.nativeElement;
  //   const container = this.containerRef.nativeElement;

  //   canvas.width = container.clientWidth;
  //   canvas.height = container.clientHeight;
  // }
resizeCanvas() {
  const canvas = this.canvasRef.nativeElement;
  canvas.width = 700;
  canvas.height = 800;
}
  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }

}
