import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';

export const routes: Routes = [
    {path: "register", component: RegisterComponent},
    {path: "login", component: LoginComponent},
    {path: "home", component: RegisterComponent},
    {path: "profile", component: ProfileComponent},
    {path: "**", component: PageNotFoundComponent},
];
