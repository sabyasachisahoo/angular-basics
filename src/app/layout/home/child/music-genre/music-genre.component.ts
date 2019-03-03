import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-music-genre',
  templateUrl: './music-genre.component.html',
  styleUrls: ['./music-genre.component.css']
})
export class MusicGenreComponent implements OnInit {

  @Output() setGenreFromChild = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  setGenre(genreType: string) {
    this.setGenreFromChild.emit(genreType);
  }
}
