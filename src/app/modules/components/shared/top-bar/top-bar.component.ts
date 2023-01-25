import { Component, Host, OnInit } from '@angular/core';
import { MainComponent } from '../../main/main.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  isOpenMenu: boolean = true;

  constructor(
    @Host() private _appMain: MainComponent
  ) { }

  ngOnInit(): void {
  }

  indexScrollTo(classHtml: string): void {
    this._appMain.indexScrollTo(classHtml);
  }

  openIndexMenu(open: boolean): void {
    const menu: Element = document.querySelector('.indexLinks_wrapper')!;
    if (open === true) {
      menu.classList.remove('index_animation-close');
      menu.classList.add('index_animation-open');
      this.isOpenMenu = !this.isOpenMenu; 
    } else if (open === false) {
      menu.classList.remove('index_animation-open');
      menu.classList.add('index_animation-close');
      this.isOpenMenu = !this.isOpenMenu; 
    }
  }

}
