import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'add-advisor',
  templateUrl: './add-advisor.component.html',
  styleUrl: './add-advisor.component.scss'
})
export class AddAdvisorComponent implements OnInit {
  hidePwdContent: boolean = true;
  registerForm: FormGroup;
  educationOptions= [   
    "10 th Pass",
    "HSC",
    "BA", "BCom", "BBA", "BCA",
    "MA", "MCom", "MBA", "MCA"  
  ];
  domainName: any[] = [];
  selectedProfile: any;
  
  selectProfile(event: any) {
    const file: File = event.target.files[0];
    //this.selectedProfile = file ? file.name : ''; 
    this.registerForm.get('profile')?.setValue(file.name);        
    this.selectedProfile = event.target.files[0];
  }

  selectedDocument: any;
  selectDocument(event: any) {
    const file: File = event.target.files[0];
    //this.selectedDocument = file ? file.name : ''; 
    this.selectedDocument = event.target.files[0];
    this.registerForm.get('documents')?.setValue(file.name);      
  }

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _snackBar: MatSnackBar
    ) { 
    this.registerForm = _fb.group({
      firstName: _fb.control('', [Validators.required]), 
      lastName: _fb.control('', [Validators.required]),
      birthDate: _fb.control('', [Validators.required]),
      gender: _fb.control('male', [Validators.required]),
      email: _fb.control('', [Validators.required]),      
      mobile: _fb.control('', [Validators.required]),
      qualification: _fb.control('', [Validators.required]),
      domainId: _fb.control('', [Validators.required]),
      documents: _fb.control(''),
      profile: _fb.control(''),
      password: _fb.control('', [Validators.required]),
      rPassword: _fb.control('', [Validators.required])      
    })    
  } 
  
  ngOnInit(): void {
    this.domainList();
  }

  register() {
    
    const domainTableId = this.domainName.find(
      (domain) => domain.subDomain ===  this.registerForm.get('domainId')?.value);         
    let advisor = {     
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      birthDate: this.registerForm.get('birthDate')?.value,
      gender: this.registerForm.get('gender')?.value,
      email: this.registerForm.get('email')?.value,      
      mobile: this.registerForm.get('mobile')?.value,
      qualification: this.registerForm.get('qualification')?.value,
      domainId: domainTableId.id,
      //documents: this.selectedDocument, 
      //profile: this.selectedProfile,
      password: this.registerForm.get('password')?.value     
    }           
    
    this._apiService.addNewAdvisor(advisor, this.selectedProfile, this.selectedDocument);
    this.registerForm.reset(); 
  }

  domainList() {
    this._apiService.GetDomainList().subscribe(
      (data) => {
        this.domainName = data.map(domain => ({ id: domain.id, subDomain: domain.subDomain }));                    
      }
    )
  }

}


