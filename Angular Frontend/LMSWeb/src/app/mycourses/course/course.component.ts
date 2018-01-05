import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {CommonService} from "../../common.service";
import {MycoursesService} from "../mycourses.service";
import {Http,Request,Response,Headers, RequestOptions} from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router,ActivatedRoute} from "@angular/router";
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TopnavComponent } from '../../topnav/topnav.component';
// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
// import {Ng2ListViewCRUDProperty} from "ng2-listview-crud";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers:[TopnavComponent]
})
export class CourseComponent implements OnInit {
  isNewCourse=true;
  isNewCategory=true;
  isValidFormSubmitted=false;
  categoryRes;
  courseRes;
  allCategories;
  course = {
    code   : '',
    name   : '',
    guCatId   : '',
    type    : 'Quiz',
    noOfModules:0,
    subModules:[{
      code:'',
      name:'',
      desc:'',
      chapterPath:Event,
      filePath:'',
      noOfModules:''
    }],
    quizzes:[{
      question:'',
      selectiveAnswers:[],
      selectiveAnswer:'',
      isAnswer:false,
      answerType:'',
      finalAnswers:[]
    }],
    filePath:'',
    desc:'',
    imgPath:'assets/course'
  }
  quiz={
    question:'',
    selectiveAnswers:[],
    selectiveAnswer:'',
    isAnswer:false,
    answerType:'',
    finalAnswers:[]
  }

  media={
    code:'',
    name:'',
    desc:'',
    chapterPath:Event,
    filePath:'',
    noOfModules:''
  };
  
  answerObj={
    name:'',
    isAnswer:false
  }

  category = {
    code   : '',
    name   : '',
    desc    : ''
  }

  constructor(private commonService:CommonService, private aroute: ActivatedRoute,private mycourse:MycoursesService,private toastr:ToastsManager,private topnav:TopnavComponent) {

  }

  ngOnInit() {
    let courseParams = this.aroute.snapshot.params;
    this.isNewCourse=(courseParams.isNewCourse=="true")?true:false;
    this.isNewCategory=(courseParams.isNewCategory=="true")?true:false;

    this.mycourse.allCategories().subscribe(data=>{
      this.allCategories = data.json();
    });
  }
  

  createCourse(form: NgForm) {
    //debugger;
     this.isValidFormSubmitted = false;
     if(form.invalid){
        return;	
     }
     
     this.course.noOfModules=this.course.subModules.length;
     this.mycourse.createCourse(this.course).subscribe(data=>
      {
        debugger;
        this.courseRes=data.json();
        if(this.courseRes.error=="00000"){
          this.showSuccess("Course created successfully!");
          form.reset();
          this.isValidFormSubmitted=true;
          //this.topnav.reloadCategories();
        }
        else{
          this.showError("Error while adding course!");
          //form.reset();
        }
      });
  }

  createCategory(form: NgForm) {
    //debugger;
     this.isValidFormSubmitted = false;
     if(form.invalid){
        return;	
     }
     this.mycourse.createCategory(this.category).subscribe(data=>
      {
        this.categoryRes=data.json();
        if(this.categoryRes.error=="00000"){
          this.showSuccess("Category created successfully!");
          form.reset();
          this.isValidFormSubmitted=true;
          this.topnav.reloadCategories();
        }
        else{
          this.showError("Error while adding category!");
          //form.reset();
        }
      });
  }

  addFiles(event,chapter) {
  //debugger;
    chapter.chapterPath=event;
  }

  uploadFiles(chapter) {
    //debugger;
    let event=chapter.chapterPath;
    this.commonService.uploadFileData(event,chapter.code).subscribe(data=>{
      let res=data.json();
      let fileUrl='';
      if(res.status){
         fileUrl=res.fileUrl;
         this.showSuccess("File uploaded successfully");
      }
      chapter.filePath=fileUrl;
      chapter.noOfModules=1;
    }); 
  }

  resetCategory(){
    this.category = {
      code   : '',
      name   : '',
      desc    : ''
    }
  }

  addQuiz(){
    this.quiz={
      question:'',
      selectiveAnswers:[],
      selectiveAnswer:'',
      isAnswer:false,
      answerType:'',
      finalAnswers:[]
    }
    this.course.quizzes.push(this.quiz);
  }

  addMedia(){
    this.media={
      code:'',
      name:'',
      desc:'',
      chapterPath:Event,
      filePath:'',
      noOfModules:''
    }
    this.course.subModules.push(this.media);
  }

  addAnswer(quiz){
   // debugger;
    this.answerObj={
      name:'',
      isAnswer:false
    }
    if(quiz.selectiveAnswer!=undefined && quiz.selectiveAnswer!=""){
      this.answerObj.name=quiz.selectiveAnswer;
      this.answerObj.isAnswer=quiz.isAnswer;
      quiz.selectiveAnswers.push(this.answerObj);
      quiz.selectiveAnswer='';
      quiz.isAnswer=false;
    }
    else{
      this.showWarning("Answer is empty!");
    }
  }

  addCorrectAnswer(quiz,value){
    quiz.finalAnswers.push(value);
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success!',{toastLife: 5000, showCloseButton: false});
  }

  showError(message) {
      this.toastr.error(message, 'Oops!',{toastLife: 5000, showCloseButton: true});
  }

  showWarning(message) {
      this.toastr.warning(message, 'Alert!');
  }

  showInfo() {
      this.toastr.info('Just some information for you.');
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  selectCat(value){
    this.course.guCatId=value;
    //debugger;
  }


  



}
