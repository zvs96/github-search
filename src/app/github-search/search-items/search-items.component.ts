import {ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";

import {IFilterInput, IRepository} from "../../types";

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchItemsComponent implements OnInit {

  @Input() items: IRepository[] = [];
  @Input() total_count: number = 0;
  @Input() loading!: boolean;
  @Input() filtersInput!: IFilterInput;

  @Output() changeFilters = new EventEmitter<Partial<IFilterInput>>()

  constructor() {
  }

  ngOnInit(): void {
  }

  onPageChange(event: PageEvent) {
    this.changeFilters.emit({
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    })
  }

}
