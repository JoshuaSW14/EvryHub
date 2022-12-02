import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { WebsocketService } from './services/websocket.service';
import { CognitoService } from './services/cognito.service';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChartModule } from 'primeng/chart';
import { KnobModule } from 'primeng/knob';
import { CalendarModule } from 'primeng/calendar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/hub/dashboard/dashboard.component';
import { DevicesComponent } from './pages/hub/devices/devices.component';
import { MetricsComponent } from './pages/hub/metrics/metrics.component';
import { BlindsComponent } from './components/devices/blinds/blinds.component';
import { VentComponent } from './components/devices/vent/vent.component';
import { GardenComponent } from './components/devices/garden/garden.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HubComponent } from './pages/hub/hub/hub.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    DevicesComponent,
    MetricsComponent,
    BlindsComponent,
    VentComponent,
    GardenComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    HubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    MenubarModule,
    CardModule,
    RadioButtonModule,
    SelectButtonModule,
    InputNumberModule,
    ChartModule,
    KnobModule,
    CalendarModule,
    PanelMenuModule,
    StyleClassModule,
    TableModule,
    SliderModule
  ],
  providers: [ CognitoService, WebsocketService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
