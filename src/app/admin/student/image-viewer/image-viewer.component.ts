import { Component, OnInit } from '@angular/core';
import { SignalService } from '../../../shared/services/signal.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss'
})
export class ImageViewerComponent implements OnInit {

  imageURL = "";
  imageName: string | File = '';
  name = "";

  constructor(
    private _signalService: SignalService,
    public dialog: MatDialog,
    private _apiService: ApiService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.imageURL = this._signalService.getImagePath();     
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
    });
}

  updateProfile() {
    this.imageName = this._signalService.getImageName();   
    const a = this._signalService.getData();

    if (typeof a === 'object' && a !== null) {       
      this._apiService.updateProfile(Number(a.id), this.imageName).subscribe(
        response => {
          console.log('Profile updated successfully:', response);
          this.reloadCurrentRoute();
        this.closeDialog();
        },
        error => {
          console.error('Error updating profile:', error);          
        }
      );
    }
  } 


}
