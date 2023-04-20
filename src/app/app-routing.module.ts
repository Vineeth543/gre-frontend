import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { ExamScheduleComponent } from './components/exam-schedule/exam-schedule.component';
import { ExamCategoryComponent } from './components/exam-category/exam-category.component';
import { ExamQuestionComponent } from './components/exam-question/exam-question.component';
import { ExamCategoryAddComponent } from './components/exam-category-add/exam-category-add.component';
import { ExamCategoryViewComponent } from './components/exam-category-view/exam-category-view.component';
import { ExamScheduleAddComponent } from './components/exam-schedule-add/exam-schedule-add.component';
import { ExamScheduleViewComponent } from './components/exam-schedule-view/exam-schedule-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'schedule', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'schedule', component: ExamScheduleComponent },
  { path: 'schedule/add', component: ExamScheduleAddComponent },
  { path: 'schedule/update/:id', component: ExamScheduleAddComponent },
  { path: 'schedule/view', component: ExamScheduleViewComponent },
  { path: 'category', component: ExamCategoryComponent },
  { path: 'category/add', component: ExamCategoryAddComponent },
  { path: 'category/update/:id', component: ExamCategoryAddComponent },
  { path: 'category/view', component: ExamCategoryViewComponent },
  { path: 'question', component: ExamQuestionComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: '**', redirectTo: 'schedule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
