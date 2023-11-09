import { Component } from '@angular/core';

@Component({
  selector: 'app-galleria',
  templateUrl: './galleria.component.html',
  styleUrls: ['./galleria.component.css'],
})
export class GalleriaComponent {
  images: any[] | undefined;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor() {
    // Load images from assets
    this.loadImagesFromAssets();
  }

  loadImagesFromAssets() {
    // Replace these image paths with your actual image paths
    this.images = [
      { source: 'assets/imgs/anh1.png', alt: 'Image 1' },
      { source: 'assets/imgs/anh2.png', alt: 'Image 1' },
      { source: 'assets/imgs/anh3.png', alt: 'Image 1' },
      { source: 'assets/imgs/anh4.png', alt: 'Image 1' },
      { source: 'assets/imgs/anh5.jpg', alt: 'Image 1' },
      // Add more image objects as needed
    ];
  }
}
