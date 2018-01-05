import { Option } from './models/option';
import { Component, OnInit } from '@angular/core';

import { QuizService } from './quiz.service';
import { HelperService } from '../helper.service';
import {MycoursesService} from "../mycourses/mycourses.service";
import { Question } from './models/question';
import { QuizConfig } from './models/quiz-config';
import { Quiz } from './models/quiz';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizes: any[];
  courseDetails;
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private router:Router,private quizService: QuizService,private courses:MycoursesService,private aroute:ActivatedRoute) { }

  ngOnInit() {
    //debugger;
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    // this.quizService.get(quizName).subscribe(res => {
    //   this.quiz = new Quiz(res);
    //   this.pager.count = this.quiz.questions.length;
    // });
    let courseId = this.aroute.snapshot.params['course'];
    if(courseId != undefined){
        // let course = this.courses.getCourseDet(courseId);
        // if(course.status){
        //     this.courseDetails = course.data;
        // }else{
        //     this.courseDetails = null;
        // }
        this.courses.getCourseDet(courseId).subscribe(data=>{
          let quizData = data.json();
          this.quiz=new Quiz(quizData[0]);
          this.pager.count = this.quiz.questions.length;
           
            // this.courseDetails = course[0];
        });
    }
    this.mode = 'quiz';
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    // debugger;
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.find(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmit() {
    // debugger;
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = 'result';
  }
}
