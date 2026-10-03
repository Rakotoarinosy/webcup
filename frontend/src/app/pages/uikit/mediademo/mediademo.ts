import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { PhotoService } from '@/app/pages/service/photo.service';
import { Product, ProductService } from '@/app/pages/service/product.service';

const GALLERIA_RESPONSIVE_OPTIONS = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '960px', numVisible: 4 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 }
];

const CAROUSEL_RESPONSIVE_OPTIONS = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
    { breakpoint: '768px', numVisible: 2, numScroll: 2 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
];

@Component({
    selector: 'app-media-demo',
    imports: [CommonModule, CarouselModule, ButtonModule, GalleriaModule, ImageModule, TagModule],
    templateUrl: './mediademo.html',
    styleUrl: './mediademo.scss',
    providers: [ProductService, PhotoService]
})
export class MediaDemo implements OnInit {
    productService = inject(ProductService);

    photoService = inject(PhotoService);

    readonly products = signal<Product[]>([]);

    readonly images = signal<any[]>([]);

    readonly galleriaResponsiveOptions: any[] = GALLERIA_RESPONSIVE_OPTIONS;

    readonly carouselResponsiveOptions: any[] = CAROUSEL_RESPONSIVE_OPTIONS;

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => this.products.set(products));
        this.photoService.getImages().then((images) => this.images.set(images));
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'success';
        }
    }
}
