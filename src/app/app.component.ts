import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOnInit() { }

  constructor() { }

  count: any;
  x: number = 0;
  y: number = 0;
  win: boolean = true;

  startEventLeft(e: any): void {
    const claw = document.querySelector('.claw') as HTMLElement;
    // const armClaw = document.querySelector('.crane-arm-claw') as HTMLElement;
    const btn = document.querySelector('.left') as HTMLElement;

    btn.classList.add('press');
    if (this.x < 0) return;

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
    const btn = document.querySelector('.right') as HTMLElement;
    // const armClaw = document.querySelector('.body-claw') as HTMLElement;

    btn.classList.add('press');
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
    const rightBtn = document.querySelector('.right') as HTMLElement;
    const leftBtn = document.querySelector('.left') as HTMLElement;
    // const getBtn = document.querySelector('.get') as HTMLElement;
    if (this.count) {
      clearInterval(this.count);
      // armClaw.style.animation = '';
      rightBtn.classList.remove('press');
      leftBtn.classList.remove('press');
    }
  }

  grab(): void {
    const machine = document.querySelector('.container') as HTMLElement;
    const claw = document.querySelector('.claw') as HTMLElement;
    const clawBar = document.querySelector('.bar-claw') as HTMLElement;
    const armClaw = document.querySelector('.body-claw') as HTMLElement;
    const leftClaw = document.querySelector('.left-claw') as HTMLElement;
    const rightClaw = document.querySelector('.right-claw') as HTMLElement;
    const getBtn = document.querySelector('.get') as HTMLElement;

    getBtn.classList.add('press');
    setTimeout(() => {
      getBtn.classList.remove('press');
    }, 100)

    this.count = setInterval(() => {
      leftClaw.classList.add('clawGrab');
      rightClaw.classList.add('clawGrab');
      this.y += 0.75;
      armClaw.style.transform = `translate3d(${0}px,${this.y}px, 0)`;
      clawBar.style.height = `${this.y + 30}px`;

      if (this.y > (machine.offsetWidth / 4)) { //暫時
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
    prize.style.backgroundImage = "url('../assets/prize-get.png')";
    prize.style.backgroundSize = '13vw';
    prize.style.width = '13vw';
    prize.style.height = '13vw';
    prize.style.position = 'relative';
    prize.style.top = '13vw';
    prize.style.right = '1.5vw';
    // prize.style.zIndex = '-2';
    // prize.style.background = 'red';
    // prize.style.borderRadius = '50%';
  }

  dropPrize(): void {
    const machine = document.querySelector('.container') as HTMLElement;
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

      if (this.y > (machine.offsetWidth / 4) || prizeY > (machine.offsetWidth / 4)) prize.style.display = 'none';
      if (this.y > (machine.offsetWidth / 1.3)) {
        prize.style.right = '4vw';
        prize.style.display = 'block';
        if (this.y > machine.offsetWidth * 0.845) this.y--; return;
      };
    }, 3);
  }

  change() {
    this.win = !this.win;
  }

  showPrize() {

  }

}
