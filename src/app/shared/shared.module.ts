import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { PageSideNavComponent } from './page-side-nav/page-side-nav.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageTableComponent } from './page-table/page-table.component';



@NgModule({
  declarations: [
    PageHeaderComponent,
    PageFooterComponent,
    PageSideNavComponent,
    PageNotFoundComponent,
    PageTableComponent
  ],
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  exports: [
    CommonModule, 
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,

    PageHeaderComponent,
    PageFooterComponent,
    PageSideNavComponent,
    PageNotFoundComponent,
    PageTableComponent,
  ]
})
export class SharedModule { }
