import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';


@Component({
  templateUrl: 'build/pages/page1/page1.html'

})
export class Page1 {
  time: String;
  items: any;
  public http: any;

  constructor(public navCtrl: NavController, http: Http) {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    this.time = month[d.getMonth()];
    this.http = http;
    this.http.get('calendar.json')
      .subscribe(data => {
        console.log(data);
        this.items = JSON.parse(data._body);//Bind data to items object
        //document.getElementById("r_0").setAttribute("style", "width:50.1%; margin-left:10%");
      }, error => {
        console.log(error);// Error getting the data
      });





  }
  myFunction() {

    var count = 0;
    var width = 0;
    var left = 0;
    this.items.forEach(element => {
      width = (this.items[count].days) / 49 * 100;
      left = ((this.items[count].start) - 1) / 49 * 100;
      document.getElementById("r_" + count).setAttribute("style", "width:" + width + "%; margin-left:" + left + "%");
      count++;
    });
  }

 


}

