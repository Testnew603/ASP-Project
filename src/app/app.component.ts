import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ApiService } from './shared/services/api.service';
import { UsersModule } from './users/users.module';
import { ActionsModule } from './actions/actions.module';
import { ADMINModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    AuthModule,
    UsersModule,
    ADMINModule,
    PublicModule,
    ActionsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  
  title = 'ASP-UI';
  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    let status = this._apiService.isLoggedIn() ? "loggedIn" : "loggedOff";
    this._apiService.userStatus.next(status);
  }

}
