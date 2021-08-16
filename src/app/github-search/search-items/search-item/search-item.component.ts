import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {IRepository} from "../../../types";

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchItemComponent implements OnInit {
  @Input() item!: IRepository;

  constructor() { }

  ngOnInit(): void {
  }

}
