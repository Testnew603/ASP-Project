import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, AuthModule],
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
