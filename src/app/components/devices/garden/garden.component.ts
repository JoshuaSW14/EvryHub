import { Component, Input, OnInit } from '@angular/core';
import { Message, WebsocketService } from 'src/app/services/websocket.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {
  gardenValue: string | any;
  @Input() gardenMoisture: number = 0; //Scale 0-10
  radioGarden: String | any;

  content = 'on';
  received = [];
  sent: Message[] = [];

  constructor(private wsService: WebsocketService) {
  }

  ngOnInit(): void {
  }

  //--- Smart Garden ---
  garden() {
    let message = {
      device: 'garden',
      action: 'water',
    };

    this.sent.push(message);
    this.wsService.messages.next(message);
  }

  configGarden() {
    var value;
    if (this.radioGarden == 'moisture') {
      value = this.gardenValue;
    } else {
      value = this.radioGarden;
    }
    let message = {
      device: 'garden',
      action: 'config',
      value: value,
    };

    this.sent.push(message);
    this.wsService.messages.next(message);
  }

}
