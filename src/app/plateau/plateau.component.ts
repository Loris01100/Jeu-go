import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-plateau',
  imports: [RouterLink, RouterModule],
  templateUrl: './plateau.component.html',
  styleUrl: './plateau.component.css',
})
export class PlateauComponent {
  plateau9x9Rows: number[] = Array.from({ length: 9 });
  plateau9x9Columns: number[] = Array.from({ length: 9 });
  plateau8x8Rows: number[] = Array.from({ length: 8 });
  plateau8x8Columns: number[] = Array.from({ length: 8 });

}
