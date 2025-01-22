import { Component, OnInit} from '@angular/core';
import { PlateauComponent } from './plateau/plateau.component';
import { NgFor } from '@angular/common';
import { ScoreComponent } from './score/score.component';


@Component({
  selector: 'app-root',
  imports: [NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
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


  //scores par défaut au début de la partie
  scoreJoueur1: number = 0
  scoreJoueur2: number = 0

  //premier joueur à jouer = toujours le blanc, blanc = 1
  joueurActuel: number = 1;

  constructor(private score: ScoreComponent) {}

  //les subscribes pour les scores
  ngOnInit(): void {
    this.score.scoreJoueur1$.subscribe((scores) => {
      this.scoreJoueur1 = scores;
    });
    this.score.scoreJoueur2$.subscribe((scores) => {
      this.scoreJoueur2 = scores;
    });

      //les subscribes pour le changement de joueur
  this.score.joueurActuel$.subscribe((joueur) => {
    this.joueurActuel = joueur;
  })
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
    this.score.changementJoueur();
  }

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

    if (this.joueurActuel === 1) {
      this.score.ajoutPointJoueur1();
    } else {
      this.score.ajoutPointJoueur2();
    }
  }

}
