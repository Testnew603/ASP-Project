import { Component, OnInit } from '@angular/core';
import { Advisor, StaffStatus } from '../../../models/model';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignalService } from '../../../shared/services/signal.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerComponent } from '../../student/image-viewer/image-viewer.component';
import { EditAdvisorComponent } from '../edit-advisor/edit-advisor.component';

@Component({
  selector: 'view-advisor-detail',
  templateUrl: './view-advisor-detail.component.html',
  styleUrl: './view-advisor-detail.component.scss'
})
export class ViewAdvisorDetailComponent implements OnInit {

  statusArray: string[] = [];
  selectedStatus = 1;
  centered = false;
  hideImage = false;
  studentForm: any;
  selectedFile = '';
  imageurl: string = '';
  picture: string = '';

  advisors: Advisor[] = [];

  constructor(
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _signalService: SignalService,
    public dialog: MatDialog
  ) {
    for (let status of Object.values(StaffStatus).filter(x => typeof x === 'string')) {
      this.statusArray.push(status.toString());
    }
  }

  ngOnInit(): void {
    this.indivitualAdvisorDetails();
  }

  getAdvisorStatus(input: StaffStatus) {
    return StaffStatus[input];
  }

  openDialog() {
    const dialogRef = this.dialog.open(ImageViewerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editAdvisor() {
    const dialogRef = this.dialog.open(EditAdvisorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  viewDocuments() {

  }

  updateAdvisorStatus(): void {
    var a = this._signalService.getData();    
    const statusData = {
      id: a.id,      
      status: typeof(this.selectedStatus) === 'string'
      ? StaffStatus[this.selectedStatus as keyof typeof StaffStatus]
      : this.selectedStatus as StaffStatus
    };  
    this._apiService.updateAdvisorStatus(statusData);
                                   
  }

  indivitualAdvisorDetails() {
    var a = this._signalService.getData();
    if (typeof a === 'object' && a !== null) {
      this._apiService.getAdvisorById(Number(a.id)).subscribe(
        (data) => {
          this.advisors.push(data);                                                               
          this._apiService.getDomainById(data.domainId).subscribe(
            (x) => {
              for (let field of this.advisors) {
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

  selectFile(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file ? file.name : '';
    if (this.selectedFile) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (item: any) => {
        this.imageurl = item.target.result;
        this._signalService.setImagePath(this.imageurl);
        this.openDialog();
      }
    }

    var imagename = event.target.files[0];
    this._signalService.setImageName(imagename!);
  }

}
