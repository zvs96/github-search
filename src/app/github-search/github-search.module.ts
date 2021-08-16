import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginatorDefaultOptions,
  MatPaginatorModule
} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from "@angular/material/checkbox";

import {GithubSearchRoutingModule} from './github-search-routing.module';
import {GithubSearchComponent} from './github-search.component';
import {SearchComponent} from './search/search.component';
import {SearchItemComponent} from './search-items/search-item/search-item.component';
import {SearchFiltersComponent} from './search-filters/search-filters.component';
import {SearchItemsComponent} from './search-items/search-items.component';

@NgModule({
  declarations: [
    GithubSearchComponent,
    SearchComponent,
    SearchItemComponent,
    SearchFiltersComponent,
    SearchItemsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GithubSearchRoutingModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {
        pageSizeOptions: [10, 25, 50, 100],
      } as MatPaginatorDefaultOptions
    }, {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: {
        color: 'primary'
      } as MatCheckboxDefaultOptions
    }
  ]
})
export class GithubSearchModule {
}
