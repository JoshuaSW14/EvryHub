import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  ventTemperature: number = 20; //20 Degrees Celsius
  ventHumidity: number | any;
  ventMQ: number | any;

  blindsSunlight: number = 5; //Scale 0-10

  gardenMoisture: number = 0; //Scale 0-10

  constructor(private wsService: WebsocketService) {
    wsService.messages.subscribe((msg) => {
      console.log(msg.device);
      if (msg.device == 'vent') {
        if (msg.action.includes('temperature')) {
          this.ventTemperature = Number(msg.value);
        }else if(msg.action.includes('humidity')){
          this.ventHumidity = Number(msg.value);
        }else if(msg.action.includes('mq')){
          this.ventMQ = Number(msg.value);
        }
      }else if(msg.device == 'blinds'){
        if (msg.action.includes('light')) {
          this.blindsSunlight = Number(msg.value);
        }
      }else if(msg.device == 'garden'){
        if (msg.action.includes('moisture')) {
          this.gardenMoisture = Number(msg.value);
        }
      }
    });
  }

  ngOnInit(): void {
  }
}
