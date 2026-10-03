import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-messages-demo',
    imports: [CommonModule, ToastModule, ButtonModule, InputTextModule, MessageModule, FormsModule],
    templateUrl: './messagesdemo.html',
    styleUrl: './messagesdemo.scss',
    providers: [MessageService]
})
export class MessagesDemo {
    private readonly service = inject(MessageService);

    username: string | undefined;

    email: string | undefined;

    // Pass-through options vertically centering the inline message content
    readonly pt: any = {
        contentWrapper: 'flex items-center'
    };

    showInfoViaToast() {
        this.showToast('info', 'Info Message', 'PrimeNG rocks');
    }

    showWarnViaToast() {
        this.showToast('warn', 'Warn Message', 'There are unsaved changes');
    }

    showErrorViaToast() {
        this.showToast('error', 'Error Message', 'Validation failed');
    }

    showSuccessViaToast() {
        this.showToast('success', 'Success Message', 'Message sent');
    }

    private showToast(severity: string, summary: string, detail: string) {
        this.service.add({ severity, summary, detail });
    }
}
