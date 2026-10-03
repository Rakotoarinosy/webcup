import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FontScaleService } from '@/app/layout/service/font-scale.service';

@Component({
    selector: 'app-font-size',
    imports: [ButtonModule],
    templateUrl: './app.fontsize.html'
})
export class AppFontSize {
    readonly fontScale = inject(FontScaleService);
    readonly percent = computed(() => `${Math.round(this.fontScale.scale() * 100)} %`);
}
