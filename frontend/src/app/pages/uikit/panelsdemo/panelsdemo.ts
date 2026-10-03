import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { TabsModule } from 'primeng/tabs';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-panels-demo',
    imports: [ToolbarModule, ButtonModule, SplitButtonModule, AccordionModule, FieldsetModule, InputTextModule, DividerModule, SplitterModule, PanelModule, TabsModule, IconFieldModule, InputIconModule],
    templateUrl: './panelsdemo.html',
    styleUrl: './panelsdemo.scss'
})
export class PanelsDemo {
    // Toolbar split button actions.
    readonly items: MenuItem[] = [
        { label: 'Save', icon: 'pi pi-check' },
        { label: 'Update', icon: 'pi pi-upload' },
        { label: 'Delete', icon: 'pi pi-trash' },
        { label: 'Home Page', icon: 'pi pi-home' }
    ];
}
