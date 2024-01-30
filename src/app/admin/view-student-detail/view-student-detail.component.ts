import { Component, OnInit, Type } from '@angular/core';
import { ResponseMessages, Status, StudentDetails } from '../../models/model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { SignalService } from '../../shared/services/signal.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerComponent } from '../student/image-viewer/image-viewer.component';

@Component({
  selector: 'view-student-detail',
  templateUrl: './view-student-detail.component.html',
  styleUrl: './view-student-detail.component.scss'
})
export class ViewStudentDetailComponent implements OnInit {

  statusArray: string[] = [];
  centered = false;
  hideImage = false;
  studentForm: any;
  selectedFile = '';
  imageurl: string = '';

  students: StudentDetails[] = [];

  constructor(
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _signalService: SignalService,
    public dialog: MatDialog
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

  openDialog() {
    const dialogRef = this.dialog.open(ImageViewerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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


  selectFile(event: any) {
    var name = '';
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

    this._apiService.getStudentProfilePath().subscribe(
      (response) => {
        name = response.result + imagename;
      },
      (error) => {
        console.error("Error occurred:", error);
      }
    );
  }

}

