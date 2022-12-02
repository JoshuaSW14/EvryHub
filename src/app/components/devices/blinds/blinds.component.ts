import { Component, Input, OnInit } from '@angular/core';
import { Message, WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-blinds',
  templateUrl: './blinds.component.html',
  styleUrls: ['./blinds.component.scss']
})
export class BlindsComponent implements OnInit {
  blindsState: any[] | any;
  blindsValue: string | any;
  @Input() blindsSunlight: number = 5; //Scale 0-10
  radioBlinds: String | any;

  content = 'on';
  received = [];
  sent: Message[] = [];

  constructor(private wsService: WebsocketService) {
    this.blindsState = [
      { label: 'Raise', value: 'raise' },
      { label: 'Lower', value: 'lower' },
    ];

    // wsService.messages.subscribe((msg) => {
    //   console.log(msg.device);
    //   if (msg.device == 'blinds') {
    //     if(msg.action.includes('light')){
    //       this.blindsSunlight = Number(msg.value);
    //     }
    //   }
    // });
  }

  ngOnInit(): void {
  }

  //--- Smart Blinds ---
  blinds() {
    let message = {
      device: 'blinds',
      action: this.blindsValue,
    };

    this.sent.push(message);
    this.wsService.messages.next(message);
  }

  configBlinds() {
    var value;
    if (this.radioBlinds == 'sunlight') {
      value = this.blindsSunlight;
    } else {
      value = this.radioBlinds;
    }
    let message = {
      device: 'blinds',
      action: 'config',
      value: value
    };

    this.sent.push(message);
    this.wsService.messages.next(message);
  }

}
