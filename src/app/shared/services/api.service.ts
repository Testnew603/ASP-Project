import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { Admin, Advisor, Domain, ResponseMessages, SpecializedIn, StaffStatus, Status, StudentDetails, TokenData, Trainer, UpdateProfile } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService
  ) { }

  baseUrl: string = "https://localhost:7197/api/";
  userStatus: Subject<string> = new Subject();

  register(studentDetails: any) {
    return this.http.post(this.baseUrl + 'Login/Register', studentDetails,
      { responseType: 'text' });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  // ---------------------------------LOGIN SECTION-----------------------------------------//  
  AdminLogin(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login/AdminLogin', {
      params: params,
      responseType: 'text'
    });
  }

  StudentLogin(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login/StudentLogin', {
      params: params,
      responseType: 'text'
    });
  }

  GeneralManagerLogin(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login/GeneralManagerLogin', {
      params: params,
      responseType: 'text'
    });
  }

  HRManagerLogin(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login/HRManagerLogin', {
      params: params,
      responseType: 'text'
    });
  }

  AdvisorLogin(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login/AdvisorLogin', {
      params: params,
      responseType: 'text'
    });
  }

  ReviewerLogin(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login/ReviewerLogin', {
      params: params,
      responseType: 'text'
    });
  }

  TrainerLogin(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login/TrainerLogin', {
      params: params,
      responseType: 'text'
    });
  }


  // ---------------------------------PUBLIC SECTION-----------------------------------------//

  // get domain by ID
  getDomainById(id: number): Observable<any> {
    let params = new HttpParams().append('id', String(id));

    return this.http.get<any>(`${this.baseUrl}Domain/GetDomainById`, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // get domain
  GetDomainList() {
    return this.http.get<Domain[]>(this.baseUrl + 'Domain/DomainList');
  }

  isLoggedIn(): boolean {
    if (
      localStorage.getItem('accessToken') != null &&
      !this.jwt.isTokenExpired()
    )
      return true;
    return false;
  }

  logOut() {
    localStorage.removeItem('accessToken');
    this.userStatus.next('loggedOff');
  }

  // ---------------------------------ADMIN SECTION-----------------------------------------//

  get AdminInfo(): Admin | null {
    if (!this.isLoggedIn()) return null;

    var decodedToken = this.jwt.decodeToken();
    var adminDetails: Admin = {
      email: decodedToken.email,
      role: decodedToken.role,
      status: decodedToken.status,
    }
    return adminDetails;
  }

  get StaffInfo(): TokenData | null {
    if (!this.isLoggedIn()) return null;

    var decodedToken = this.jwt.decodeToken();
    var advisorDetails: TokenData = {
      id: decodedToken.id,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      birthDate: decodedToken.dob,
      email: decodedToken.email,
      status: StaffStatus[decodedToken.status as keyof typeof StaffStatus],
      role: decodedToken.role,
    }
    return advisorDetails as Advisor;
  }

  // ---------------------------------STUDENT SECTION-----------------------------------------//

  get StudentInfo(): StudentDetails | null {
    if (!this.isLoggedIn()) return null;

    var decodedToken = this.jwt.decodeToken();
    var studentDetails: Pick<StudentDetails, 'id' | 'firstName' | 'lastName' | 'birthDate' | 'email' |
      'status' | 'role'> = {
      id: decodedToken.id,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      birthDate: decodedToken.dob,
      email: decodedToken.email,
      status: Status[decodedToken.status as keyof typeof Status],
      role: decodedToken.role,
    }
    return studentDetails as StudentDetails;
  }

  // get all students list
  getStudentList() {
    return this.http.get<StudentDetails[]>(this.baseUrl + 'Admin/StudentList');
  }

  // get student by ID
  getStudentById(id: number): Observable<any> {
    let params = new HttpParams().append('id', String(id));

    return this.http.get<any>(`${this.baseUrl}Admin/GetStudent`, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  //get student profile path
  getStudentProfilePath(): Observable<ResponseMessages> {
    return this.http.get<any>(this.baseUrl + 'Admin/StudentProfilePath');
  }

  //update student profile by id
  updateProfile(studentId: number, file: File): Observable<any> {
    let params = new HttpParams().append('studentid', String(studentId));
    const formData: FormData = new FormData();
    formData.append('formFile', file, file.name);    
  
    return this.http.put(this.baseUrl + 'Admin/UpdateProfile', formData, { params: params }).pipe(
      catchError(this.handleError)
    );
  }

  // ---------------------------------ADVISOR SECTION-----------------------------------------//  

  // get all advisor list
  getAdvisorList() {
    return this.http.get<Advisor[]>(this.baseUrl + 'Advisor/AdvisorList');
  }
  
  // get advisor by ID
  getAdvisorById(id: number): Observable<any> {
    let params = new HttpParams().append('Id', String(id));             
    return this.http.get<any>(`${this.baseUrl}Advisor/GetAdvisorById`, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  //add advisor
  addNewAdvisor(advisordata: any, file: any, doc: any) {   
    let profileToUpload = <File>file;
    let documentToUpload = <File>doc;    

    const formData = new FormData();  
    Object.keys(advisordata).forEach(key => {
      formData.append(key, advisordata[key]);
  });

    formData.append('imageFile', profileToUpload, profileToUpload.name);
    formData.append('docFile', documentToUpload, documentToUpload.name);

    return this.http.post(this.baseUrl + 'Advisor/AddAdvisor', formData, { responseType: 'text' })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
}

  upload(files: any): Observable<HttpEvent<any>> {
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(this.baseUrl + 'Advisor/Upload', formData, { reportProgress: true, observe: 'events' });
  }

   //update advisor profile by id
   updateAdvisorProfile(advisorId: number, file: File): Observable<any> {   
    const formData = new FormData();
    formData.append('Id', advisorId.toString());
    formData.append('Profile', file, file.name);    
    
    return this.http.put(this.baseUrl + 'Advisor/UpdateAdvisorProfile', formData).pipe(
      catchError(this.handleError) 
    ); 
  }
 
  //update advisor by id
  updateAdvisor(advisor: Omit<Advisor, 'password' | 'profile' | 'documents' | 'role' >) {                 
    return this.http.put(this.baseUrl + 'Advisor/UpdateAdvisor', advisor)
  }

   //update advisor status by id
   updateAdvisorStatus(advisor: Pick<Advisor, 'id' | 'status'>) {  
    return this.http.put(this.baseUrl + 'Advisor/UpdateAdvisorStatus', advisor).subscribe(
      (data) => { console.log(data);
       }
    )
  }

  // ---------------------------------HRMANAGER SECTION-----------------------------------------//  

  // get hrmanager by ID
  getHRManagerById(id: number): Observable<any> {
    let params = new HttpParams().append('id', String(id));

    return this.http.get<any>(`${this.baseUrl}HRManager/gethrbyid`, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // ---------------------------------TRAINER SECTION-----------------------------------------//  

  get TrainerInfo(): Trainer | null {
    if (!this.isLoggedIn()) return null;

    var decodedToken = this.jwt.decodeToken();
    var trainerDetails: Pick<Trainer, 'id' | 'firstName' | 'lastName' | 'email' |
      'status' | 'specializedIn' | 'role'> = {
      id: decodedToken.id,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email,
      status: StaffStatus[decodedToken.status as keyof typeof StaffStatus],
      specializedIn: SpecializedIn[decodedToken.specializedIn as keyof typeof SpecializedIn],
      role: decodedToken.role,
    }
    return trainerDetails as Trainer;
  }

  // get trainer by ID
  getTrainerById(id: number): Observable<any> {
    let params = new HttpParams().append('id', String(id));

    return this.http.get<any>(`${this.baseUrl}Trainer/gettrainerbyid`, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // ---------------------------------REVIEWER SECTION-----------------------------------------//  

  // get reviewer by ID
  getReviewerById(id: number): Observable<any> {
    let params = new HttpParams().append('id', String(id));

    return this.http.get<any>(`${this.baseUrl}Reviwer/getreviewerbyid`, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // get general manager by ID
  getGeneralManagerById(id: number): Observable<any> {
    let params = new HttpParams().append('id', String(id));

    return this.http.get<any>(`${this.baseUrl}GeneralManager/getmanagerbyid`, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

}
