import { NgIf, NgFor} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, NgFor],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public isCountDown: boolean = false;
  public countDownNumber: number = 4;
  public snake = [{x:10, y:10}];
  private direction = { x: 1, y: 0 };
  private nextDirection = { x: 1, y: 0 };
  private beepSound = new Audio('assets/sounds/beep.wav');
  private gameInterval: any;

  ngOnInit(): void {
    this.startCountDown();
  };
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
        break;
    }
  }


  private startCountDown(): void {
    this.beepSound.load();
    if (typeof window !== 'undefined') {
      this.isCountDown = true;

      const interval = setInterval(() => {
        if (this.countDownNumber > 0) {
          this.countDownNumber--;
          this.beepSound.play();
        } else if (this.countDownNumber === 0) {
          clearInterval(interval);
          this.isCountDown = false;
          this.startGameLoop();
        }
      }, 1000);
    }
  };



  public moveSnake() {

    this.direction = { ...this.nextDirection };

    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y
    };
    const gridSize = 20;

    head.x = (head.x + gridSize) % gridSize;
    head.y = (head.y + gridSize) % gridSize;

    this.snake.unshift(head);
    this.snake.pop();
};

private startGameLoop(): void {
  this.gameInterval = setInterval(() => {
    this.moveSnake();
  }, 200);
}






}
