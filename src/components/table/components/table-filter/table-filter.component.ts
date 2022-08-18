import {Component, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {InputRangeType} from "../../../../models/input-range.model";
import {FilterOutputType} from "../../../../models/filter.model";

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.less']
})
export class TableFilterComponent {
  /** handleSubmit
   * @description Data for filtering are sent to the child,
   * */
  @Output()
  handleSubmit: EventEmitter<FilterOutputType[]> = new EventEmitter()

  /** isFilterOpen
   * @description Opening or closing the filtering window ,
   * */
  public isFilterOpen: boolean = false;

  /** form
   * @description Filter form,
   * */
  public form: FormGroup = new FormGroup({
    wbRating: new FormControl(0, []),
    reviewsCount: new FormControl(20, []),
  })

  /** settingForm
   * @description Data settings in the form for input-range,
   * */
  public settingForm: InputRangeType[] = [
    {
      title: 'Рейтинг от',
      value: 0,
      min: 0,
      max: 10,
      controlName: 'wbRating'
    },
    {
      title: 'Кол-во отзывов от',
      value: 20,
      min: 20,
      max: 295,
      controlName: 'reviewsCount'
    }
  ];

  /**
   * @description Processing a click outside the popup (when the click is outside the popup is closed),
   * */
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.isFilterOpen) {
      this.changePopup();
    }
  }

  constructor(private elementRef: ElementRef) {
  }

  /** changePopup
   * @description Changing the filter popup
   * */
  changePopup() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  /** submit
   * @description Checking the form for correctness and sending data to a child
   * */
  submit() {
    if (!this.form.valid) {
      return this.form.markAllAsTouched();
    }
    let body: FilterOutputType[] = []
    Object.keys(this.form.value).forEach((key: string) => {
      body.push({type: key, value: this.form.value[key]})
    });
    this.handleSubmit.emit(body);
    this.changePopup();
  }

  /** reset
   * @description Filter cleaning
   * */
  reset() {
    this.form.reset({
        wbRatingStart: 0
      }
    )
    this.handleSubmit.emit([]);
    this.changePopup();
  }
}
