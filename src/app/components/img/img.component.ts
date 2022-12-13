import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  img = 'hello';

  @Input('img')
  set changeImg(newImg: string) {
    //this is only to listen changes in one specific input
    //because ngOnChanges you listen all the inputs
    this.img = newImg;
    //console.log('change just one input img', this.img);
    //code
  }
  @Input() alt = '';
  @Output() loaded = new EventEmitter<string>();
  imgEmpy = 'assets/images/empty.jpeg';
  // counter: number = 0;
  // counterInterval: number | undefined;

  constructor() {
    //before render
    //NO ASYNC ACTIONS
    //RUNS once
    //console.log('hello constructor->', this.img);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   //before render
  //   //changes inputs
  //   //RUNS the times inputs change
  //   // console.log('hello ngOnChanges->', this.img);
  //   // console.log('simplechange ->', changes);
  // }

  // ngOnInit(): void {
  //   //before render
  //   // FETCH -- API CALLS
  //   // runs once time
  //   //console.log('hello ngOnInit');
  //   // this.counterInterval = window.setInterval(() => {
  //   //   this.counter += 1;
  //   //   console.log('counter oninit--->', this.counter);
  //   // }, 1000);
  // }

  // ngAfterViewInit(): void {
  //   //after render
  //   //handler children
  //   //console.log('hello ngAfterViewInit');
  // }

  // ngOnDestroy(): void {
  //   //delete render
  //   //console.log('hello ngOnDestroy');
  //   //window.clearInterval(this.counterInterval);
  // }

  errorImg() {
    this.img = this.imgEmpy;
  }

  loadedImg() {
    //console.log('loaded child');
    this.loaded.emit(this.imgEmpy);
  }
}
