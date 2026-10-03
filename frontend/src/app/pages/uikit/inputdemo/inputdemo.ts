import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeSelectModule } from 'primeng/treeselect';
import { CountryService } from '@/app/pages/service/country.service';
import { Country } from '@/app/pages/service/customer.service';
import { NodeService } from '@/app/pages/service/node.service';

const CITIES = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];

const MULTISELECT_COUNTRIES: Country[] = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
];

@Component({
    selector: 'app-input-demo',
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        RadioButtonModule,
        SelectButtonModule,
        InputGroupModule,
        FluidModule,
        IconFieldModule,
        InputIconModule,
        FloatLabelModule,
        AutoCompleteModule,
        InputNumberModule,
        SliderModule,
        RatingModule,
        ColorPickerModule,
        KnobModule,
        SelectModule,
        DatePickerModule,
        ToggleButtonModule,
        ToggleSwitchModule,
        TreeSelectModule,
        MultiSelectModule,
        ListboxModule,
        InputGroupAddonModule,
        TextareaModule
    ],
    templateUrl: './inputdemo.html',
    styleUrl: './inputdemo.scss',
    providers: [CountryService, NodeService]
})
export class InputDemo implements OnInit {
    readonly countryService = inject(CountryService);
    readonly nodeService = inject(NodeService);

    // Option lists
    readonly listboxValues: any[] = CITIES;
    readonly dropdownValues = CITIES;
    readonly multiselectCountries: Country[] = MULTISELECT_COUNTRIES;
    readonly selectButtonValues: any = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }];
    treeSelectNodes!: TreeNode[];

    // AutoComplete: full country list and the current filtered suggestions
    autoValue: any[] | undefined;
    autoFilteredValue: any[] = [];

    // Bound form values
    floatValue: any = null;
    selectedAutoValue: any = null;
    calendarValue: any = null;
    inputNumberValue: any = null;
    sliderValue = 50;
    ratingValue: any = null;
    colorValue = '#1976D2';
    knobValue = 50;
    radioValue: any = null;
    checkboxValue: any[] = [];
    switchValue = false;
    listboxValue: any = null;
    dropdownValue: any = null;
    multiselectSelectedCountries!: Country[];
    selectedNode: any = null;
    toggleValue = false;
    selectButtonValue: any = null;
    inputGroupValue = false;

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.autoValue = countries;
        });

        this.nodeService.getFiles().then((data) => (this.treeSelectNodes = data));
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        const query = event.query.toLowerCase();
        this.autoFilteredValue = (this.autoValue as any[]).filter((country) => country.name.toLowerCase().startsWith(query));
    }
}
