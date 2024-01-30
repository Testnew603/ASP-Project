import { Component } from '@angular/core';
import { Advisor, Domain, StaffStatus, Status } from '../../models/model';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignalService } from '../../shared/services/signal.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'view-advisors',
  templateUrl: './view-advisors.component.html',
  styleUrl: './view-advisors.component.scss'
})
export class ViewAdvisorsComponent {

  columns: string[] = ['UserId', 'Name', 'Email', 'Domain', 'Status', 'AdvisorAction'];
  advisor: Advisor[] = [];
  domains: Domain[] = [];

  constructor(
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _signalService: SignalService,
    public dialog: MatDialog
  ) {
    this._apiService.getAdvisorList().subscribe({
      next: (res: Advisor[]) => {
        this.advisor = res;

        for (let i = 0; i < this.advisor.length; i++) {
          this._apiService.getDomainById(Number(this.advisor[i].domainId)).subscribe(
            data => { this.advisor[i].domainId = data.subDomain; },
            error => { this._snackBar.open('Error fetching domain:', error); }
          );
        }
      },
      error: (error) => {
        this._snackBar.open('Error fetching student list: ', 'OK'); 
      }
    }); 
  }
  
  addadvisor() {
    
  }

}
