import { Component } from '@angular/core';
import {Events} from 'ionic-angular';


@Component({
    selector: 'my-friends',
    template: `
        <ion-row *ngFor="let dev of devList;let i = index" style="width:980px" class="rowChild">
                <div style="width:16.67%; margin-left:0%" class="infor textInfo">
                    {{dev.name}} - {{dev.phoneno}}
                </div>

                <div id="r_{{i}}" style="width:0%; margin-left:0%">
                    {{dev.start}} - {{dev.end}} {{shortMonth}} ({{dev.location}})
                </div>

            </ion-row>
    `
})
export class FriendComponent{
    devList:any;
    componentName:any;
    tempM:any;
    constructor(public events:Events){
        this.devList=[{
        "name": "Chirs Par",
        "phoneno": "0924543534",
        "start": "1",
        "end": "3",
        "location": "VN",
        "month": "8",
        "kind": "work",
        "days": "3"
    },
    {
        "name": "Lee CY",
        "phoneno": "0123567890",
        "start": "10",
        "end": "14",
        "location": "KL",
        "month": "8",
        "kind": "trip",
        "days": "4"
    },
    {
        "name": "Khanh",
        "phoneno": "0903899734",
        "start": "3",
        "end": "16",
        "location": "Singapore",
        "month": "9",
        "kind": "off",
        "days": "14"
    }, {
        "name": "Hanh",
        "phoneno": "098034834",
        "start": "8",
        "end": "20",
        "location": "JP",
        "month": "9",
        "kind": "trip",
        "days": "13"
    }, {
        "name": "Dang",
        "phoneno": "097343424",
        "start": "1",
        "end": "20",
        "location": "UK",
        "month": "9",
        "kind": "work",
        "days": "21"
    }, {
        "name": "Tien",
        "phoneno": "090382222734",
        "start": "20",
        "end": "29",
        "location": "Congo",
        "month": "9",
        "kind": "work",
        "days": "11"
    }
];
        this.componentName = "directive";
        var d=new Date();
        this.tempM = d.getMonth();
        this.events.subscribe('myEvent',(object) => {      
            console.log('goi dc roi');
            console.log(object[0]);
            this.devList=object[0];
        });
        //this.devList=this.devList.filter(item => item.month.startsWith(d.getMonth()));
    }
}