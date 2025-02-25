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
  public countDownNumber: number = 3;

  ngOnInit(): void {
    this.startCountDown();
  };

  private startCountDown(): void {
    if (typeof window !== 'undefined') {
      // Esto asegura que solo se ejecute en el navegador
      const beepSound = new Audio('assets/sounds/beep.wav');
      this.isCountDown = true;

      const interval = setInterval(() => {
        if (this.countDownNumber > 0) {
          beepSound.play(); // Reproduce el pitido solo si el número es mayor que 0
          this.countDownNumber--;
        } else if (this.countDownNumber === 0) {
          beepSound.play(); // Si el número llega a 0, reproduce el pitido una última vez
          clearInterval(interval); // Detenemos el intervalo
          this.isCountDown = false;
        }
      }, 1000);
    }
  }




}
