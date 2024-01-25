import { Component, OnInit, Type } from '@angular/core';
import { Domain, Status, StudentDetails } from '../../models/model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { SignalService } from '../../shared/services/signal.service';

@Component({
  selector: 'view-student-detail',
  templateUrl: './view-student-detail.component.html',
  styleUrl: './view-student-detail.component.scss'
})
export class ViewStudentDetailComponent implements OnInit {

  statusArray: string[] = [];
  centered = false;
  hideImage = false;

  students: StudentDetails[] = [];

  constructor(
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _signalService: SignalService
  ) {
    for (let status of Object.values(Status).filter(x => typeof x === 'string')) {
      this.statusArray.push(status.toString());
    }
  }

  ngOnInit(): void {
    this.indivitualStudentDetails();
  }

  ImageOpacity() {
    this.hideImage = !this.hideImage;
    this.hideImage ? this._snackBar.open('Profile Hidden', 'Ok') :
      this._snackBar.open('Profile Active', 'Ok')
  }

  viewDocuments() {
    this._router.navigateByUrl('/view-documents')
  }

  indivitualStudentDetails() {
    
    var a = this._signalService.getData();
    if (typeof a === 'object' && a !== null) {

      this._apiService.getStudentById(a.id).subscribe(
        (data) => {          
          this.students.push(data.result);                      
          
          this._apiService.getDomainById(data.result.domainId).subscribe(
            (x) => {
              for (let field of this.students) {
                field.domainId = x.subDomain;                                                  
              }
            }
          )
        },
      );
    } else {
      console.log("Data is not available or is not an object");
    }
  }

  getStudentStatus(input: Status) {
    return Status[input];
  }

  editStudent() {
    this._router.navigateByUrl('edit-detail');
  }

}

