import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { SideBarToggleComponent } from './layout/side-bar-toggle/side-bar-toggle.component';
import { HomeComponent } from './layout/home/home.component';
import { GreetComponent } from './layout/home/child/greet/greet.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavBarComponent,
    SideBarToggleComponent,
    HomeComponent,
    GreetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
