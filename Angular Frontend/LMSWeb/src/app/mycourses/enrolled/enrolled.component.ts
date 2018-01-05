import { CommonService } from './../../common.service';
import { MycoursesService } from './../mycourses.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-enrolled',
  templateUrl: './enrolled.component.html',
  styleUrls: ['./enrolled.component.css']
})
export class EnrolledComponent implements OnInit {
  accountId:'';
  enrolledCourses=[];
  enrolledRes;
  enrolledResult;
  constructor(private router:Router,private courses:MycoursesService,private common:CommonService) { }

  ngOnInit() {
    // debugger;
    this.accountId=this.common.readCookieData("uid");
    this.courses.getEnrolledCourse(this.accountId).subscribe(data=>{
        this.enrolledRes=data.json();
        // debugger;
        if(this.enrolledRes.error=="00000"){
            this.enrolledResult=this.enrolledRes.result;
            this.enrolledResult.forEach(courseDet => {
              this.enrolledCourses.push(courseDet.CourseDetails[0]);
            });
        }
    });
  }

  openCourse(courseId) {
    this.router.navigate(['/courses/'+courseId, {id:courseId}]);
  }

}
