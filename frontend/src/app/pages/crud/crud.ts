import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Product, ProductService } from '@/app/pages/service/product.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

const STATUSES = [
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
];

const COLUMNS: Column[] = [
    { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
    { field: 'name', header: 'Name' },
    { field: 'image', header: 'Image' },
    { field: 'price', header: 'Price' },
    { field: 'category', header: 'Category' }
];

const ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const ID_LENGTH = 5;

const TOAST_LIFE_MS = 3000;

@Component({
    selector: 'app-crud',
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    templateUrl: './crud.html',
    styleUrl: './crud.scss',
    providers: [MessageService, ProductService, ConfirmationService]
})
export class Crud implements OnInit {
    private readonly productService = inject(ProductService);

    private readonly messageService = inject(MessageService);

    private readonly confirmationService = inject(ConfirmationService);

    @ViewChild('dt') dt!: Table;

    readonly products = signal<Product[]>([]);

    product!: Product;

    selectedProducts!: Product[] | null;

    productDialog = false;

    submitted = false;

    statuses!: any[];

    cols!: Column[];

    exportColumns!: ExportColumn[];

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.productService.getProducts().then((data) => {
            this.products.set(data);
        });

        this.statuses = STATUSES;
        this.cols = COLUMNS;
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteSelectedProducts() {
        this.confirmDelete('Are you sure you want to delete the selected products?', () => {
            this.products.set(this.products().filter((val) => !this.selectedProducts?.includes(val)));
            this.selectedProducts = null;
            this.showSuccess('Products Deleted');
        });
    }

    deleteProduct(product: Product) {
        this.confirmDelete('Are you sure you want to delete ' + product.name + '?', () => {
            this.products.set(this.products().filter((val) => val.id !== product.id));
            this.product = {};
            this.showSuccess('Product Deleted');
        });
    }

    saveProduct() {
        this.submitted = true;

        if (!this.product.name?.trim()) {
            return;
        }

        if (this.product.id) {
            this.updateExistingProduct();
        } else {
            this.createNewProduct();
        }

        this.productDialog = false;
        this.product = {};
    }

    findIndexById(id: string): number {
        return this.products().findIndex((product) => product.id === id);
    }

    createId(): string {
        let id = '';
        for (let i = 0; i < ID_LENGTH; i++) {
            id += ID_CHARS.charAt(Math.floor(Math.random() * ID_CHARS.length));
        }
        return id;
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
                return 'info';
        }
    }

    private updateExistingProduct() {
        const products = this.products();
        products[this.findIndexById(this.product.id!)] = this.product;
        this.products.set([...products]);
        this.showSuccess('Product Updated');
    }

    private createNewProduct() {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.showSuccess('Product Created');
        this.products.set([...this.products(), this.product]);
    }

    private confirmDelete(message: string, accept: () => void) {
        this.confirmationService.confirm({
            message,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept
        });
    }

    private showSuccess(detail: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail,
            life: TOAST_LIFE_MS
        });
    }
}
