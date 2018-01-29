import { Injectable } from '@angular/core';

@Injectable()
export class MediaService {

  username: string;
  password: string;

  constructor() { }

  public login() {
    console.log('uname: ' + this.username);
    console.log('pwd: ' + this.password);
  }

}
