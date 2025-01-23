import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any',
})

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
  template: `
    <div class="scoreboard">
      <p>Score Blanc : {{ scoreBlanc }}</p>
      <p>Score Noir : {{ scoreNoir }}</p>
    </div>
  `,
})
export class ScoreComponent {

  //score des joueurs gérer par des observables
  private scoreJoueur1Subject = new BehaviorSubject<number>(0);
  private scoreJoueur2Subject = new BehaviorSubject<number>(0);

  //score des joueurs public
  scoreJoueur1$ = this.scoreJoueur1Subject.asObservable();
  scoreJoueur2$ = this.scoreJoueur2Subject.asObservable();

  //les deux méthodes ajoutant les scores des joueurs 1 et 2
  ajoutPointJoueur1(): void {
    const scoreActuel = this.scoreJoueur1Subject.value;
    this.scoreJoueur1Subject.next(scoreActuel + 1);
  }

  ajoutPointJoueur2(): void {
    const scoreActuel = this.scoreJoueur2Subject.value;
    this.scoreJoueur2Subject.next(scoreActuel + 1);
  }

  //méthode permettant de changer de joueur à chaque fois que l'autre joue ou passe son tour
  private joueurActuelSubject = new BehaviorSubject<number>(1);
  joueurActuel$ = this.joueurActuelSubject.asObservable();

  changementJoueur(): void {
    const joueurActuel = this.joueurActuelSubject.value;
    this.joueurActuelSubject.next(joueurActuel === 1 ? 2 : 1);
  }
}
