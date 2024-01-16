import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

export interface NavigationItem {
  value: string;
  link: string
}

@Component({
  selector: 'page-side-nav',
  templateUrl: './page-side-nav.component.html',
  styleUrl: './page-side-nav.component.scss'
})
export class PageSideNavComponent {
  panelName: string = '';
  navItems: NavigationItem[] = [];

  constructor(
    private _apiService: ApiService,
    private _router: Router
    ) {
    this.navItems = [
      {value: 'View Students', link: 'view-students'},
      {value: 'View Staff', link: 'view-staff'}
    ];

    _apiService.userStatus.subscribe({
      next: status => {
        if(status === "loggedIn") {
          _router.navigateByUrl("/profile")
          let user = _apiService.StudentInfo;
          if(user != null) {
            if(user.role === "STUDENT") {
              this.panelName = 'Student Panel';
              this.navItems = [
                {value: 'ViewStudent', link: '/home'},
                { value: 'ViewStaff', link: '/home' },
                { value: 'View', link: '/home' }
              ];
            }

          }
          
        } else if(status == "loggedOff"){
          this.panelName = 'Auth Panel';
            _router.navigateByUrl('/login');
            this.navItems = [];
        }
      }
    })
  }

}
