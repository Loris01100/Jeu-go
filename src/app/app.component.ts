import { Component} from '@angular/core';
import { PlateauComponent } from './plateau/plateau.component';
import { NgFor } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'jeu-go';

  //mise en place du plateau
  plateau = new PlateauComponent();

  plateau8Rows = this.plateau.plateau8x8Rows;
  plateau8Columns = this.plateau.plateau8x8Columns;

  plateau9Rows = this.plateau.plateau9x9Rows;
  plateau9Columns = this.plateau.plateau9x9Columns;

  etatPlateau = Array(9)
    .fill(null)
    .map(() => Array(9).fill(''));

  //mise en place des joueurs
  joueurActuel = 1;
  scoreJoueur1 = 0;
  scoreJoueur2 = 0;


  //méthode pour récupérer les classes 
  //si etatPlateau === blanc alors jetonBlanc utilisé
  //si etatPlateau === noir alors jetonNoir utilisé
  recupClass(rowIndex: number, colIndex: number): string {
    if (this.etatPlateau[rowIndex][colIndex] === 'blanc') {
      return 'jetonBlanc'; //si etatPlateau = blanc alors jetonBlanc
    } else if (this.etatPlateau[rowIndex][colIndex] === 'noir') {
      return 'jetonNoir';
    }
    return '';
  }

  //méthode utiliser pour placer des jetons
  //permet de placer des jetons en fonctions du rowIndex et colIndex du tableau 8x8
  //on commence toujours par le jeton blanc
  //on change de joueur à chaque fois 
  placerJeton(rowIndex: number, colIndex: number): void {
    console.log(`Clicked row: ${rowIndex}, col: ${colIndex}`);
    if (this.etatPlateau[rowIndex][colIndex] !== '') {
      return;
    }

    if (this.joueurActuel === 1) {
      this.etatPlateau[rowIndex][colIndex] = 'blanc';
    } else {
      //si etatPlateau = noir alors jetonNoir
      this.etatPlateau[rowIndex][colIndex] = 'noir';
    }
    this.joueurActuel = this.joueurActuel === 1 ? 2 : 1;
  }


  //permet de retirer le jeton avec le bouton droit, utilisation de l'event.preventDefaut pour ne pas interférer avec l'utilisation du clic droit dans des pages web classiques
  //si le jeton enlevé est blanc, +1 point pour les noirs et inversement
  //remet à zéro étatPlateau lors du clic droit
  retirerJeton(event: MouseEvent, rowIndex: number, colIndex: number): void {
    event.preventDefault();

    const jeton = this.etatPlateau[rowIndex][colIndex];
    if (jeton === '') {
      return;
    }

    this.etatPlateau[rowIndex][colIndex] = '';

    if (jeton === 'blanc') {
      this.scoreJoueur2 += 1;
    } else if (jeton === 'noir') {
      this.scoreJoueur1 += 1;
    }
  }
}
