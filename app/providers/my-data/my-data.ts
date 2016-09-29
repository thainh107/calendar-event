import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyData {
  items:any;
  constructor(public http: Http) {
    
  }
  load(){
    if (this.items) {
      // already loaded users
      return Promise.resolve(this.items);
    }
    return new Promise(resolve => {
    this.http.get('calendar.json')
        .subscribe(users => {
          // we've got back the raw users, now generate the core schedule users
          // and save the users for later reference
          this.items = users.json();
          resolve(this.items);
      });
    });
  }
}

