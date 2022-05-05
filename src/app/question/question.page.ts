import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestiongameService } from '../questiongame.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  question: string = 'question';
  userAnswer;
  goodAnswer;
  compteurGoodAnswers = 0;
  allQuestions;
  compteurQuestion = 1;
  showResult;
  showQuestion;
  showNextQuestion;
  wholeQuestion;
  responses;
  badAnswers;
  difficultyChoiced;
  categoryChoiced;
  nbrQuestions;
  pseudo;
  quantityQuestions;

  constructor(
    private questiongameService: QuestiongameService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    //2 manières de récupérer les paramètres
    // this.activateRoute.params.subscribe((params) => {
    //   console.log(params.pseudo);
    // });
    this.pseudo = this.activateRoute.snapshot.params.pseudo;
    this.difficultyChoiced = this.activateRoute.snapshot.params.difficulty;
    this.categoryChoiced = this.activateRoute.snapshot.params.category;
    this.quantityQuestions =
      this.activateRoute.snapshot.params.quantityQuestions;
    this.getFirstAndAllQuestionsApi();
  }

  getFirstAndAllQuestionsApi() {
    this.questiongameService
      .getQuestionsApi2(
        this.difficultyChoiced,
        this.categoryChoiced,
        this.quantityQuestions
      )
      .subscribe((result: any) => {
        this.allQuestions = result.results.sort((a, b) => 0.5 - Math.random());
        this.nbrQuestions = this.allQuestions.length;

        this.wholeQuestion = this.allQuestions[0];

        this.showWholeQuestion(this.wholeQuestion);
      });
  }

  nextQuestion() {
    if (
      this.questiongameService.checkAnswer(this.userAnswer, this.goodAnswer)
    ) {
      this.compteurGoodAnswers++;
    }

    this.deleteQuestion();
    this.showNextQuestion = false;

    if (this.allQuestions.length === 0) {
      this.router.navigate([
        '/result',
        this.compteurGoodAnswers,
        this.nbrQuestions,
      ]);
    } else {
      this.getQuestion();
      this.compteurQuestion++;
    }
  }

  getQuestion() {
    this.wholeQuestion = this.allQuestions[0];
    this.showWholeQuestion(this.wholeQuestion);
  }

  showWholeQuestion(wholeQuestion) {
    this.question = wholeQuestion.question;
    this.responses = wholeQuestion.incorrect_answers;
    this.goodAnswer = this.wholeQuestion.correct_answer;
    this.badAnswers = this.wholeQuestion.incorrect_answers;
    this.responses.push(wholeQuestion.correct_answer);
    this.responses.sort((a, b) => 0.5 - Math.random());
    //this.readQuestion();
  }

  deleteQuestion() {
    this.allQuestions.splice(0, 1);
  }

  getHome() {
    this.initPlay();
  }

  initPlay() {}

  showNextQuestionResponse() {
    this.showNextQuestion = true;
  }

  readQuestion() {}
}
