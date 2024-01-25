import { Component } from '@angular/core';
import { Domain, Status, StudentDetails } from '../../models/model';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'view-students',
  templateUrl: './view-students.component.html',
  styleUrl: './view-students.component.scss'
})
export class ViewStudentsComponent {
  columns: string[] = ['UserId', 'Name', 'Email', 'Domain', 'Status', 'Action'];
  students: StudentDetails[] = [];
  domains: Domain[] = [];

  constructor(private _apiService: ApiService, private _snackBar: MatSnackBar, private _router: Router) {
    this._apiService.getStudentList().subscribe({
      next: (res: StudentDetails[]) => {
        this.students = res;

        for (let i = 0; i < this.students.length; i++) {
          this._apiService.getDomainById(Number(this.students[i].domainId)).subscribe(
            data => { this.students[i].domainId = data.subDomain; },
            error => { this._snackBar.open('Error fetching domain:', error); }
          );
        }
      },
      error: (error) => {
        this._snackBar.open('Error fetching student list:', error);
      }
    });
  }

  addstudent() {
    this._router.navigateByUrl('/register');
  }

}
