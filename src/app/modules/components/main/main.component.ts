import { Component, AfterViewInit, Host, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPrototypePageComponent } from '../shared/dialog-prototype-page/dialog-prototype-page.component';
import { DialogVideoComponent } from '../shared/dialog-video/dialog-video.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {
  personalProjectAutoScroll = true;
  ItemsContainerWidth: string | undefined;
  ItemsContainerWidthCenter: string | undefined;
  scrollWidth = 0;
  lastItemScroll = 0;
  lastDirection: number = 1;
  scrollPixeles: string | undefined;
  runAutoScroll: Boolean = true;
  secondsToAutoScroll: number = 0;
  projectSegmentTitle: string | undefined;
  stroke_dasharray: string | undefined;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngAfterViewInit(): void {
    this.personalProjectScrollingButtons();
    this.getPersonalProject_itemsWidth();
    this.autoScroll();
    this.mainProgressScroll();
    this.scrollToTop();
    this.openingAnimation();
    this.openProjectDialog();
  }

  openProjectDialog(): void {
    // ------------ personal project ------------
    const ItemsElement = document.querySelectorAll('.ppjct_prototype');
    ItemsElement.forEach((item: Element) => {
      item.addEventListener('click', () => {
        const dataLink = item.getAttribute('data-ppjct_link')!;
        this.dialog.open(DialogPrototypePageComponent, {data: {dataLink: `${dataLink}`}});
      });
    });

    // ------------ portafolio Y cv ------------
    let urlCV: string;
    const videoTags = document.querySelectorAll('.dialog_portfolio-CV>.cv_images');
    videoTags.forEach((videoTag: Element) => {
      videoTag.addEventListener('click', (e) => {
        const clickElement = e.target;
        //@ts-ignore
        const clickElementClass = clickElement?.classList;

        if(clickElementClass.contains('cv_page1')||clickElementClass.contains('cv_page2')) {
          const imgSrc = videoTag.querySelector(`.${clickElementClass}`)?.getAttribute('src')!;
          urlCV = imgSrc;
        }

        if(clickElementClass.contains('cv_images')) {
          const videoSrc: string = videoTag.nextElementSibling?.children[0].getAttribute('src')!;
          urlCV = videoSrc;
        }

        this.dialog.open(DialogVideoComponent, {
          data: {url: urlCV, idDialog: `${clickElementClass}`},
          width: 'max-content',
          maxWidth: '90vw',
          height: 'max-content',
          maxHeight: '100vh'
        });
      });
    });
  }

  openingAnimation(): void {
    const openingElements = document.querySelectorAll('.opening_animation');

    const callback = (entries: any) => {
      entries.forEach((entry: any) => {
        if(entry.isIntersecting) {
          if(!entry.target.classList.contains('runOpAnimation')){
            entry.target.classList.add('runOpAnimation');
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback,{threshold: 0.2});

    openingElements.forEach(element => observer.observe(element));
  }

  scrollToTop(): void {
    const scrollProgressButton = document.querySelector('.progress_circle_wrp2');
    scrollProgressButton?.addEventListener('click', () => {
      window.scrollTo({top: 0, behavior: 'smooth'})
    });
  }

  indexScrollTo(classHtml: string): void {
    const element: Element = document.querySelector(classHtml)!;
    element.scrollIntoView({block: 'start', behavior: 'smooth'});
  }

  floatingTopBar(floating: boolean): void {
    const appTopBar: Element = document.querySelector('.app-topBar')!;
    if (floating) {
      if(!appTopBar.classList.contains('floating_app-topBar')) {
        appTopBar.classList.add('floating_app-topBar');
      }
    } else {
      appTopBar.classList.remove('floating_app-topBar');
    }
  }

  mainProgressScroll(): void {
    const progress_circle_wrapper: Element = document.querySelector('.progress_circle_wrapper')!;
    const circle: Element = document.querySelector('.progress-circle_bar')!;
    // @ts-ignore
    const circunference = 2 * Math.PI * circle?.r.baseVal.value;
    let progress = 0;
    this.stroke_dasharray = `${progress} ${circunference}`;

    window.onscroll = () => {
      progress = (((window.scrollY + window.innerHeight) / document.body.clientHeight)*circunference);

      if (window.scrollY === 0) {
        progress = 0;
      }

      if (progress < 20) {
        progress_circle_wrapper.classList.add('hide_progress_circle')
      } else {
        progress_circle_wrapper.classList.remove('hide_progress_circle')
      }

      if (progress > 60) {
        this.floatingTopBar(true);
      } else {
        this.floatingTopBar(false);
      }
      this.stroke_dasharray = `${progress} ${circunference}`;
    }
  }

  runScroll(direction: number): void {
    const itemsContainer: Element | null = document.querySelector('.PersonalProject_items_wrp')!;
    const itemsImg = document.querySelectorAll('.PersonalProject_img')!;
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
    this.lastDirection = direction;

    const ImgElement: Element = itemsImg[this.lastItemScroll];
    itemsImg.forEach((element) => {
      if (element === ImgElement && !ImgElement.classList.contains('PPjct_img_scale')) {
        element.classList.add('PPjct_img_scale');
      } else if (element !== ImgElement && element.classList.contains('PPjct_img_scale')) {
        element.classList.remove('PPjct_img_scale');
      }
    });

    this.projectSegmentTitle = ImgElement.getAttribute('alt')!;
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
        this.runAutoScroll = false;
        const element = e.target;
        //@ts-ignore
        if(element.classList.contains('PP_bscroll-1')) {
          this.runScroll(0);
          //@ts-ignore
        }else if(element.classList.contains('PP_bscroll-2')){
          this.runScroll(1);
        }
        this.secondsToAutoScroll = 5;
      });
    });
  }

  autoScroll(): void {
    this.runScroll(this.lastDirection);
    setInterval(() => {
      const itemsImg = document.querySelectorAll('.PersonalProject_img')!;
      const lastImgElement: Element = itemsImg[itemsImg.length-1];
      const firstImgElement: Element = itemsImg[0];
      const currentImgElement: Element = itemsImg[this.lastItemScroll];
      if (this.runAutoScroll) {
        if (
          currentImgElement !== firstImgElement &&
          currentImgElement !== lastImgElement
          ) {
          this.runScroll(this.lastDirection);
        } else {
          if (this.lastDirection === 0) {
            this.lastDirection = 1;
          } else { this.lastDirection = 0; }
          this.runScroll(this.lastDirection);
        }
      }
    }, 2000);

    // stop auto scroll
    setInterval(() => {
      if (this.secondsToAutoScroll === 0) {
        this.runAutoScroll = true;
      } else {
        this.secondsToAutoScroll--
      }
    }, 1000);
  }

}
