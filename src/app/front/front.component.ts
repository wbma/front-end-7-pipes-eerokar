import { Component, OnInit } from '@angular/core';
import {MediaService} from '../services/media.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../interfaces/user';


@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  userInfo: User;

  newestImages: any;

  picIndex = 0;

  constructor(public mediaService: MediaService, private router: Router) { }

  ngOnInit() {
    this.mediaService.getUserData().subscribe((response: User) => {
      this.userInfo = response;
      console.log('Welcome ' + this.userInfo.username);

    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.router.navigate(['login']);
    });

    this.mediaService.getImages(this.picIndex.toString()).subscribe(result => {
      this.newestImages = result;
      this.picIndex += 10;
    }, err => {
      console.log(err);
    });

  }

  loadMore() {
    this.mediaService.getImages(this.picIndex.toString()).subscribe( (result: Object[]) => {
      this.newestImages.push(...result);
      this.picIndex += 10;
    }, err => {
      console.log(err);
    });
  }

}
