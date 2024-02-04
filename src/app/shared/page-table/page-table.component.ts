import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Advisor, Domain, StaffStatus, Status, StudentDetails } from '../../models/model';
import { Router } from '@angular/router';
import { SignalService } from '../services/signal.service';

@Component({
  selector: 'page-table',
  templateUrl: './page-table.component.html',
  styleUrl: './page-table.component.scss'
})
export class PageTableComponent {

  constructor(private _signalService: SignalService, private _router:Router) { }

  @Input()
  columns: string[] = [];

  @Input()
  dataSource: any[] = [];

  @Input()
  domains: Domain[] = [];

  @Output()
  selected = new EventEmitter<StudentDetails>();

  getStudentStatus(input: Status) {
    return Status[input];
  } 

  getAdvisorStatus(input: StaffStatus) {
    return StaffStatus[input];
  }
 
  selectStudent(student: StudentDetails) {
    this._signalService.setData(student);
    this._signalService.setUserRole('STUDENT');
    this._router.navigateByUrl('/student-detail');     
  }

  selectAdvisor(advisor: Advisor) {
    this._signalService.setData(advisor);     
    this._signalService.setUserRole('ADVISOR');
    this._router.navigateByUrl('/advisor-detail');     
  }
 

} 
