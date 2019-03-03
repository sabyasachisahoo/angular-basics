import { GreetComponent } from './child/greet/greet.component';
import { Component, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { MusicGenreComponent } from './child/music-genre/music-genre.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  public message = 'Message from parent component by property[] binding';
  public childMessage = '';
  public myGenre = '';
  public exitInterval;

  @ViewChild(GreetComponent) greetFromChild: GreetComponent;

  @ViewChildren(MusicGenreComponent) genreType: QueryList<MusicGenreComponent>;

  constructor() {
  }

/** We need to use AfterViewInit life cycle hook, as angular component follows a life cycle hooks */
  ngAfterViewInit() {
    // this.inputValue.nativeElement.value = 'value is set using @ViewChild';
    console.log(this.greetFromChild.greetParent());
    this.genreType.forEach(element => {
      console.log(element);
    });
  }
}
