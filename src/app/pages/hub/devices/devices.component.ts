import { Component, OnInit } from '@angular/core';
import { Message, WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  ventTemperature: any[] = [];
  ventHumidity: any[] = [];
  currentVentTemperature: number = 20; //20 Degrees Celsius
  currentVentHumidity: number | any;
  ventMQ: any[] = [];
  ventState: any[] | any;
  ventValue: string | any;
  radioVent: String | any;
  ventData: any;
  ventOptions: any;
  ventTime: any[] = [];

  currentBlindsSunlight: number = 5; //Scale 0-10
  blindsState: any[] | any;
  blindsValue: string | any;
  radioBlinds: String | any;
  blindsData: any;
  blindsOptions: any;
  blindsTime: any[] = [];
  blindsSunlight: any[] = [];

  currentGardenMoisture: number = 0; //Scale 0-10
  gardenValue: string | any;
  radioGarden: String | any;
  gardenData: any;
  gardenOptions: any;
  gardenMoisture: any[] = [];
  gardenTime: any[] = [];

  content = 'on';
  received = [];
  sent: Message[] = [];

  constructor(private wsService: WebsocketService) {
    wsService.messages.subscribe((msg) => {
      console.log(msg.device);
      if (msg.device == 'vent') {
        if (msg.action.includes('temperature')) {
          this.currentVentTemperature = Number(msg.value)
          var date = new Date(msg.timestamps).toLocaleTimeString('en-CA');
          this.ventTime.push(date);
          this.ventTemperature.push(msg.value);
        } else if (msg.action.includes('humidity')) {
          var date = new Date(msg.timestamps).toLocaleTimeString('en-CA');
          this.ventTime.push(date);
          this.ventHumidity.push(msg.value);
        } else if (msg.action.includes('mq')) {
          var date = new Date(msg.timestamps).toLocaleTimeString('en-CA');
          this.ventTime.push(date);
          this.ventMQ.push(msg.value);
        }
      } else if (msg.device == 'blinds') {
        if (msg.action.includes('light')) {
          this.currentBlindsSunlight = Number(msg.value);
          var date = new Date(msg.timestamps).toLocaleTimeString('en-CA');
          this.blindsTime.push(date);
          this.blindsSunlight.push(msg.value);
        }
      } else if (msg.device == 'garden') {
        if (msg.action.includes('moisture')) {
          this.currentGardenMoisture = Number(msg.value);
          var date = new Date(msg.timestamps).toLocaleTimeString('en-CA');
          this.gardenTime.push(date);
          this.gardenMoisture.push(msg.value);
        }
      }
      this.ventData = {
        labels: this.ventTime,
        datasets: [
          {
            label: 'Temperature',
            data: this.ventTemperature,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4,
          },
          {
            label: 'Humidity',
            data: this.ventHumidity,
            fill: false,
            borderColor: '#FFA726',
            tension: 0.4,
          },
          {
            label: 'Air Quality',
            data: this.ventMQ,
            fill: false,
            borderColor: '#FF4D27',
            tension: 0.4,
          },
        ],
      };

      this.blindsData = {
        labels: this.blindsTime,
        datasets: [
          {
            label: 'Sunlight',
            data: this.blindsSunlight,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4,
          }
        ],
      };

      this.gardenData = {
        labels: this.gardenTime,
        datasets: [
          {
            label: 'Moisture',
            data: this.gardenMoisture,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4,
          }
        ],
      };
    });
  }

  ngOnInit(): void {
    this.blindsState = [
      { label: 'Raise', value: 'raise' },
      { label: 'Lower', value: 'lower' },
    ];

    this.ventState = [
      { label: 'Open', value: 'open' },
      { label: 'Close', value: 'close' },
    ];

    this.ventData = {
      labels: this.ventTime,
      datasets: [
        {
          label: 'Temperature',
          data: this.ventTemperature,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
        {
          label: 'Humidity',
          data: this.ventHumidity,
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
        {
          label: 'Air Quality',
          data: this.ventMQ,
          fill: false,
          borderColor: '#FF4D27',
          tension: 0.4,
        },
      ],
    };

    this.blindsData = {
      labels: this.blindsTime,
      datasets: [
        {
          label: 'Sunlight',
          data: this.blindsSunlight,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        }
      ],
    };

    this.gardenData = {
      labels: this.gardenTime,
      datasets: [
        {
          label: 'Moisture',
          data: this.gardenMoisture,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        }
      ],
    };
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
    var action;
    if (this.radioBlinds == 'sunlight') {
      value = this.blindsValue;
      action = 'sunlight'
    } else {
      value = this.radioBlinds;
      action = 'config'
    }
    let message = {
      device: 'blinds',
      action: action,
      value: value
    };

    this.sent.push(message);
    this.wsService.messages.next(message);
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
