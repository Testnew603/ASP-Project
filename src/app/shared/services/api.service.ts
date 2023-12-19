import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { StudentDetails } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService
    ) { }

  baseUrl: string = "https://localhost:7197/api/Student/";
  userStatus: Subject<string> = new Subject();

  register(studentDetails: any) {
   return this.http.post(this.baseUrl + 'Register', studentDetails,  
   {responseType: 'text'});  
  }

  login(info: any) {
    let params = new HttpParams()
    .append('email', info.email)
    .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login', {
      params: params,
      responseType: 'text'
    });
  }

  isLoggedIn(): boolean {
    if(
      localStorage.getItem('accessToken') != null && 
      !this.jwt.isTokenExpired()
    )
    return true;
    return false;
  }

  get StudentInfo(): StudentDetails | null {
    if(!this.isLoggedIn()) return null;

    var decodedToken = this.jwt.decodeToken();
    var studentDetails: Pick<StudentDetails, 'id' | 'firstName' | 'lastName' | 'birthDate' | 'email' | 'status' | 'type'> = {
      id: decodedToken.id,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      birthDate: decodedToken.birthDate, 
      email: decodedToken.email,
      status: decodedToken.status,
      type: decodedToken.type,      
    }
    return studentDetails as StudentDetails;
  }

  logOut() {
    localStorage.removeItem('accessToken');
    this.userStatus.next('loggedOff');
  }
}
