import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hidePwdContent: boolean = true;
  registerForm: FormGroup;
  educationOptions= [   
    "10 th Pass",
    "HSC",
    "BA", "BCom", "BBA", "BCA",
    "MA", "MCom", "MBA", "MCA"  
  ]

  selectedFiles = '';
  selectFile(event: any) {
    const file: File = event.target.files[0];
    this.selectedFiles = file ? file.name : ''; 
    this.registerForm.get('documents')?.setValue(file.name);
    this.registerForm.get('profile')?.setValue(file.name);
    console.log(this.selectedFiles);
    
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
      address: _fb.control('', [Validators.required]),
      mobile: _fb.control('', [Validators.required]),
      qualification: _fb.control('', [Validators.required]),
      domainId: _fb.control('3', [Validators.required]),
      documents: _fb.control(''),
      profile: _fb.control(''),
      password: _fb.control('', [Validators.required]),
      rPassword: _fb.control('', [Validators.required])      
    })    
  }

  register() {
    let student = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      birthDate: this.registerForm.get('birthDate')?.value,
      gender: this.registerForm.get('gender')?.value,
      email: this.registerForm.get('email')?.value,
      address: this.registerForm.get('address')?.value,
      mobile: this.registerForm.get('mobile')?.value,
      qualification: this.registerForm.get('qualification')?.value,
      domainId: this.registerForm.get('domainId')?.value,
      documents: this.registerForm.get('documents')?.value,
      profile: this.registerForm.get('profile')?.value,
      password: this.registerForm.get('password')?.value,
      rPassword: this.registerForm.get('rPassword')?.value,
    }
    console.log(student);
    
    this._apiService.register(student).subscribe({
      next: res => {
        this._snackBar.open(res, 'OK');
      },
    });
    this.registerForm.reset();
  }
}
