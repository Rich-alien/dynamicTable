import {NgModule} from "@angular/core";
import {TableComponent} from "./table/table.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DropDownComponent} from "./drop-down/drop-down.component";
import {TableSortingComponent} from "./table/components/table-sorting/table-sorting.component";
import {TableFilterComponent} from "./table/components/table-filter/table-filter.component";
import {InputRangeComponent} from "./input-range/input-range.component";
import {ReactiveFormsModule} from "@angular/forms";
import {IconsModule} from "../icons/icons.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    IconsModule
  ],
  declarations: [
    TableComponent,
    DropDownComponent,
    TableSortingComponent,
    TableFilterComponent,
    InputRangeComponent
  ],
  exports: [
    TableComponent,
    DropDownComponent,
    TableSortingComponent,
    TableFilterComponent,
    InputRangeComponent
  ]
})
export class CommonModule {
}
