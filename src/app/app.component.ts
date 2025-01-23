import { Component, OnInit} from '@angular/core';
import { PlateauComponent } from './plateau/plateau.component';
import { NgFor } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { blob } from 'node:stream/consumers';


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
  passes = [false,false];

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

    this.etatPlateau[rowIndex][colIndex] = this.joueurActuel === 1 ? 'blanc' : 'noir';

    this.passes = [false,false];

    this.joueurActuel = this.joueurActuel === 1 ? 2 : 1;

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

    if (jeton === 'blanc') {
      this.scoreJoueur2 += 1;
    } else if (jeton === 'noir') {
      this.scoreJoueur1 += 1;
    }
  }

  //méthode qui permet de passer le tour du joueur
  //si un joueur passe son tour c'est à l'autre joueur de jouer
  //si les deux joueurs passent leur tour, la partie est terminé
  passerTour() : void {
    this.passes[this.joueurActuel - 1] = true;

    if(this.passes[0] && this.passes[1]) {
      alert('les deux joueurs ont passés leur tour. Partie terminé');
      this.terminerPartie();
      return;
    }

    this.joueurActuel = this.joueurActuel === 1 ? 2 : 1

    this.passes[this.joueurActuel - 1] = false;

  }

  //méthodes qui est utilisé uniquement si deux joueurs passent leur tour. 
  //elle permet de reinitialisé le plateau, le score des deux joueurs.
  //affiche dans un message d'alerte le score des deux joueurs.
  terminerPartie() : void {
    //console.log("partie terminé") test
    alert(`Score final - Joueur 1: ${this.scoreJoueur1}, Joueur 2: ${this.scoreJoueur2}`);

    this.joueurActuel = 1
    this.passes = [false,false];

    this.etatPlateau = Array(9)
    .fill(null)
    .map(() => Array(9).fill(''));

    // Réinitialiser les scores
    this.scoreJoueur1 = 0;
    this.scoreJoueur2 = 0;
  }

  //méthode pour la sauvegarde de la partie en localStorage
  //ne pas prendre en compte l'élément dateSauvegarde, ajouté pour tester de mettre les sauvegardes dans une autre page
  //méthode qui récupère tous les éléments d'une partie : etatPlateau, scoreJoueur1 et scoreJoueur2, joueurActuel, passes 
  sauvegarderPartie(nomPartie : string) : void {
    const partie = {
      etatPlateau: this.etatPlateau,
      scoreJoueur1: this.scoreJoueur1,
      scoreJoueur2: this.scoreJoueur2,
      joueurActuel: this.joueurActuel,
      passes: this.passes,
      dateSauvegarde: new Date().toISOString,
    };

    localStorage.setItem(`jeuGo-${nomPartie}`, JSON.stringify(partie));
    alert('partie sauvegardée');
  }

  //méthode qui récupère le localStorage de la page
  //permet de charger tous les éléments qui ont été sauvegardés par la méthode
  //méthode qui charge tous les éléments d'une partie sauvegarder : etatPlateau, scoreJoueur1 et scoreJoueur2, joueurActuel, passes 
  chargerPartie(nomPartie: string): void {
    const sauvegarde = localStorage.getItem(`jeuGo-${nomPartie}`); // Utiliser des backticks ici
    if (sauvegarde) {
      const partie = JSON.parse(sauvegarde);
      this.etatPlateau = partie.etatPlateau;
      this.scoreJoueur1 = partie.scoreJoueur1;
      this.scoreJoueur2 = partie.scoreJoueur2;
      this.joueurActuel = partie.joueurActuel;
      this.passes = partie.passes;
  
      alert('Partie chargée');
    } else {
      alert('La partie est introuvable');
    }
  }

  //méthode qui devait être utilisé pour lister les parties dans une autres page
  //non utilsé
  listePartie(): {nom: string, dateSauvegarde: string}[] {
    const sauvegardes = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('jeuGo-')) {
      const partie = JSON.parse(localStorage.getItem(key)!);
      sauvegardes.push({ nom: key.replace('jeuGo-', ''), dateSauvegarde: partie.dateSauvegarde });
    }
  }
  return sauvegardes;
  }

}
