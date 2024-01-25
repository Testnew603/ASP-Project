import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { ViewStudentsComponent } from './admin/view-students/view-students.component';
import { ViewAdvisorsComponent } from './admin/view-advisors/view-advisors.component';
import { StudentLoginComponent } from './auth/student-login/student-login.component';
import { HrLoginComponent } from './auth/hr-login/hr-login.component';
import { ReviewerLoginComponent } from './auth/reviewer-login/reviewer-login.component';
import { AdvisorLoginComponent } from './auth/advisor-login/advisor-login.component';
import { GManagerLoginComponent } from './auth/g-manager-login/g-manager-login.component';
import { ViewStudentDetailComponent } from './admin/view-student-detail/view-student-detail.component';
import { ViewDocumentsComponent } from './admin/view-documents/view-documents.component';
import { EditStudentComponent } from './admin/student/edit-student/edit-student.component';


export const routes: Routes = [
    {path: "register", component: RegisterComponent},
    {path: "student-login", component: StudentLoginComponent}, 
    {path: "advisor-login", component: AdvisorLoginComponent},
    {path: "hr-login", component: HrLoginComponent},
    {path: "reviewer-login", component: ReviewerLoginComponent},
    {path: "trainer-login", component: ReviewerLoginComponent},
    {path: "generalmanager-login", component: GManagerLoginComponent},
    {path: "login", component: LoginComponent},
    {path: "home", component: RegisterComponent},
    {path: "profile", component: ProfileComponent},
    {path: "view-students", component: ViewStudentsComponent},
    {path: "student-detail", component: ViewStudentDetailComponent},
    {path: "edit-detail", component: EditStudentComponent},
    {path: "view-documents", component: ViewDocumentsComponent},
    {path: "view-advisors", component: ViewAdvisorsComponent},        
    {path: "**", component: PageNotFoundComponent},
];

