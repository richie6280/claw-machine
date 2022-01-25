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
  win: boolean = true;

  startEventLeft(e: any): void {
    if (this.x < 0) return;
    const claw = document.querySelector('.claw') as HTMLElement;
    // const armClaw = document.querySelector('.crane-arm-claw') as HTMLElement;
    this.count = setInterval(() => {
      this.x -= 0.5;
      claw.style.transform = `translateX(${this.x}px)`;
      // armClaw.style.animation = 'swingLeft .5s linear infinite alternate';
      if (this.x < 0) {
        clearInterval(this.count);
      };
    }, 3);
  }

  startEventRight(e: any): void {
    const machine = document.querySelector('.container') as HTMLElement;
    const claw = document.querySelector('.claw') as HTMLElement;
    // const armClaw = document.querySelector('.body-claw') as HTMLElement;

    if (this.x > machine.offsetWidth - this.x) return;

    this.count = setInterval(() => {
      this.x += 0.5;
      claw.style.transform = `translateX(${this.x}px)`;
      // armClaw.style.animation = 'swingRight .5s linear infinite alternate';
      if (this.x > (machine.offsetWidth - this.x)) {
        clearInterval(this.count);
      };
    }, 3);
  }

  stopEvent(e: any): void {
    // const armClaw = document.querySelector('.crane-arm-claw') as HTMLElement;
    if (this.count) {
      clearInterval(this.count);
      // armClaw.style.animation = '';
    }
  }

  grab(): void {
    const machine = document.querySelector('.container') as HTMLElement;
    const claw = document.querySelector('.claw') as HTMLElement;
    const clawBar = document.querySelector('.bar-claw') as HTMLElement;
    const armClaw = document.querySelector('.body-claw') as HTMLElement;
    const leftClaw = document.querySelector('.left-claw') as HTMLElement;
    const rightClaw = document.querySelector('.right-claw') as HTMLElement;

    this.count = setInterval(() => {
      leftClaw.classList.add('clawGrab');
      rightClaw.classList.add('clawGrab');
      this.y += 0.75;
      armClaw.style.transform = `translate3d(${0}px,${this.y}px, 0)`;
      clawBar.style.height = `${this.y + 30}px`;

      if (this.y > 120) { //暫時
        clearInterval(this.count);
        this.getPrize();
        this.count = setInterval(() => {
          leftClaw.classList.remove('clawGrab');
          rightClaw.classList.remove('clawGrab');
          this.y -= 0.75;
          armClaw.style.transform = `translate3d(${0}px,${this.y}px, 0)`;
          clawBar.style.height = `${this.y + 30}px`;

          if (this.y < 0) {
            clearInterval(this.count);
            if (!this.win) this.dropPrize() //未中獎掉禮物
            this.count = setInterval(() => {
              this.x -= 0.5;
              claw.style.transform = `translate3d(${this.x}px,${this.y}px, 0)`;

              if (this.x < 0) {
                leftClaw.classList.add('clawGrab');
                rightClaw.classList.add('clawGrab');
                setTimeout(() => {
                  leftClaw.classList.remove('clawGrab');
                  rightClaw.classList.remove('clawGrab');
                }, 250)

                clearInterval(this.count);
                if (this.win) this.dropPrize();  //中獎掉禮物
              };

            });

          };

        });
      };
    }, 3);
  }

  getPrize(): void {
    const claw = document.querySelector('.body-claw') as HTMLElement;
    let prize = document.createElement("div");
    prize.setAttribute('class', 'prize');
    claw.appendChild(prize);
    prize.style.width = '25px';
    prize.style.height = '25px';
    prize.style.background = 'red';
    prize.style.borderRadius = '50%';
    prize.style.position = 'absolute';
    prize.style.top = '60px';
    prize.style.left = '10px';
  }

  dropPrize(): void {
    const machine = document.querySelector('.craneGame') as HTMLElement;
    const prize = document.querySelector('.prize') as HTMLElement;

    let prizeX = this.x;
    let prizeY = this.y;
    this.count = setInterval(() => {
      if (!this.win) { //未中獎
        prizeY++;
        prize.style.transform = `translate3d(${prizeX - this.x}px,${prizeY}px, 0)`;
      } else {  //中獎
        this.y++;
        prize.style.transform = `translate3d(${this.x}px,${this.y}px, 0)`;
      }

      if (this.y > 150 || prizeY > 150) {
        prize.style.display = 'none';
      }
    }, 3);
  }

  change() {
    this.win = !this.win;
  }

  showPrize() {
    
  }

}
