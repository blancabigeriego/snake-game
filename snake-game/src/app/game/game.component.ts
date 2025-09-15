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

  public isGameOver = false;
  public isCountDown: boolean = false;
  public countDownNumber: number = 4;
  public snake = [{x:10, y:10}];
  public food = { x: 0, y: 0 };
  private direction = { x: 1, y: 0 };
  private nextDirection = { x: 1, y: 0 };
  private beepSound = new Audio('assets/sounds/beep.wav');
  private gameInterval: any;

  ngOnInit(): void {
    this.startCountDown();
  };
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (arrowKeys.includes(event.key)) {
      event.preventDefault();
    }
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
          this.placeFood();
          this.startGameLoop();
        }
      }, 1000);
    }
  };



  public moveSnake() {
    this.direction = { ...this.nextDirection };
    const gridSize = 20;
    const head = {
      x: (this.snake[0].x + this.direction.x + gridSize) % gridSize,
      y: (this.snake[0].y + this.direction.y + gridSize) % gridSize
    };

    if (this.hasSelfCollision(head)) {
      this.gameOver();
      return;
    }

    if (head.x === this.food.x && head.y === this.food.y) {
      this.snake.unshift(head);
      this.placeFood();
    } else {
      this.snake.unshift(head);
      this.snake.pop();
    }
  };

  public restartGame() {
    this.snake = [{ x: 10, y: 10 }];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.countDownNumber = 4;
    this.isGameOver = false;
    this.startCountDown();
  }

  private hasSelfCollision(head: { x: number, y: number }): boolean {
    return this.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  };


  private startGameLoop(): void {
    this.gameInterval = setInterval(() => {
      this.moveSnake();
    }, 200);
  };

  private getRandomPosition(): { x: number, y: number } {
    const gridSize = 20;
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
  };

  private placeFood(): void {
    let newFoodPos;

    do {
      newFoodPos = this.getRandomPosition();
    } while (this.isOnSnake(newFoodPos));

    this.food = newFoodPos;
  };

  private isOnSnake(position: { x: number, y: number }): boolean {
    return this.snake.some(segment => segment.x === position.x && segment.y === position.y);
  }

  private gameOver(): void {
    clearInterval(this.gameInterval);
    this.isGameOver = true;
  };








}
