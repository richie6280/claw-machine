import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOnInit() {
    this.swingRight();
    this.customizationImages(); 
  }

  constructor() { }

  count: any;
  x: number = 0;
  y: number = 0;
  win: boolean = true;

  //扭蛋 禮物 彩球
  style: string = '扭蛋';
  //客製化可選圖片
  banner: string = '#fff';
  icon: string = '';

  // startEventLeft(e: any): void {
  //   const claw = document.querySelector('.claw') as HTMLElement;
  //   const btn = document.querySelector('.left') as HTMLElement;

  //   btn.classList.add('preㄥss');
  //   if (this.x < 0) return;

  //   this.count = setInterval(() => {
  //     this.x -= 0.5;
  //     claw.style.transform = `translateX(${this.x}px)`;
  //     if (this.x < 0) {
  //       clearInterval(this.count);
  //     };
  //   }, 3);
  // }

  // startEventRight(e: any): void {
  //   const machine = document.querySelector('.container') as HTMLElement;
  //   const claw = document.querySelector('.claw') as HTMLElement;
  //   const btn = document.querySelector('.right') as HTMLElement;

  //   btn.classList.add('press');
  //   if (this.x > machine.offsetWidth - this.x) return;

  //   this.count = setInterval(() => {
  //     this.x += 0.5;
  //     claw.style.transform = `translateX(${this.x}px)`;
  //     if (this.x > (machine.offsetWidth - this.x)) {
  //       clearInterval(this.count);
  //     };
  //   }, 3);
  // }

  // stopEvent(e: any): void {
  //   const rightBtn = document.querySelector('.right') as HTMLElement;
  //   const leftBtn = document.querySelector('.left') as HTMLElement;
  //   if (this.count) {
  //     clearInterval(this.count);
  //     rightBtn.classList.remove('press');
  //     leftBtn.classList.remove('press');
  //   }
  // }

  customizationImages() {
    //風格
    const banner = document.querySelector('.banner') as HTMLElement;
    const machine = document.querySelector('.machine') as HTMLElement;
    const prizes = document.querySelector('.prizes') as HTMLElement;
    const joystick = document.querySelector('.joystick') as HTMLElement;
    const getImg = document.querySelector('.get img') as HTMLElement;
    const get = document.querySelector('.get') as HTMLElement;

    //客製化圖片
    const background = document.querySelector('.background') as HTMLElement;
    const icon = document.querySelector('.icon') as HTMLElement;

    if(this.style === '扭蛋') {
      background.style.background = 'url(../assets/扭蛋/window-background.png)';
      machine.setAttribute('src', '../assets/扭蛋/machine-frame.png');
      prizes.setAttribute('src', '../assets/扭蛋/window-prizes-shadow.png');
      joystick.setAttribute('src', '../assets/扭蛋/joystick.png');
      getImg.setAttribute('src', '../assets/扭蛋/btn-prize-text.png');
      get.classList.add('style-1');
    } else if (this.style === '禮物') {
      background.style.background = 'url(../assets/禮物/window-background.png)';
      machine.setAttribute('src', '../assets/禮物/machine-frame.png');
      prizes.setAttribute('src', '../assets/禮物/window-prizes-shadow.png');
      joystick.setAttribute('src', '../assets/禮物/joystick.png');
      getImg.setAttribute('src', '../assets/禮物/btn-prize-text.png');
      get.classList.add('style-2');
    } else if (this.style === '彩球') {
      background.style.background = 'url(../assets/彩球/window-background.png)';
      machine.setAttribute('src', '../assets/彩球/machine-frame.png');
      prizes.setAttribute('src', '../assets/彩球/window-prizes-shadow.png');
      joystick.setAttribute('src', '../assets/彩球/joystick.png');
      getImg.setAttribute('src', '../assets/彩球/btn-prize-text.png');
      get.classList.add('style-3');
    }
    
    banner.style.background = `${this.banner}`;
    icon.style.background = `${this.icon}`;
  }

  swingRight() {
    const claw = document.querySelector('.claw') as HTMLElement;

    this.count = setInterval(() => {
      this.x += 0.125;
      claw.style.transform = `translateX(${this.x}vw)`;
      if (this.x > 55) {
        clearInterval(this.count);
        this.swingLeft();
      };
    }, 3);
  }

  swingLeft() {
    const claw = document.querySelector('.claw') as HTMLElement;

    if (this.x < 0) return;

    this.count = setInterval(() => {
      this.x -= 0.125;
      claw.style.transform = `translateX(${this.x}vw)`;
      if (this.x < 0) {
        clearInterval(this.count);
        this.swingRight();
      };
    }, 3);
  }

  grab(): void {
    this.onlyOnce();

    clearInterval(this.count);
    const claw = document.querySelector('.claw') as HTMLElement;
    const clawBar = document.querySelector('.bar-claw') as HTMLElement;
    const armClaw = document.querySelector('.body-claw') as HTMLElement;
    const leftClaw = document.querySelector('.left-claw') as HTMLElement;
    const rightClaw = document.querySelector('.right-claw') as HTMLElement;
    const getBtn = document.querySelector('.get') as HTMLElement;

    getBtn.classList.add('press');
    getBtn.classList.remove('flash');
    setTimeout(() => {
      getBtn.classList.remove('press');
    }, 100)

    this.count = setInterval(() => {
      leftClaw.classList.add('clawGrab');
      rightClaw.classList.add('clawGrab');
      this.y += 0.15;
      armClaw.style.transform = `translate3d(${0}vw,${this.y}vw, 0)`;
      clawBar.style.height = `${this.y + 10}vw`;

      if (this.y > 27) { //爪子往下到底
        clearInterval(this.count);
        this.getPrize();
        this.count = setInterval(() => {
          leftClaw.classList.remove('clawGrab');
          rightClaw.classList.remove('clawGrab');
          this.y -= 0.15;
          armClaw.style.transform = `translate3d(${0}vw,${this.y}vw, 0)`;
          clawBar.style.height = `${this.y + 10}vw`;

          if (this.y < 0) {
            clearInterval(this.count);
            if (!this.win) this.dropPrize() //未中獎掉禮物
            this.count = setInterval(() => {
              this.x -= 0.15;
              claw.style.transform = `translate3d(${this.x}vw,${this.y}vw, 0)`;

              if (this.x < 0) {
                leftClaw.classList.add('clawGrab');
                rightClaw.classList.add('clawGrab');
                // setTimeout(() => {
                //   leftClaw.classList.remove('clawGrab');
                //   rightClaw.classList.remove('clawGrab');
                // }, 250)

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
    if(this.style === '扭蛋') {
      prize.style.backgroundImage = "url('../assets/扭蛋/prize-get.png')";
    } else if (this.style === '禮物') {
      prize.style.backgroundImage = "url('../assets/禮物/prize-get.png')";
    } else if (this.style === '彩球') {
      prize.style.backgroundImage = "url('../assets/彩球/prize-get.png')";
    }
    prize.style.backgroundSize = '13vw';
    prize.style.width = '13vw';
    prize.style.height = '13vw';
    prize.style.position = 'relative';
    prize.style.top = '13vw';
    prize.style.right = '1.5vw';
  }

  dropPrize(): void {
    const prize = document.querySelector('.prize') as HTMLElement;

    let prizeX = this.x;
    let prizeY = this.y;
    this.count = setInterval(() => {
      if (!this.win) { //未中獎
        prizeY+=0.2;
        prize.style.transform = `translate3d(${prizeX - this.x}vw,${prizeY}vw, 0)`;
      } else {  //中獎
        this.y+=0.2;
        prize.style.transform = `translate3d(${this.x}vw,${this.y}vw, 0)`;
      }

      if (this.y > 27 || prizeY > 27) prize.style.display = 'none';
      if (this.y > 75) {
        prize.style.right = '4.5vw';
        prize.style.display = 'block';
        if (this.y > 84.5) this.y-=0.2; return;
      };
    }, 3);
  }

  onlyOnce() {
    const machine = document.querySelector('.container') as HTMLElement;
    const preventRepeat = document.createElement("div");
    machine.append(preventRepeat);
    preventRepeat.style.width = '100vw';
    preventRepeat.style.height = '100vh';
    preventRepeat.style.zIndex = '3';
    preventRepeat.style.position = 'absolute';
  }

  change() {
    this.win = !this.win;
  }

}
