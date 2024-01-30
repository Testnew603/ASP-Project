import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ViewAdvisorsComponent } from './view-advisors/view-advisors.component';
import { ViewStudentDetailComponent } from './view-student-detail/view-student-detail.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';
import { ImageViewerComponent } from './student/image-viewer/image-viewer.component';
import { ViewHrComponent } from './hr/view-hr/view-hr.component';
import { ViewTrainerComponent } from './trainer/view-trainer/view-trainer.component';
import { ViewReviewerComponent } from './reviewer/view-reviewer/view-reviewer.component';


@NgModule({
  declarations: [
    ViewStudentsComponent,
    ViewAdvisorsComponent,
    ViewStudentDetailComponent,
    ViewDocumentsComponent,
    EditStudentComponent,
    ImageViewerComponent,
    ViewHrComponent,
    ViewTrainerComponent,
    ViewReviewerComponent,    
  ],
  imports: [SharedModule],
})
export class ADMINModule { }
