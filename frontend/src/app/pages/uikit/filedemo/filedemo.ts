import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-file-demo',
    imports: [CommonModule, FileUploadModule, ToastModule, ButtonModule],
    templateUrl: './filedemo.html',
    styleUrl: './filedemo.scss',
    providers: [MessageService]
})
export class FileDemo {
    private readonly messageService = inject(MessageService);

    readonly uploadedFiles: any[] = [];

    onUpload(event: any) {
        this.uploadedFiles.push(...event.files);
        this.showUploadToast('File Uploaded');
    }

    onBasicUpload() {
        this.showUploadToast('File Uploaded with Basic Mode');
    }

    private showUploadToast(detail: string) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail });
    }
}
