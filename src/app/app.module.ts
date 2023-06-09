import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { ExamCategoryComponent } from './components/exam-category/exam-category.component';
import { ExamScheduleComponent } from './components/exam-schedule/exam-schedule.component';
import { ExamQuestionComponent } from './components/exam-question/exam-question.component';
import { ExamCategoryAddComponent } from './components/exam-category-add/exam-category-add.component';
import { ExamCategoryViewComponent } from './components/exam-category-view/exam-category-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamScheduleViewComponent } from './components/exam-schedule-view/exam-schedule-view.component';
import { ExamScheduleAddComponent } from './components/exam-schedule-add/exam-schedule-add.component';
import { ExamScheduleUpdateComponent } from './components/exam-schedule-update/exam-schedule-update.component';
import { ExamCategoryUpdateComponent } from './components/exam-category-update/exam-category-update.component';
import { ExamQuestionAddComponent } from './components/exam-question-add/exam-question-add.component';
import { ExamQuestionUpdateComponent } from './components/exam-question-update/exam-question-update.component';
import { ExamQuestionViewComponent } from './components/exam-question-view/exam-question-view.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    ExamCategoryComponent,
    ExamScheduleComponent,
    ExamQuestionComponent,
    ExamCategoryAddComponent,
    ExamCategoryViewComponent,
    ExamScheduleViewComponent,
    ExamScheduleAddComponent,
    ExamScheduleUpdateComponent,
    ExamCategoryUpdateComponent,
    ExamQuestionAddComponent,
    ExamQuestionUpdateComponent,
    ExamQuestionViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
