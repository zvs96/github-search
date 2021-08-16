import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {RepositoryComponent} from './repository.component';
import {RepositoryRoutingModule} from "./repository-routing.module";

@NgModule({
  declarations: [
    RepositoryComponent
  ],
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class RepositoryModule {
}
