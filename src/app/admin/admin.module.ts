import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ViewAdvisorsComponent } from './view-advisors/view-advisors.component';



@NgModule({
  declarations: [
    ViewStudentsComponent,
    ViewAdvisorsComponent
  ],
  imports: [SharedModule],
})
export class ADMINModule { }
