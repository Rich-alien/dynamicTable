import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {InputRangeType} from "../../models/input-range.model";

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.less']
})
export class InputRangeComponent {
  /** formGroup
   * @description FormGroup,
   * */
  @Input()
  formGroup: FormGroup = new FormGroup({});

  /** settings
   * @description filter settings (minimum value, maximum value, text on the side value primary, controlName in the form),
   * */
  @Input()
  settings: InputRangeType = {
    title: '',
    value: 0,
    min: 0,
    max: 0,
    controlName: ''
  }

  /** getValue
   * @description Get the value of the selected item from the form by name,
   * */
  public getValue(): number | string {
    return this.formGroup.get(this.settings.controlName)?.value;
  }
}
