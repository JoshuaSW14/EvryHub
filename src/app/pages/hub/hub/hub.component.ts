import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit{

  items: MenuItem[] | any;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        routerLink: 'dashboard'
      },
      {
        label: 'Devices',
        routerLink: 'devices'
      },
      {
        label: 'Metrics',
        routerLink: 'metrics'
      }
    ];
  }
}
