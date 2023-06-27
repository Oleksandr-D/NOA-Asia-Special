import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


  toTop():void{
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

}
