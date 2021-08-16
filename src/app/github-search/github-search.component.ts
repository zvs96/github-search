import {Component, OnInit} from '@angular/core';

import {GithubSearchStore} from "./github-search.store";
import {IFilterInput, ISearchFilter} from "../types";

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.scss'],
  providers: [GithubSearchStore]
})
export class GithubSearchComponent implements OnInit {

  totalCount$ = this.store.totalCount$;
  query$ = this.store.query$;
  filterInput$ = this.store.filterInput$;
  repositories$ = this.store.repositories$;
  searchFilter$ = this.store.searchFilter$;
  loading$ = this.store.loading$;

  constructor(
    private store: GithubSearchStore
  ) {
  }

  ngOnInit(): void {
    this.store.loadRepositories(this.store.filters$)
  }

  onSearch(query: string) {
    this.onFiltersChange({query})
  }

  onFiltersChange(filters: Partial<IFilterInput>) {
    this.store.updateFilters(filters)
  }

  onSearchFiltersChange(filters: ISearchFilter) {
    this.store.updateSearchFilters(filters)
  }

}
