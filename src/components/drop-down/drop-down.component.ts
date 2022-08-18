import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropDownType} from "../../models/drop-down.model";

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.less']
})
export class DropDownComponent {

  /** dropDownOptions
   * @description  Data for options in the selector.
   * */
  @Input()
  dropDownOptions: DropDownType[] = []

  /** dropDownTitle
   * @description  Additional text from the left side,
   * */
  @Input()
  dropDownTitle: string = '';

  /** handleSelectOption
   * @description Transmitting data about the selected item to the child ,
   * */
  @Output()
  handleSelectOption: EventEmitter<string | number> = new EventEmitter<string | number>()

  /** selectOption
   * @description  Filtering item and sorting if there was data about it ,
   * @param {Event} value: the subject of filter
   * */
  selectOption(value: Event) {
    this.handleSelectOption.emit((value.target as HTMLInputElement).value)
  }
}
