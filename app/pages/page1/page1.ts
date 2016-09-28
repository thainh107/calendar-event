import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {FriendComponent} from './friend.component';
import {Events} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/page1/page1.html',
  directives: [FriendComponent]
})

export class Page1 {
  time: String;
  mode: String;
  items: any;
  public http: any;
  leavetype: any;
  year: string;
  monthString: String;
  devList: any;
  dateChange: any;
  month: any;
  shortMonth: String;
  startW5day: String;
  startW5month: String;
  endW5day: String;
  endW5month: String;
  endM: number;
  friends:any;

  constructor(public navCtrl: NavController, http: Http, public events:Events) {
    var d = new Date();
    this.month = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    this.time = this.month[d.getMonth()];
    if (d.getMonth() == 11) {
      this.endM = 0;
    }
    else {
      this.endM = d.getMonth();
    }
    this.monthString = new Date(d.getFullYear(), this.endM + 1, 0).getDate().toString();
    this.year = new Date().toISOString();
    this.http = http;
    this.http.get('calendar.json')
      .subscribe(data => {
        console.log(data);
        this.items = JSON.parse(data._body);//Bind data to items object
      }, error => {
        console.log(error);// Error getting the data
      });
    this.leavetype = '';
  }
  onPageLoaded() {
    setTimeout(() => {
      this.devList = this.items.filter(item => item.month.startsWith(this.endM));
      //this.myFunction();
      this.changeMonth();
    }, 3000);
  }
  myFunction() {
    // Put here the code you want to execute
    
    var count = 0;
    var width = 0;
    var left = 0;
    var kind = '';
    this.devList.forEach(element => {
      width = (this.devList[count].days) / 42 * 100;
      left = ((this.devList[count].start) - 1) / 42 * 100;
      document.getElementById("r_" + count).setAttribute("style", "width:" + width + "%; margin-left:" + left + "%");
      kind = this.devList[count].kind;
      document.getElementById("r_" + count).setAttribute("class", "itemNode textReason " + kind);
      count++;
    });
  }

  changeMonth() {
    // this.dateChange = new Date().toISOString().getUTCMonth()

    let displayDate = new Date(this.year);
    this.devList = this.items.filter(item => item.month.startsWith(displayDate.getMonth()));

    this.events.publish('myEvent',this.devList);

    var getMofD = displayDate.getMonth() + 1;
    if (displayDate.getMonth() == 11) {
      getMofD = 0;
    }
    this.dateChange = this.month[displayDate.getMonth()];
    this.monthString = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate().toString();
    this.shortMonth = this.shortMonths(displayDate.getMonth().toString());
    //load the last column
    if (this.dateChange.toString() == "February") {
      var mFeb = new Date(displayDate.getFullYear(), 2, 0).getDate();
      if ((mFeb - 28) == 0) {
        this.startW5day = "1";
        this.startW5month = "Mar";
        this.endW5day = "7";
        this.endW5month = "Mar";
      }
      else {
        this.startW5day = "29";
        this.startW5month = this.shortMonth;
        this.endW5day = "6";
        this.endW5month = "Mar";
      }
    }
    else {
      this.startW5day = "29";
      this.startW5month = this.shortMonth;
      var day = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
      var lastDay = 7 - (day - 28);
      this.endW5day = lastDay.toString();
      this.endW5month = this.shortMonths(getMofD);      
    }
    //this.myFunction();
  }
  shortMonths(m) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[m].toString();
  }




}


