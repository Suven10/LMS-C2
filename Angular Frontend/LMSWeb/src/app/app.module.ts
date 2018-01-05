import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TopnavComponent } from './topnav/topnav.component';
import { HomeComponent } from './home/home.component';
import { NocontentComponent } from './nocontent/nocontent.component';
import { AuthService } from "./auth/auth.service";
import {HomeService} from "./home/home.service";
import {CommonService} from "./common.service";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import { MycoursesComponent } from './mycourses/mycourses.component';
import {MycoursesService} from "./mycourses/mycourses.service";
import {GroupByPipe} from "./topnav/groupby.pipe";
import { IndividualCourseComponent } from './mycourses/individualcourse/individualcourse.component';
import { CourseComponent } from './mycourses/course/course.component';
import { MyDatePickerModule } from 'mydatepicker';
import { QuizComponent } from './quiz/quiz.component';
import {QuizService} from "./quiz/quiz.service";
import { EnrolledComponent } from './mycourses/enrolled/enrolled.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileviewerComponent } from './mycourses/fileviewer/fileviewer.component';
// import {Ng2ListViewCRUD} from "ng2-listview-crud";


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        TopnavComponent,
        HomeComponent,
        NocontentComponent,
        MycoursesComponent,
        GroupByPipe,
        IndividualCourseComponent,
        CourseComponent,
        QuizComponent,
        EnrolledComponent,
        FileviewerComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        MyDatePickerModule,
        PdfViewerModule,
        RouterModule.forRoot([
            {
                path: '',
                component: AuthComponent
            },{
                path: 'auth',
                component: AuthComponent
            },{
                path: 'home',
                component: HomeComponent
            },{
                path: 'home/:status',
                component: TopnavComponent
            },{
                path: 'mycourses',
                component: MycoursesComponent
            },{
                path: 'courses/:course',
                component: IndividualCourseComponent
            },{
                path: 'course/:course/:id/:chapterId',
                component: FileviewerComponent
            },{
                path: 'categourCourses/:category',
                component: MycoursesComponent
            },{
                path: 'course',
                component: CourseComponent
            },{
                path: 'enrolled',
                component: EnrolledComponent
            },{
                path: 'quiz/:course',
                component: QuizComponent
            },{
                path: '**',
                component: NocontentComponent
            }
        ]),
        ToastModule.forRoot()
    ],
    providers: [
        AuthService,
        HomeService,
        MycoursesService,
        CommonService,
        QuizService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
