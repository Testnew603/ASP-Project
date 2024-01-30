import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Advisor, Domain, Status, StudentDetails } from '../../models/model';
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
 
  selectStudent(student: StudentDetails) {
    this._signalService.setData(student); 
    this._router.navigateByUrl('/student-detail');     
  }

  selectAdvisor(advisor: Advisor) {
    this._signalService.setData(advisor); 
    console.log(this._signalService.getData());
    
    this._router.navigateByUrl('/student-detail');     
  }
 


} 
