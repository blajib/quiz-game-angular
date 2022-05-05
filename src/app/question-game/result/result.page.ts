import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  compteurGoodAnswers;
  nbrQuestions;
  constructor(private activateRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.compteurGoodAnswers =
      this.activateRoute.snapshot.params.compteurGoodAnswers;
    this.nbrQuestions = this.activateRoute.snapshot.params.nbrQuestions;
  }

  getHome() {
    this.router.navigate(['home']);
  }
}
