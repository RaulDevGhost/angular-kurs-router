import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  showImg = true;

  onLoaded(img: string) {
    console.log('loaded parent', img);
  }

  tootgleImg() {
    this.showImg = !this.showImg;
  }
}
