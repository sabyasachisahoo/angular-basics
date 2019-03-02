import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  public message = 'Message from parent component by property[] binding';
  public childMessage = '';
  public exitInterval;

  /** here we are getting the reference directly from the html of own component using viewChild */
  @ViewChild('templeteRefViewChild') inputValue: ElementRef;

  constructor() {
    /**here the inputValue for ViewChild willbe undifined,as the child is not render yet */
    console.log(this.inputValue);

    /** We can handle this undefined value, by using fat arrow function */
    this.exitInterval = setInterval( () => {
      this.postData();
    }, 3000);
  }

  postData() {
    const inputFromView = this.inputValue.nativeElement;
    console.log(inputFromView.value);

    if (inputFromView.value === 'close') {
      clearInterval(this.exitInterval);
    }
  }

/** We need to use AfterViewInit life cycle hook, as angular component follows a life cycle hooks */
  ngAfterViewInit() {
    this.inputValue.nativeElement.value = 'value is set using @ViewChild';
  }
}
