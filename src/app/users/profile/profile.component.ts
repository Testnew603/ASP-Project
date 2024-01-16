import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { SpecializedIn, StaffStatus, Status } from '../../models/model';
import { ThisReceiver } from '@angular/compiler';

export interface TableElement{
  name: string;
  value: string;
}

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  columns: string[] = ['name', 'value'];
  dataSource: TableElement[] = [];

  constructor(private _apiService: ApiService) { 
    let admin = _apiService.AdminInfo!;
    let staff = _apiService.StaffInfo!;
    let student = this._apiService.StudentInfo!;  
    let trainer = this._apiService.TrainerInfo!;  

    if (student.role == "STUDENT") {
      this._apiService.getStudentById(student.id).subscribe(
        (response) => {
          const dob = new Date(response.result.birthDate);
          this.dataSource = [
            { name: "Id", value: response.result.id?.toString() || 'N/A' },
            { name: "Name", value: `${response.result.firstName || 'N/A'} ${response.result.lastName || 'N/A'}` },
            { name: "BirthDate", value: dob.toLocaleDateString() },
            { name: "Email", value: `${response.result.email || 'N/A'}` },
            { name: "Address", value: `${response.result.address || 'N/A'}` },
            { name: "Qualification", value: `${response.result.qualification || 'N/A'}` },
            { name: "Domain", value: `${response.result.domainId || 'N/A'}` },
            { name: "Status", value: `${Status[response.result.status] || 'N/A'}` }
          ];                                   
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
    } else if (admin.role == "ADMIN") {          

          this.dataSource = [                                    
            { name: "Email", value: `${admin.email || 'N/A'}` },                        
            { name: "Role", value: `${admin.role || 'N/A'}` },
            { name: "Status", value: `${admin.status || 'N/A'}` }
          ];                    
    } else if(staff.role == "ADVISOR") {
      this._apiService.getAdvisorById(staff.id).subscribe(
        (response) => {
          const dob = new Date(response.birthDate);
          this.dataSource = [
            { name: "Id", value: response.id?.toString() || 'N/A' },
            { name: "Name", value: `${response.firstName || 'N/A'} ${response.lastName || 'N/A'}` },
            { name: "BirthDate", value: dob.toLocaleDateString() },
            { name: "Email", value: `${response.email || 'N/A'}` },            
            { name: "Qualification", value: `${response.qualification || 'N/A'}` },
            { name: "Domain", value: `${response.domainId || 'N/A'}` },
            { name: "Status", value: `${StaffStatus[response.status] || 'N/A'}` }
          ];                                        
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
    } else if(staff.role == "HRMANAGER") {
      this._apiService.getHRManagerById(staff.id).subscribe(
        (response) => {
          const dob = new Date(response.birthDate);
          this.dataSource = [
            { name: "Id", value: response.id?.toString() || 'N/A' },
            { name: "Name", value: `${response.firstName || 'N/A'} ${response.lastName || 'N/A'}` },
            { name: "BirthDate", value: dob.toLocaleDateString() },
            { name: "Email", value: `${response.email || 'N/A'}` },            
            { name: "Qualification", value: `${response.qualification || 'N/A'}` },
            { name: "Domain", value: `${response.domainId || 'N/A'}` },
            { name: "Status", value: `${StaffStatus[response.status] || 'N/A'}` }
          ];                                        
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
    } else if(trainer.role == "TRAINER") {
      this._apiService.getTrainerById(staff.id).subscribe(
        (response) => {          
          this.dataSource = [
            { name: "Id", value: response.id?.toString() || 'N/A' },
            { name: "Name", value: `${response.firstName || 'N/A'} ${response.lastName || 'N/A'}` },            
            { name: "Email", value: `${response.email || 'N/A'}` },            
            { name: "Gender", value: `${response.gender || 'N/A'}` },
            { name: "SpecializedIn", value: `${SpecializedIn[response.specializedIn] || 'N/A'}` },
            { name: "Status", value: `${StaffStatus[response.status] || 'N/A'}` }
          ];                                        
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
    } else if(staff.role == "REVIEWER") {
      this._apiService.getReviewerById(staff.id).subscribe(
        (response) => {          
          this.dataSource = [
            { name: "Id", value: response.id?.toString() || 'N/A' },
            { name: "Name", value: `${response.firstName || 'N/A'} ${response.lastName || 'N/A'}` },            
            { name: "Email", value: `${response.email || 'N/A'}` },            
            { name: "Mobile", value: `${response.mobile || 'N/A'}` },
            { name: "Domain", value: `${response.domainId || 'N/A'}` },
            { name: "Status", value: `${StaffStatus[response.status] || 'N/A'}` }
          ];                                        
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
    } 
    else {
      console.error('something went wrong.');
    }
  }
  }
