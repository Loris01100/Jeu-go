import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-plateau',
  imports: [RouterLink, RouterModule],
  templateUrl: './plateau.component.html',
  styleUrl: './plateau.component.css',
})
export class PlateauComponent {
  plateau8x8Rows = Array(8).fill(null);
  plateau8x8Columns = Array(8).fill(null);
  plateau9x9Rows = Array(9).fill(null);
  plateau9x9Columns = Array(9).fill(null);
}
