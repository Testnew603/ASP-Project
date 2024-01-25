import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ViewAdvisorsComponent } from './view-advisors/view-advisors.component';
import { ViewStudentDetailComponent } from './view-student-detail/view-student-detail.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';


@NgModule({
  declarations: [
    ViewStudentsComponent,
    ViewAdvisorsComponent,
    ViewStudentDetailComponent,
    ViewDocumentsComponent,
    EditStudentComponent,    
  ],
  imports: [SharedModule],
})
export class ADMINModule { }
