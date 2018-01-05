import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';
import {HomeService} from "./home.service";
import { MycoursesService } from "../mycourses/mycourses.service";
import { MycoursesComponent } from "../mycourses/mycourses.component";
import {Router, ActivatedRoute} from "@angular/router";
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    enrolledCourses;
    coursesEnrolled=0;
    enrolledRes;
    finishedCoursesCount:number = 0;
    totCount:number=0;
    accountId:'';
    isInstructor:boolean;
    isStudent:boolean;
    constructor(private router:Router,private home: HomeService, private mycoursesService: MycoursesService,private common:CommonService) { }

    ngOnInit() {
        //debugger;
        this.accountId=this.common.readCookieData("uid");
        this.isInstructor=(this.common.readCookieData("isInstructor")=="0")?false:true;
        this.isStudent=(this.common.readCookieData("isStudent")=="0")?false:true;
        this.mycoursesService.getEnrolledCourse(this.accountId).subscribe(data=>{
            this.enrolledRes=data.json();
            // debugger;
            if(this.enrolledRes.error=="00000"){
                this.enrolledRes.result.forEach(courseDet => {
                    this.enrolledCourses=courseDet.CourseDetails;
                    this.enrolledCourses.forEach(course => {
                        if(course.noOfModules == courseDet.coveredModules){
                            this.finishedCoursesCount ++;
                        }
                    });
                });
                this.coursesEnrolled=this.enrolledRes.result.length;
                this.mycoursesService.allCourses().subscribe(course =>{
                    let allCourses = course.json();
                    this.totCount=allCourses.length;
                });
            }
        });
        
    }

}
