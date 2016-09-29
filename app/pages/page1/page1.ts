import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {FriendComponent} from './friend.component';
import {Events} from 'ionic-angular';
import {MyData} from '../../providers/my-data/my-data';

@Component({
  templateUrl: 'build/pages/page1/page1.html',
  directives: [FriendComponent],
  providers:[MyData]
})

export class Page1 {
  @ViewChild('myDiv') private myfriends:ElementRef;
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

  constructor(public navCtrl: NavController, http: Http, public events: Events,myData : MyData) {
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
    this.leavetype = '';
    //load data and excute function
    myData.load()
    .then(user => this.items = user)
    .then(user=>this.changeMonth());
  }
  changeMonth() {
    let displayDate = new Date(this.year);
    this.devList = this.items.filter(item => item.month.startsWith(displayDate.getMonth()));

    this.events.publish('myEvent', this.devList);

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
  }

  shortMonths(m) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[m].toString();
  }

}


