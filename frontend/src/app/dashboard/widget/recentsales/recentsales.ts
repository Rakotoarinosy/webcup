import { Component, inject, signal } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../../pages/service/product.service';

@Component({
    selector: 'app-recentsales',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    templateUrl: './recentsales.html',
    styleUrl: './recentsales.scss'
})
export class Recentsales {
    products = signal<Product[]>([]);

    productService = inject(ProductService);

    ngOnInit() {
        this.productService.getProductsSmall().then((data) => this.products.set(data));
    }
}
