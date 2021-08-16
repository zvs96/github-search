import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {ISearchFilter} from "../../types";

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFiltersComponent implements OnInit {

  @Input() set filters(f: ISearchFilter) {
    this.form.patchValue(f, {emitEvent: false})
  }

  @Output() changeFilters = new EventEmitter<ISearchFilter>()

  form = new FormGroup(<{ [key in keyof ISearchFilter]: FormControl }>{
    stars: new FormControl(null),
  })

  constructor() {
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(f => this.changeFilters.emit(f))
  }

  onFiltersChange() {
  }

}
