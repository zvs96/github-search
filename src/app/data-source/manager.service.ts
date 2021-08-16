import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";
import {IFilterInput, IRepositoriesResult, IRepository, ISearchFilter} from "../types";

@Injectable()
export class ManagerService {

  private env = environment;

  constructor(
    private http: HttpClient
  ) {
  }

  searchRepositories(f: {
    searchFilter: ISearchFilter,
    filterInput: IFilterInput
  }): Observable<IRepositoriesResult> {
    return this.http.get<IRepositoriesResult>(
      `${this.env.repositoriesUrl}?q=${f.filterInput.query}+stars:${f.searchFilter.stars}&page=${f.filterInput.page}&per_page=${f.filterInput.per_page}`
    )
  }

  getRepository(repo_full_name: string): Observable<IRepository> {
    return this.http.get<IRepository>(`${this.env.repositoryUrl}/${repo_full_name}`)
  }
}
