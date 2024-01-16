import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ViewStudentsComponent,
    ProfileComponent
  ],
  imports: [SharedModule],
})
export class UsersModule { }
