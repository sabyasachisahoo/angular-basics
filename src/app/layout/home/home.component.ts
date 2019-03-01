import { Component, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { GreetComponent } from './child/greet/greet.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  public message = 'Message from parent component by property[] binding';
  public childMessage = '';
  @ViewChild(GreetComponent) greetFromChild: GreetComponent;
  constructor() { }

  ngAfterViewInit() {
    console.log(this.greetFromChild.greetParent());
  }
}
