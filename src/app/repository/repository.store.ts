import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Router} from "@angular/router";
import {catchError, concatMap, finalize, tap} from "rxjs/operators";
import {EMPTY, Observable} from "rxjs";

import {RepositoryState} from "../types";
import {ManagerService} from "../data-source/manager.service";

@Injectable()
export class RepositoryStore extends ComponentStore<RepositoryState> {
  constructor(
    private router: Router,
    private manager: ManagerService,
  ) {
    super({
      loading: false,
      repository: null
    });
  }

  /**
   * Selectors
   */
  readonly loading$ = this.select(state => state.loading)
  readonly repository$ = this.select(state => state.repository)

  /**
   * Updaters
   */
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading
  }))

  /**
   * Effects
   */
  readonly loadRepository = this.effect((origin$: Observable<{ repo_name: string }>) => origin$.pipe(
    tap(() => this.setLoading(true)),
    concatMap(({repo_name}) => {
      return this.manager.getRepository(unescape(repo_name)).pipe(
        tap((data) => {
          this.setState(state => ({...state, repository: data}))
        }),
        catchError((err: Error) => {
          this.router.navigate(['.'])
          return EMPTY
        }),
        finalize(() => this.setLoading(false)),
      )
    })
  ))

}
