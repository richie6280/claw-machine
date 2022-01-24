import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOninit() { }

  constructor() { }

  count: any;
  x: number = 0;
  y: number = 0
  win: boolean = false;

  startEventLeft(e: any): void {
    if(this.x < 0) return;
    const claw = document.querySelector('.crane-arm-claw') as HTMLElement;
    this.count = setInterval(() => {
      this.x--;
      claw.style.transform = `translateX(${this.x}px)`;
      if (this.x < 0) {
        clearInterval(this.count);
      };
    }, 3);
  }

  startEventRight(e: any): void {
    const machine = document.querySelector('.craneGame') as HTMLElement;
    const claw = document.querySelector('.crane-arm-claw') as HTMLElement;
    if(this.x > machine.offsetWidth - 53) return;
    this.count = setInterval(() => {
      this.x++;
      claw.style.transform = `translateX(${this.x}px)`;
      if (this.x > (machine.offsetWidth - 53)) {
        clearInterval(this.count);
      };
    }, 3);
  }

  stopEvent(e: any): void {
    if (this.count) {
      clearInterval(this.count);
    }
  }

  grab() {
    const machine = document.querySelector('.craneGame') as HTMLElement;
    const claw = document.querySelector('.crane-arm-claw') as HTMLElement;
    this.count = setInterval(() => {
      this.y++;
      claw.style.transform = `translate3d(${this.x}px,${this.y}px, 0)`;

      if (this.y > (machine.offsetHeight - 52)) {
        clearInterval(this.count);
        this.getPrize();
        this.count = setInterval(() => {
          this.y--;
          claw.style.transform = `translate3d(${this.x}px,${this.y}px, 0)`;

          if (this.y < 0) {
            clearInterval(this.count);
            if (!this.win) { this.dropPrize() } //未中獎掉禮物
            this.count = setInterval(() => {
              this.x--;
              claw.style.transform = `translate3d(${this.x}px,${this.y}px, 0)`;
              
              if (this.x < 0) {
                clearInterval(this.count);
                if (this.win) { this.dropPrize() }  //中獎掉禮物
              };

            });

          };

        });
      };
    }, 3);
  }

  getPrize() {
    const claw = document.querySelector('.crane-arm-claw') as HTMLElement;
    let prize = document.createElement("div");
    prize.setAttribute('class', 'prize');
    claw.appendChild(prize);
    prize.style.width = '25px';
    prize.style.height = '25px';
    prize.style.background = 'red';
  }

  dropPrize() {
    const machine = document.querySelector('.craneGame') as HTMLElement;
    const prize = document.querySelector('.prize') as HTMLElement;

    let prizeX = this.x;
    let prizeY = this.y;
    this.count = setInterval(() => {
      if (!this.win) { //未中獎
        prizeY++;
        prize.style.transform = `translate3d(${prizeX-this.x}px,${prizeY}px, 0)`;
      } else {  //中獎
        this.y++;
        prize.style.transform = `translate3d(${this.x}px,${this.y}px, 0)`;
      }

      let disappear = machine.offsetHeight - 25;
      if (this.y > disappear || prizeY > disappear) {
        prize.style.display = 'none';
      }
    }, 3);
  }


}
