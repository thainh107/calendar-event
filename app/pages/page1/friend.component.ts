import { Component } from '@angular/core';
import {Events} from 'ionic-angular';
import {MyData} from '../../providers/my-data/my-data';


@Component({
    selector: 'myfriends',
    template: `
        <ion-row *ngFor="let dev of devList;let i = index" style="width:980px"  class="rowChild">
                <div style="width:16.67%; margin-left:0%" class="textInfo item-info" >
                    {{dev.name}} - {{dev.phoneno}}
                </div>                
                <div id="r_{{i}}" class=" item-leave {{dev.kind}}" [ngStyle]="{width:dev.days/42*100+'%','margin-left':(dev.start - 1) / 42 * 100+'%'}">
                    {{dev.start}} - {{dev.end}} {{shortMonth}} ({{dev.location}})
                    </div>

            </ion-row>
    `,
    providers: [MyData]
})
export class FriendComponent {
    //plan 2 :<div [ngStyle]="{width:(dev.start-1)/42*100+'%'}"></div><div class="item-leave {{dev.kind}}" [ngStyle]="{width:dev.days/42*100+'%'}">
    devList: any;
    componentName: any;
    tempM: any;
    constructor(public events: Events, myData: MyData) {
        var d = new Date();
        this.tempM = d.getMonth();
        this.events.subscribe('myEvent', (object) => {
            this.devList = object[0];
        });

    }

}