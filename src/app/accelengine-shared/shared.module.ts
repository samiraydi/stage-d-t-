import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { GMapModule } from 'primeng/gmap';
import { TimelineModule } from 'primeng/timeline';

//  components
import { MenuMasterComponent } from './components/menu/menu-master/menu-master.component';
import { MenuDetailComponent } from './components/menu/menu-detail/menu-detail.component';
import { MenuSaveComponent } from './components/menu/menu-save/menu-save.component';
import { MenuCrudComponent } from './components/menu/menu-crud/menu-crud.component';
import { MainDataTableComponent } from './components/data-table/main/main-data-table.component';
import { SelectableDataTableComponent } from './components/data-table/selectable/selectable-data-table.component';
import { InputFormComponent } from './components/forms/input-form.component';
import { InputTextareaFormComponent } from './components/forms/input-textarea-form.component';
import { InputValidationComponent } from './components/forms/validation-form.component';
import { SelectFormComponent } from './components/forms/select-form.component';
import { MultiSelectFormComponent } from './components/forms/multiselect-form.component';
import { SwitchFormComponent } from './components/forms/switch-form.component';
import { CriteriaComponent } from './components/criteria/criteria.component';
import { InputDateComponent } from './components/forms/input-date.component';
import { InputNumberComponent } from './components/forms/input-number.component';
import { FileFormComponent } from './components/forms/file-form.component';
import { InputColorComponent } from './components/forms/input-color.component';

import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorBlockModule } from 'ngx-color/block';
import { ColorGithubModule } from 'ngx-color/github';
import { ColorCompactModule } from 'ngx-color/compact';

// Service

const PRIMENG = [
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    InplaceModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    SelectButtonModule,
    SidebarModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    GMapModule,
    TimelineModule
];

const COMPONENTS = [
    MenuMasterComponent,
    MenuDetailComponent,
    MenuSaveComponent,
    MenuCrudComponent,
    MainDataTableComponent,
    SelectableDataTableComponent,
    InputFormComponent,
    InputTextareaFormComponent,
    InputValidationComponent,
    SelectFormComponent,
    MultiSelectFormComponent,
    SwitchFormComponent,
    CriteriaComponent,
    InputDateComponent,
    InputNumberComponent,
    FileFormComponent,
    InputColorComponent
];

const COLOR = [
    ColorSketchModule,
    ColorBlockModule,
    ColorGithubModule,
    ColorCompactModule
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        ...PRIMENG,
        ...COLOR
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        ...COMPONENTS,
        ...PRIMENG,
        ...COLOR
    ],
    entryComponents: [
    ],
    providers: [
    ],
})
export class SharedModule { }
