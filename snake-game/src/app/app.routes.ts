import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'game',
        component: GameComponent
    }
];
