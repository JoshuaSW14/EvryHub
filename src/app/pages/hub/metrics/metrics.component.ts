import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  ventData: any;
  ventOptions: any;
  ventTime: any[] = [];
  ventTemperature: any[] = [];
  ventHumidity: any[] = [];
  ventMQ: any[] = [];

  gardenData: any;
  gardenOptions: any;
  gardenTime: any[] = [];
  gardenMoisture: any[] = [];

  blindsData: any;
  blindsOptions: any;
  blindsTime: any[] = [];
  blindsSunlight: any[] = [];

  constructor(private wsService: WebsocketService) {
    wsService.messages.subscribe((msg) => {
      console.log(msg.device);
      if (msg.device == 'vent') {
        if (msg.action.includes('temperature')) {
          var date = new Date(msg.timestamps).toLocaleTimeString('en-CA');
          this.ventTime.push(date);
          this.ventTemperature.push(msg.value);

        }else if(msg.action.includes('humidity')){
          var date = new Date(msg.timestamps).toLocaleTimeString('en-CA');
          this.ventTime.push(date);
          this.ventHumidity.push(msg.value);
        }else if(msg.action.includes('mq')){
          var date = new Date(msg.timestamps).toLocaleTimeString('en-CA');
          this.ventTime.push(date);
          this.ventMQ.push(msg.value);
        }
      }else if(msg.device == 'blinds'){
        if (msg.action.includes('light')) {
          var date = new Date(msg.timestamps).toLocaleTimeString('en-CA');
          console.log(msg.value);
          this.blindsTime.push(date);
          this.blindsSunlight.push(msg.value);
        }
      }else if(msg.device == 'garden'){
        if (msg.action.includes('moisture')) {
          var date = new Date(msg.timestamps).toLocaleTimeString('en-CA');
          console.log(date);
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
}
