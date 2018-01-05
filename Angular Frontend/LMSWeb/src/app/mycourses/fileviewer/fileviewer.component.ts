import {Router, ActivatedRoute } from '@angular/router';
import { MycoursesService } from './../mycourses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fileviewer',
  templateUrl: './fileviewer.component.html',
  styleUrls: ['./fileviewer.component.css']
})
export class FileviewerComponent implements OnInit {
  subModules;
  chapterDet;
  pageCount=0;
  isLoaded;
  pdf;
  numPages;
  constructor(private course:MycoursesService,private aroute:ActivatedRoute) { }

  ngOnInit() {
    let courseId = this.aroute.snapshot.params['id'];
    let chapeterId = this.aroute.snapshot.params['chapterId'];
    this.course.getCourseDet(courseId).subscribe(data=>{
      let course = data.json();
      this.subModules = course[0].subModules;
      this.chapterDet=this.subModules.find(x=>x.guChapterId==chapeterId);
      //debugger;
  });
  }

  reduceCount(){
    let noOfModules=this.chapterDet.noOfModules;
    if(this.pageCount<=noOfModules && this.pageCount>0)
      this.pageCount--;
  }
  increaseCount(){
    let noOfModules=this.chapterDet.noOfModules;
    if(noOfModules>this.pageCount)
      this.pageCount++;
  }

  afterLoadComplete(pdf) {
    //debugger;
    this.pdf = pdf;
    this.numPages=pdf.numPages;
    this.chapterDet.noOfModules=pdf.numPages;
    this.isLoaded = true;
  }


}
