import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  name: string = '';
  loggedIn: boolean = false;
  
  constructor(private _apiService: ApiService, private _router: Router) {
    _apiService.userStatus.subscribe({
      next: res => {
        if(res == 'loggedIn') {
          this.loggedIn = true;
          let student = this._apiService.StudentInfo!;
          let admin = this._apiService.AdminInfo!;
          let staff = this._apiService.StaffInfo!;
          if(student != null || admin != null || staff != null) {
            if(student.role === "STUDENT") {
            this.name = `${student.firstName} ${student.lastName}`;            
            } else if(admin.role === "ADMIN") {
              this.name = "Admin";                                                               
            } else {    
              this.name = `${staff.firstName} ${staff.lastName}`;     
            }
          }
        }
      },
    });
  }

    logout() {
      this._apiService.logOut();
      this._router.navigateByUrl('/login');
      this.loggedIn = false;
    }
}
