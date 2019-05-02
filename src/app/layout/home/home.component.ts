import { Component, ViewChild, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import * as html2canvas from 'html2canvas';
declare var Chance: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // the fade-out animation.
    trigger('fadeOutAnimation', [
       state('shown', style({opacity: 1  })),
       state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('3500ms' , keyframes([
          style({filter: 'blur(2px)', transform: 'translateX(0)'}),
          style({filter: 'blur(4px)', transform: 'translateX(50%)'}),
          style({filter: 'blur(5px)', transform: 'translateX(70%)'})
        ])))
    ])
  ]
})
export class HomeComponent implements OnInit {
  
  @ViewChild('box') box : ElementRef;
  @ViewChild('content') content: ElementRef;
  // private context: CanvasRenderingContext2D;
  canvasCount = 35;
  imageDataArray = [];
  chance: any;
  visiblityState = 'shown';
  setDust: boolean = false;
  constructor(public renderer : Renderer2, private el:ElementRef) {
    this.chance = new Chance();
  }

  ngOnInit() {
  }

  snapIt() {
    html2canvas(this.box.nativeElement).then( canvas => {
     let context = canvas.getContext('2d');
     let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
     
     let pixelsArray = imageData.data;
     this.blankImageData(imageData);
     
     // assign pixels Array data to imageDataArray 
     // based on weightedRandom Generated Value
     for(let i=0;i<pixelsArray.length;i+=4){

       // get the highest probable canvas for the pixel
        let topProbValue = Math.floor((i/pixelsArray.length)*this.canvasCount);
        let imageArray = this.imageDataArray[this.WeightedRandomGenerator(topProbValue)];
        imageArray[i] = pixelsArray[i];
        imageArray[i+1] = pixelsArray[i+1];
        imageArray[i+2] = pixelsArray[i+2];
        imageArray[i+3] = pixelsArray[i+3];
     }

     // create canvas for each element
     for(let i=0;i<this.canvasCount;i++){
       let forEachImageCanvas = this.newCanvas(this.imageDataArray[i], canvas.width, canvas.height);
       forEachImageCanvas.classList.add('dust');
       this.renderer.appendChild(this.content.nativeElement, forEachImageCanvas);
       // this.content.nativeElement.append(forEachImageCanvas);
     }

     //clear all children except the canvas
      if(this.visiblityState === 'shown'){
        this.setDust = true;
        // this.renderer.removeChild(this.el.nativeElement, 'box');
      }

      Array.from(document.getElementsByClassName('dust')).forEach(index => {
        if(index) {
          this.visiblityState = 'hidden';
        }
      })
    });
  }

  WeightedRandomGenerator(topValue) {
    let pixelsWeightProbability = [];
    let pixelsSequence = [];

    for(let i=0;i<this.canvasCount;i++) {
      pixelsWeightProbability.push(Math.pow(this.canvasCount - Math.abs(topValue-i),3));
      pixelsSequence.push(i);
    }
    return this.chance.weighted(pixelsSequence,pixelsWeightProbability);
  }

  blankImageData(imageData) {
     for(let i=0;i< this.canvasCount;i++)
      {
        let currentImmageArray = new Uint8ClampedArray(imageData.data);
        for (let j=0;j< currentImmageArray.length;j++) {
            currentImmageArray[j] = 0;
        }
        this.imageDataArray.push(currentImmageArray);
      }
  }

  newCanvas(imageDataArray, width, height) {
    let newCanvas = this.renderer.createElement('canvas');
      newCanvas.height = height;
      newCanvas.width = width;

    let tempContext = newCanvas.getContext('2d');
    tempContext.putImageData(new ImageData(imageDataArray, width, height),0,0);

    return newCanvas;
  }



}
