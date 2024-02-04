import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { SignalService } from '../../../shared/services/signal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { StaffStatus } from '../../../models/model';

@Component({
  selector: 'edit-advisor',
  templateUrl: './edit-advisor.component.html',
  styleUrl: './edit-advisor.component.scss',
  providers: [LowerCasePipe],
})
export class EditAdvisorComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  advisorForm: any;
  domainName: any[] = [];
  selectedFile?: FileList;
  educationOption: string[] = [   
    "10 th Pass",
    "HSC",
    "BA", "BCom", "BBA", "BCA",
    "MA", "MCom", "MBA", "MCA"   
  ];

  constructor(  
    public dialog: MatDialog,
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _signalService: SignalService,
    private _snackBar: MatSnackBar,
    private _lowerCasePipe: LowerCasePipe,
  ) {
    this.advisorForm =  _fb.group({
      id: _fb.control('', [Validators.required]),
      firstName: _fb.control('', [Validators.required]),
      lastName: _fb.control('', [Validators.required]),
      birthDate: _fb.control('', [Validators.required]),
      gender: _fb.control('', [Validators.required]),
      email: _fb.control('', [Validators.required]),
      mobile: _fb.control('', [Validators.required]),
      qualification: _fb.control('', [Validators.required]),
      domainId: _fb.control('', [Validators.required]), 
      status: _fb.control('', [Validators.required]),
    })    
  }

  ngOnInit(): void {
    this.domainList();    
    this.indivitualStudentDetails();
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogContentExampleDialog);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  updateData(): void {
    var a = this._signalService.getData();
    if(this.advisorForm.valid) {
      this.advisorForm.id = a.id;
      const advisorDomain = this.advisorForm.get('domainId')?.value;  
      let originalDomainId = this.domainName.find((item) => item.subDomain === advisorDomain);  
      this.advisorForm.get('domainId').setValue(originalDomainId.id.toString())                                
      let updatedData = this.advisorForm.value;         
      this._apiService.updateAdvisor(updatedData);
    }
  }   

  indivitualStudentDetails() {    
    var a = this._signalService.getData();
    if (typeof a === 'object' && a !== null) {
      this._apiService.getAdvisorById(a.id).subscribe(
        (data) => {
          data.birthDate = new DatePipe('en-US').transform(data.birthDate, 'yyyy-MM-dd')          
          const a = this.domainName.find((x) => x.id == data.domainId)          
          data.domainId = a ? a.subDomain : '';    
          data.gender = this._lowerCasePipe.transform(data.gender);                                    
          this.advisorForm.patchValue(data);                                                                   
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
