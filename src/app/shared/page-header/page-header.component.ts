import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  name: string = '';
  loggedIn: boolean = false;
  constructor(private _apiService: ApiService) {
    _apiService.userStatus.subscribe({
      next: res => {
        if(res == 'loggedIn') {
          this.loggedIn = true;
          let user = _apiService.StudentInfo!;
          this.name = `${user.firstName} ${user.lastName}`;
        }
      },
    });
  }

    logout() {
      this._apiService.logOut();
      this.loggedIn = false;
    }
}
