import {Component, OnInit} from '@angular/core';

import {RepositoryStore} from "./repository.store";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  providers: [RepositoryStore]
})
export class RepositoryComponent implements OnInit {

  loading$ = this.store.loading$;
  repository$ = this.store.repository$;

  constructor(
    private store: RepositoryStore,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.store.loadRepository(this.route.params as Observable<{ repo_name: string }>)
  }

}
