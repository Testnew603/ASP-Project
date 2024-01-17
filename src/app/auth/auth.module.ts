import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { StudentLoginComponent } from './student-login/student-login.component';
import { HrLoginComponent } from './hr-login/hr-login.component';
import { AdvisorLoginComponent } from './advisor-login/advisor-login.component';
import { ReviewerLoginComponent } from './reviewer-login/reviewer-login.component';
import { TrainerLoginComponent } from './trainer-login/trainer-login.component';
import { GManagerLoginComponent } from './g-manager-login/g-manager-login.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    StudentLoginComponent,
    HrLoginComponent,
    AdvisorLoginComponent,
    ReviewerLoginComponent,
    TrainerLoginComponent,
    GManagerLoginComponent
  ],
  imports: [SharedModule]
})
export class AuthModule { }
