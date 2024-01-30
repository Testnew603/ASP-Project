import { Injectable, signal } from '@angular/core';
import { StudentDetails } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  constructor() { }

  message: string = "no signal";
  uploadprofile?: File;
  private data = signal<any>(this.message);
  private imagepath = signal<string>(this.message);
  private file = signal<File>(this.uploadprofile!);

  setData(userid: any) { 
    this.data.set(userid);
  }
  getData() { 
    return this.data();
  }

  setImagePath(profile: string) {
    this.imagepath.set(profile);
  } 
  getImagePath() {
    return this.imagepath();
  }

  setImageName(filename: File) {
    this.file.set(filename)
  }
  getImageName() { 
    return this.file();
  }

}
