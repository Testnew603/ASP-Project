import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'advisor-login',
  templateUrl: './advisor-login.component.html',
  styleUrl: './advisor-login.component.scss'
})
export class AdvisorLoginComponent {

  loginForm: FormGroup;
  hidePwdContent: boolean = true;
  
  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _snackBar: MatSnackBar
    ) {
    this.loginForm = this._fb.group({
      email: _fb.control('', [Validators.required]),
      password: _fb.control('', [Validators.required]),
    })
  }

  AdvisorLogin() {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };      
      this._apiService.AdvisorLogin(loginInfo).subscribe({
        next: (res) => {
          if (res == 'not found')
          this._snackBar.open('Credential are invalid!', 'OK');
        else if (res == 'unapproved')
          this._snackBar.open('Your account is not Aprooved by Admin!', 'OK');
          else if (res == 'blocked')
          this._snackBar.open('Your account is BLOCKED. Please go to admin office to Unblock.', 'OK');
        else {
            localStorage.setItem('accessToken', res);                                           
            
            this._apiService.userStatus.next("loggedIn");
          }        
        },
      });  
    }

}
