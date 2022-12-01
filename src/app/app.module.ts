import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
