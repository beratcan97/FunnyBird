import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flappy',
  templateUrl: './flappy.component.html',
  styleUrls: ['./flappy.component.css']
})
export class FlappyComponent implements OnInit, OnDestroy {

  lang = window.navigator.language;
  dateDATA = new Date();

  //Player
  playerBottom = 50;

  //pipe
  //Line 1
  topPipe = 1;
  bottomPipe = 1;
  //Line 2
  topPipe2 = -50;
  bottomPipe2 = -50;

  //Cloud dots
  cDP1 = -1;
  cDP2 = -10;
  cDP3 = -15;

  //Score
  highScore: number = parseInt(localStorage.getItem('flappyGameHighScore'));
  score: number = 0;

  //Game logic
  timer;
  newPosForPipes: number;

  //player
  playerWingUp = false;

  // Day night check
  nightFilter = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('flappyGameHighScore')) {
      this.highScore = 0;
    }

    this.timer = setInterval(() => {
      this.checkCrash();
      this.pipeUpdate();
      this.updateCloud();
      this.checkDayNight();
      this.updatePlayer();
      this.updateScore();

    }, 25);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  publish(highScore) {
    console.log(highScore);
  };

  pipeUpdate(): void {
    //Line 1
    this.topPipe++;
    this.bottomPipe++;

    //Top pipe updater 
    if (this.topPipe == 100) {
      this.topPipe = 1;
    } else {
      document.getElementById('tp1').style.right = (this.topPipe.toString() + '%');
    }
    2
    //Bottom pipe updater 
    if (this.bottomPipe == 100) {
      this.bottomPipe = 1;
    } else {
      document.getElementById('bp1').style.right = (this.bottomPipe.toString() + '%');
    }

    this.newPosForPipes = Math.floor((Math.random() * 30) + 10);
    //Line 2
    this.topPipe2++;
    this.bottomPipe2++;

    //Top pipe updater 
    if (this.topPipe2 == 100 || this.topPipe2 == 1) {
      this.topPipe2 = 1;
      document.getElementById('tp2').style.bottom = ((this.newPosForPipes + 10).toString() + '%');
    } else {
      document.getElementById('tp2').style.right = (this.topPipe2.toString() + '%');
    }
    2
    //Bottom pipe updater
    if (this.bottomPipe2 == 100 || this.bottomPipe2 == 1) {
      this.bottomPipe2 = 1;
      document.getElementById('bp2').style.height = (this.newPosForPipes.toString() + '%');
    } else {
      document.getElementById('bp2').style.right = (this.bottomPipe2.toString() + '%');
    }
  }

  updateCloud() {

    //Dot 1 updater
    this.cDP1 = this.cDP1 + 0.5;
    document.getElementById('cDP1').style.right = (this.cDP1.toString() + '%');

    //Dot 2 updater
    this.cDP2 = this.cDP2 + 0.5;
    document.getElementById('cDP2').style.right = (this.cDP2.toString() + '%');

    //Dot 3 updater
    this.cDP3 = this.cDP3 + 0.5;
    document.getElementById('cDP3').style.right = (this.cDP3.toString() + '%');


    //ResetCloud
    if (this.cDP1 >= 100) {
      this.cDP1 = -50;
    }
    if (this.cDP2 >= 100) {
      this.cDP2 = -50;
    }
    if (this.cDP3 >= 100) {
      this.cDP3 = -50;
    }
  }

  checkCrash(): void {
    //Touch floor
    if (this.playerBottom <= 5) {
      this.playerLose();
    } else
      //Touch top
      if (this.playerBottom >= 100) {
        this.playerLose();
      }

    //Line 1
    //Touch top pipe    
    if (this.topPipe > 70 && this.topPipe < 90 && this.playerBottom > 30) {
      this.playerLose();
    } else
      //Touch bottom pipe    
      if (this.bottomPipe > 70 && this.bottomPipe < 90 && this.playerBottom < 20) {
        this.playerLose();
      }

    //Line 2
    //Touch top pipe    
    let tp2Bottom: number = Number((document.getElementById('tp2').style.bottom).slice(0, -1));

    if (this.topPipe2 > 70 && this.topPipe2 < 90 && this.playerBottom > tp2Bottom) {
      this.playerLose();
    } else
      //Touch bottom pipe    
      if (this.bottomPipe2 > 70 && this.bottomPipe2 < 90 && this.playerBottom < tp2Bottom - 10) {
        this.playerLose();
      }
  }

  playerLose(): void {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('flappyGameHighScore', this.score.toString());
      this.publish(this.highScore);
    }
    // this.router.navigate(['/']);
  }

  updateScore(): void {
    this.score = +(this.score + 0.1).toFixed(1);
  }

  updatePlayer(): void {
    // Gravity
    this.playerBottom = (this.playerBottom - 0.4);
    document.getElementById('player').style.bottom = (this.playerBottom.toString() + '%');
  }

  checkDayNight() {
    let tmp = document.getElementById('cDP1').style.right.split('%');
    
    if(parseInt(tmp[0]) > 15 && parseInt(tmp[0]) < 50 && !this.nightFilter) {
      this.nightFilter = true;
    } else if(parseInt(tmp[0]) > 50 && this.nightFilter) {
      this.nightFilter = false;
    }
  }

  onScreenClick(): void {
    // Updates players wing
    this.playerWingUp = !this.playerWingUp;

    let newPos = this.playerBottom + 6;

    while (this.playerBottom < newPos) {
      this.playerBottom++;
    }
  }
}