import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./question-game/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'question/:pseudo/:difficulty/:category',
    loadChildren: () =>
      import('./question-game/question/question.module').then(
        (m) => m.QuestionPageModule
      ),
  },
  {
    path: 'result/:compteurGoodAnswers/:nbrQuestions',
    loadChildren: () =>
      import('./question-game/result/result.module').then(
        (m) => m.ResultPageModule
      ),
  },
  {
    path: 'sharing/home',
    loadChildren: () =>
      import('./sharing/home/home.module').then((m) => m.HomePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
