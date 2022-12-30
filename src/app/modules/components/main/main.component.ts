import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  personalProjectAutoScroll = true;
  ItemsContainerWidth: string | undefined;
  ItemsContainerWidthCenter: string | undefined;
  scrollWidth = 0;
  lastItemScroll = 0;
  scrollPixeles: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.personalProjectScrollingButtons();
    this.getPersonalProject_itemsWidth();
  }

  runScroll(direction: number): void {
    const itemsContainer: Element | null = document.querySelector('.PersonalProject_items_wrp')!;
    const NumberOfItems = itemsContainer.children.length;
    if (direction === 1 && this.lastItemScroll < (NumberOfItems-1)) {
      this.lastItemScroll = this.lastItemScroll+1;
      let nextItemPixels = this.scrollWidth*this.lastItemScroll;
      this.scrollPixeles = `-${nextItemPixels}px`;
    } else if (direction === 0 && this.lastItemScroll >= 1) {
      this.lastItemScroll = this.lastItemScroll-1;
      let previousItemPixels = this.scrollWidth*this.lastItemScroll;
      this.scrollPixeles = `-${previousItemPixels}px`;
    }
  }

  getPersonalProject_itemsWidth(): void {
    setInterval(() => {
      const ItemsContainerWidth = document.querySelector('.PersonalProject_items')?.clientWidth;
      this.ItemsContainerWidth = `${ItemsContainerWidth}px`;
      if (ItemsContainerWidth !== undefined) {
        let widthCenter = (ItemsContainerWidth - 600)/2;
        if (widthCenter >= 0) {
          this.ItemsContainerWidthCenter = `${widthCenter}px`;
        } else {this.ItemsContainerWidthCenter = '0px';}

        if (ItemsContainerWidth > 600) {
          this.scrollWidth = 600;
        }else if (ItemsContainerWidth <= 600) {
          this.scrollWidth = ItemsContainerWidth;
        }
      }
    }, 100);
  }

  personalProjectScrollingButtons(): void {
    const buttons = document.querySelectorAll('.PersonalProject_buttonscroll');

    buttons.forEach(button => {
      button.addEventListener( 'click', (e) => {
        const element = e.target;
        //@ts-ignore
        if(element.classList.contains('PP_bscroll-1')) {
          this.runScroll(0);
          //@ts-ignore
        }else if(element.classList.contains('PP_bscroll-2')){
          this.runScroll(1);
        }
      });
    });
  }

}
