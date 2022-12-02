import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from './services/cognito.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthenticated: boolean;
  navItems: MenuItem[] | any;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.isAuthenticated = false;
  }

  public ngOnInit(): void {
    this.cognitoService.isAuthenticated().then((success: boolean) => {
      console.log(success);
      this.isAuthenticated = success;
      if(this.isAuthenticated){
        this.navItems = [
          // {
          //   label: 'Planner',
          //   routerLink: 'planner'
          // },
          // {
          //   label: 'Consulting',
          //   routerLink: 'consulting'
          // },
          {
            label: 'Hub',
            routerLink: 'hub',
          },
        ];
      }
    });
  }

  public signOut(): void {
    this.cognitoService.signOut().then(() => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
  }
}
