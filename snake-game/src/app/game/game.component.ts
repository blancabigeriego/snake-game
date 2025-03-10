import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public isCountDown: boolean = false;
  public countDownNumber: number = 4;
  public snake = [{x:10, y:10}];
  public dx = 1;
  public dy = 1;
  private beepSound = new Audio('assets/sounds/beep.wav');

  ngOnInit(): void {
    this.startCountDown();
  };

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
          this.moveSnake();
        }
      }, 1000);
    }
  };



  public moveSnake() {

    // Crear nueva cabeza avanzando en la dirección actual
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

    // Agregar nueva cabeza al inicio del array
    this.snake.unshift(head);

    // Eliminar la última parte del cuerpo para simular movimiento
    this.snake.pop();
}






}
