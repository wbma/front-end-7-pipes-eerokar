import { Component, OnInit } from '@angular/core';
import {Media} from '../interfaces/media';
import {MediaService} from '../services/media.service';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  file: File;

  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  media: Media = {
    title: '',
    description: ''
  };

  constructor(private mediaService: MediaService) { }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  startUpload() {

      const formData = new FormData();

      formData.append('file', this.file);
      formData.append('title', this.media.title);
      formData.append('description', this.media.description);

      console.log(formData);

    this.mediaService.upload(formData).subscribe(response => {
      console.log(response);

    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  ngOnInit() {
  }

}
