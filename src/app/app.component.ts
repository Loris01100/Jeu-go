import { Component} from '@angular/core';
import { PlateauComponent } from './plateau/plateau.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'jeu-go';
  plateau = new PlateauComponent();
  plateau8Rows = this.plateau.plateau8x8Rows;
  plateau8Columns = this.plateau.plateau8x8Columns;
  plateau9Rows = this.plateau.plateau9x9Rows;
  plateau9Columns = this.plateau.plateau9x9Columns;
}
