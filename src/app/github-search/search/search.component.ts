import {ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  searchControl = new FormControl('');

  @Input() loading!: boolean;

  @Input() set query(q: string) {
    this.searchControl.setValue(q, {emitEvent: false})
  };

  @Output() search = new EventEmitter<string>()

  constructor() {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(q => this.search.emit(q))
  }

}
