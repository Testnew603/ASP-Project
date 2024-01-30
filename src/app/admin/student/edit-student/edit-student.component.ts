import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignalService } from '../../../shared/services/signal.service';
import { DatePipe } from '@angular/common';
import { Domain } from '../../../models/model';

@Component({
  selector: 'edit-student',
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss'
})
export class EditStudentComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-student-data.html',
  styleUrl: './dialog-content-student-data.scss',
  standalone: true,
  imports: [SharedModule],
})
export class DialogContentExampleDialog implements OnInit  {
  email = new FormControl('', [Validators.required, Validators.email]);
  studentForm: any;
  domainName: any[] = [];
  selectedFile?: FileList;
  educationOption: string[] = [   
    "10 th Pass",
    "HSC",
    "BA", "BCom", "BBA", "BCA",
    "MA", "MCom", "MBA", "MCA"  
  ];

  constructor(  
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _signalService: SignalService,
    private _snackBar: MatSnackBar
  ) {
    this.studentForm =  _fb.group({
      firstName: _fb.control('', [Validators.required]),
      lastName: _fb.control('', [Validators.required]),
      birthDate: _fb.control('', [Validators.required]),
      gender: _fb.control('male', [Validators.required]),
      email: _fb.control('', [Validators.required]),
      address: _fb.control('', [Validators.required]),
      mobile: _fb.control('', [Validators.required]),
      qualification: _fb.control('', [Validators.required]),
      domainId: _fb.control('', [Validators.required]),
      documents: _fb.control(''),
      // profile: _fb.control(''),    
    })    
  }

  ngOnInit(): void {
    this.domainList();    
    this.indivitualStudentDetails();
  }

//   selectFile(event: any) { 
//     this.selectedFile = event.target.files;
//     console.log(this.selectedFile?.item(0)?.name);   
    
// }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  updateData(): void {
    if(this.studentForm.valid) {
      if(this.selectedFile) {
        this.studentForm.documents = this.selectedFile?.item(0)?.name;
      }
      let updatedData = this.studentForm.value;
      console.log(updatedData);      
    }
  } 

  indivitualStudentDetails() {    
    var a = this._signalService.getData();
    if (typeof a === 'object' && a !== null) {
      this._apiService.getStudentById(a.id).subscribe(
        (data) => {
          data.result.birthDate = new DatePipe('en-US').transform(data.result.birthDate, 'yyyy-MM-dd')          
          const a = this.domainName.find((x) => x.id == data.result.domainId)          
          data.result.domainId = a.subDomain;
          this.studentForm.patchValue(data.result);                                                                  
        },
      );
    } else {
      console.log("Data is not available or is not an object");
    }    
  }

  //for displaying the database value at default selection
  compareObjects(o1: any, o2: any) {
    if(o1.qualification == o2.qualification)
    return true;
    else return false
  }

  compareDomain(o1: any, o2: any) {
    if(o1.subDomain == o2.subDomain)
    return true;
    else return false
  }

  domainList() {
    this._apiService.GetDomainList().subscribe(
      (data) => {
        this.domainName = data.map(domain => ({ id: domain.id, subDomain: domain.subDomain }));                    
      }
    )
  }

  

 
  
}
