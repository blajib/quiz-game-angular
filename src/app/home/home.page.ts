/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { QuestiongameService } from '../questiongame.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //homepage variable
  title: string = 'QuestionGame';
  pseudo: string = '';
  difficultyChoices: string[] = ['easy', 'medium', 'hard'];
  difficultyChoiced: string = '';
  categoryChoiced;
  isSavedInformations: boolean = false;
  errorMessages: string[] = null;
  errorMessage: string = '';
  pageTitle: string = 'Home';
  showQuestion: boolean = false;
  showHomePage: boolean = true;
  showErrorMessage: boolean = false;
  showNextQuestion: boolean = false;
  showResult: boolean = false;
  categories;
  errorMessagePseudo: string = 'Le pseudo doit faire au moins 3 chars';
  errorMessageDifficulty: string = 'Veuillez choisir un niveau de difficulté';
  errorMessageErrorCategorie: string = 'Veuillez choisir une catégorie';
  quantityQuestions;

  constructor(
    public toastController: ToastController,
    private questiongameService: QuestiongameService,
    private router: Router
  ) {
    this.getCategories();
  }
  ngOnInit(): void {}

  getStart() {
    this.errorMessage = '';
    if (this.checkStart()) {
      this.router.navigate([
        '/question',
        this.pseudo,
        this.difficultyChoiced,
        this.categoryChoiced,
      ]);
    }
  }

  getCategories() {
    this.questiongameService.getCategories().then((result) => {
      this.categories = result.trivia_categories;
    });
  }

  checkStart() {
    if (this.pseudo.length < 4 || this.pseudo === '') {
      this.presentToast(this.errorMessagePseudo);

      return false;
    }
    if (this.difficultyChoiced === '') {
      this.presentToast(this.errorMessageDifficulty);

      return false;
    }
    if (!this.categoryChoiced) {
      this.presentToast(this.errorMessageErrorCategorie);

      return false;
    }

    return true;
  }

  async presentToast(errorMessage) {
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 2000,
    });
    toast.present();
  }

  goToQuestion() {
    this.router.navigate(['/question']);
  }
}
