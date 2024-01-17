import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface NavigationItem {
  value: string;
  link: string
}

@Component({
  selector: 'page-side-nav',
  templateUrl: './page-side-nav.component.html',
  styleUrl: './page-side-nav.component.scss'
})
export class PageSideNavComponent implements OnInit {

  panelName: string = '';
  navItems: NavigationItem[] = [];

  ngOnInit(): void {
    
  }
  constructor(
    private _apiService: ApiService,
    private _router: Router,
    private _act: ActivatedRoute
    ) {
    this.navItems = [
      {value: 'View Students', link: 'view-students'},
      {value: 'View Staff', link: 'view-staff'}
    ];

    _apiService.userStatus.subscribe({
      next: status => {
        if(status === "loggedIn") {
          _router.navigateByUrl("/profile")
          let student = this._apiService.StudentInfo!;
          let admin = this._apiService.AdminInfo!;
          let staff = this._apiService.StaffInfo!;
          if(student != null || admin != null || staff != null) {
            if(student.role === "STUDENT") {
              this.panelName = 'Student Panel';
              this.navItems = [
                {value: 'ViewStudent', link: '/home'},
                { value: 'ViewStaff', link: '/home' },
              ];
            } else if(staff.role === "ADVISOR") {
              this.panelName = 'Advisor Panel';
              this.navItems = [
                {value: 'ViewStudent', link: '/home'},
                { value: 'ViewStaff', link: '/home' },
              ];
            } else if(staff.role === "HRMANAGER") {
              this.panelName = 'HR-Manager Panel';
              this.navItems = [
                {value: 'ViewStudent', link: '/home'},
                { value: 'ViewStaff', link: '/home' },
              ];
            } else if(staff.role === "GENERALMANAGER") {
              this.panelName = 'Manager Panel';
              this.navItems = [
                {value: 'ViewStudent', link: '/home'},
                { value: 'ViewStaff', link: '/home' },
              ];
            }else if(staff.role === "TRAINER") {
              this.panelName = 'Trainer Panel';
              this.navItems = [
                {value: 'ViewStudent', link: '/home'},
                { value: 'ViewStaff', link: '/home' },
              ];
            } else if(staff.role === "REVIEWER") {
              this.panelName = 'Reviewer Panel';
              this.navItems = [
                {value: 'ViewStudent', link: '/home'},
                { value: 'ViewStaff', link: '/home' },                
              ];
            } else {
              this.panelName = 'Admin Panel';
              this.navItems = [
                {value: 'ViewStudents', link: '/view-students'},
                { value: 'ViewAdvisors', link: '/view-advisors' },
                { value: 'View', link: '/home' }
              ];
            }
          }
          
        } else if(status == "loggedOff"){
          this.panelName = 'Auth Panel';
            //this._router.navigateByUrl('/student-login');                       
          this.navItems = [];
        }
      }
    })
  }

}
