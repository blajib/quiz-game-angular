import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

@Injectable({
  providedIn: 'root',
})
export class QuestiongameService {
  questionsApi;
  url;

  questions = [
    {
      category: 'Entertainment: Japanese Anime & Manga',
      type: 'multiple',
      difficulty: 'easy',
      question:
        'In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?',
      correct_answer: 'The Salamander',
      incorrect_answers: ['The Dragon Slayer', 'The Dragon', 'The Demon'],
    },

    {
      category: 'Entertainment: Video Games',
      type: 'boolean',
      difficulty: 'medium',
      question:
        '&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.',
      correct_answer: 'False',
      incorrect_answers: ['True'],
    },
  ];
  questionsFiltered = [];

  constructor(private http: HttpClient) {}

  getQuestions(difficulty, nbrQuestions): Promise<any> {
    return new Promise((resolve, reject) => {
      this.questionsFiltered = this.questions.filter(
        (item) => item.difficulty === difficulty
      );

      resolve(this.questionsFiltered);
      reject('Ther is a problem');
    });
  }

  async getQuestionsApi1(difficulty, categoryChoice, nbrQuestions = 10) {
    return await fetch(
      'https://opentdb.com/api.php?amount=' +
        nbrQuestions +
        '&category=' +
        categoryChoice +
        '&difficulty=' +
        difficulty
    )
      .then((result) => result.text())
      .then(JSON.parse)
      .catch((e) => console.log(e));
  }

  checkAnswer(userAnswer, goodAnswer) {
    if (userAnswer === goodAnswer) {
      return true;
    }
  }

  getQuestionsApi2(difficulty, categoryChoice, nbrQuestions = 10) {
    console.log('hey pro', difficulty, categoryChoice);
    return this.http.get(
      this.createUrl(difficulty, categoryChoice, nbrQuestions)
    );
  }

  async getCategories() {
    return await fetch('https://opentdb.com/api_category.php')
      .then((result) => result.text())
      .then(JSON.parse)
      .catch((e) => console.log(e));
  }

  createUrl(difficulty, categoryChoice, nbrQuestions) {
    return (
      'https://opentdb.com/api.php?amount=' +
      nbrQuestions +
      '&category=' +
      categoryChoice +
      '&difficulty=' +
      difficulty
    );
  }
}
