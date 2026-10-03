import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Product, ProductService } from '@/app/pages/service/product.service';

@Component({
    selector: 'app-overlay-demo',
    imports: [ToastModule, DialogModule, ButtonModule, DrawerModule, PopoverModule, ConfirmPopupModule, InputTextModule, TooltipModule, TableModule],
    templateUrl: './overlaydemo.html',
    styleUrl: './overlaydemo.scss',
    providers: [ConfirmationService, MessageService, ProductService]
})
export class OverlayDemo implements OnInit {
    private readonly productService = inject(ProductService);
    private readonly confirmationService = inject(ConfirmationService);
    private readonly messageService = inject(MessageService);

    products: Product[] = [];
    selectedProduct!: Product;

    display = false;
    displayConfirmation = false;

    visibleLeft = false;
    visibleRight = false;
    visibleTop = false;
    visibleBottom = false;
    visibleFull = false;

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => (this.products = products));
    }

    open() {
        this.display = true;
    }

    close() {
        this.display = false;
    }

    openConfirmation() {
        this.displayConfirmation = true;
    }

    closeConfirmation() {
        this.displayConfirmation = false;
    }

    toggleDataTable(op: Popover, event: any) {
        op.toggle(event);
    }

    onProductSelect(op: Popover, event: any) {
        op.hide();
        this.messageService.add({
            severity: 'info',
            summary: 'Product Selected',
            detail: event?.data.name,
            life: 3000
        });
    }

    confirm(event: Event) {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target || new EventTarget(),
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Save'
            },
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'You have accepted'
                });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected'
                });
            }
        });
    }
}
