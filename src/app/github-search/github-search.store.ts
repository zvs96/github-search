import {Injectable} from "@angular/core";
import {EMPTY, Observable, of} from "rxjs";
import {catchError, concatMap, finalize, map, tap} from "rxjs/operators";

import {ComponentStore} from "@ngrx/component-store";
import {MatSnackBar} from "@angular/material/snack-bar";

import {IFilterInput, ISearchFilter, State} from "../types";
import {ManagerService} from "../data-source/manager.service";

const INITIAL_STATE: State = {
  loading: false,
  total_count: 0,
  filterInput: {
    query: '',
    page: 1,
    per_page: 25,
  },
  searchFilter: {
    stars: '>=0'
  },
  repositories: []
}

@Injectable()
export class GithubSearchStore extends ComponentStore<State> {
  constructor(
    private manager: ManagerService,
    private snackBar: MatSnackBar
  ) {
    super(INITIAL_STATE);
  }

  /**
   * Selectors
   */
  readonly query$ = this.select(state => state.filterInput.query);
  readonly loading$ = this.select(state => state.loading);
  readonly searchFilter$ = this.select(state => state.searchFilter);
  readonly filterInput$ = this.select(state => state.filterInput);
  readonly filters$ = this.select(
    this.searchFilter$,
    this.filterInput$,
    (sf, fI) => ({
      searchFilter: sf,
      filterInput: fI,
    })
  );
  readonly totalCount$ = this.select(state => state.total_count);
  readonly repositories$ = this.select(state => state.repositories);

  /**
   * Updaters
   */
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading
  }))
  readonly updateFilters = this.updater((state, partialFilterInput: Partial<IFilterInput>) => ({
    ...state,
    filterInput: {
      ...state.filterInput,
      ...partialFilterInput
    }
  }))
  readonly updateSearchFilters = this.updater((state, filters: ISearchFilter) => ({
    ...state,
    searchFilter: filters
  }))

  /**
   * Effects
   */
  readonly loadRepositories = this.effect((origin$: Observable<{
    searchFilter: ISearchFilter,
    filterInput: IFilterInput
  }>) => origin$.pipe(
    tap(() => this.setLoading(true)),
    concatMap(filters => {
      if (!filters.filterInput.query) {
        this.setState(state => ({
          ...state,
          total_count: 0,
          loading: false,
          repositories: []
        }))
        return of(null)
      }

      return this.manager.searchRepositories(filters).pipe(
        map(data => {
          this.setState(state => ({
            ...state,
            total_count: data.total_count,
            repositories: data.items
          }))
        }),
        catchError((err: Error) => {
          this.setState(state => ({
            ...state,
            total_count: 0,
            repositories: []
          }))

          this.snackBar.open(
            err.message, undefined, {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000
            })
          return EMPTY
        }),
        finalize(() => this.setLoading(false))
      )
    })
  ))
}
