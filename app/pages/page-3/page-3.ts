import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';

/*
  Generated class for the Page3Page page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/page-3/page-3.html',
})
export class Page3Page {
  http: any;
  items: any;
  constructor(private navCtrl: NavController, http: Http) {
    
    this.http = http;
    this.http.get('test.json')
      .subscribe(data => {
        console.log(data);
        this.items = JSON.parse(data._body);//Bind data to items object
      }, error => {
        console.log(error);// Error getting the data
      });
  }
buttonClick(event){
   console.log("button clicked");
   console.log(event);
  }

  itemClicked(event,itemData){
    console.log("item clicked");
    console.log(event);
    console.log(itemData);
  }
}
