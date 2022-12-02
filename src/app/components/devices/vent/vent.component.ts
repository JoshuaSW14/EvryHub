import { Component, Input, OnInit } from '@angular/core';
import { Message, WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-vent',
  templateUrl: './vent.component.html',
  styleUrls: ['./vent.component.scss']
})
export class VentComponent implements OnInit {

  ventState: any[] | any;
  ventValue: string | any;
  @Input() ventTemperature: number = 20; //20 Degrees Celsius
  @Input() ventHumidity: number | any;
  @Input() ventMQ: number | any;
  radioVent: String | any;

  content = 'on';
  received = [];
  sent: Message[] = [];

  constructor(private wsService: WebsocketService) {
    this.ventState = [
      { label: 'Open', value: 'open' },
      { label: 'Close', value: 'close' },
    ];

    // wsService.messages.subscribe((msg) => {
    //   console.log(msg.device);
    //   if (msg.device == 'vent') {
    //     if(msg.action.includes('temperature')){
    //       this.ventTemperature = Number(msg.value);
    //     }else if(msg.action.includes('humidity')){
    //       this.ventHumidity = Number(msg.value);
    //     }else if(msg.action.includes('mq')){
    //       this.ventMQ = Number(msg.value);
    //     }
    //   }
    // });
  }

  ngOnInit(): void {
  }

  //--- Smart Vent ---
  vent() {
    let message = {
      device: 'vent',
      action: this.ventValue,
    };

    this.sent.push(message);
    this.wsService.messages.next(message);
  }

  configVent() {
    let message = {
      device: 'vent',
      action: 'config',
      value: this.ventValue
    };

    this.sent.push(message);
    this.wsService.messages.next(message);
  }

}
