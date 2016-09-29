import { Component } from '@angular/core';
import {Events} from 'ionic-angular';
import {MyData} from '../../providers/my-data/my-data';


@Component({
    selector: 'myfriends',
    template: `
        <ion-row *ngFor="let dev of devList;let i = index" style="width:980px" class="rowChild">
                <div style="width:16.67%; margin-left:0%" class="infor textInfo">
                    {{dev.name}} - {{dev.phoneno}}
                </div>
                <div [ngStyle]="{width:(dev.start-1)/42*100+'%'}"></div>
                <div class="{{dev.kind}}" [ngStyle]="{width:dev.days/42*100+'%'}">
                    {{dev.start}} - {{dev.end}} {{shortMonth}} ({{dev.location}})
                    </div>

            </ion-row>
    `,
  providers:[MyData]
})
export class FriendComponent{
    devList:any;
    componentName:any;
    tempM:any;
    constructor(public events:Events,myData : MyData){     
        var d=new Date();
        this.tempM = d.getMonth();
        this.events.subscribe('myEvent',(object) => {      
            console.log('goi dc roi');
            console.log(object[0]);
            this.devList=object[0];
        });
        
    }

}