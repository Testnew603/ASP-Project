import { Injectable, signal } from '@angular/core';
import { StudentDetails } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  constructor() { }

  message: string = "no signal";
  private data = signal<StudentDetails | string>(this.message);

  setData(student: StudentDetails) { 
    this.data.set(student);
  }

  getData() {
    return this.data();
  }

}
