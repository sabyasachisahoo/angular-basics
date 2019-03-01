import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.css']
})
export class GreetComponent implements OnInit {
  @Input('parentToChild') public parentToChild;
  @Output() public childToParentEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getTime() {
    const date = new Date();
    const time = date.getTime();
    return time;
  }

  public greetParent() {
    return 'Hello from Child, Amigos ' + 'Current time is ' + this.getTime();
  }

  public childToParent() {
    this.childToParentEvent.emit(this.greetParent());
  }
}
