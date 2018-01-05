import { CommonService } from './../common.service';
import { Component, OnInit,Input } from '@angular/core';
// import { Http, Response } from '@angular/http';
import {MycoursesService} from "./mycourses.service";
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {
    @Input() hideCat:boolean;
    allCourses;
    enrolledCourses;
    categoryCourses;
    categories;
    isByCategory=false;
    accountId;
    isInstructor:boolean;
    isStudent:boolean;
    showBtn:boolean;
    constructor(private mycourses: MycoursesService, private router: Router, private aroute: ActivatedRoute,private common:CommonService) { }

    ngOnInit() {
        this.accountId=this.common.readCookieData("uid");
        this.isInstructor=(this.common.readCookieData("isInstructor")=="0")?false:true;
        this.isStudent=(this.common.readCookieData("isStudent")=="0")?false:true;
        this.mycourses.allCategories().subscribe(categoreis => {
            this.categories = categoreis.json();
        });

        let cat = this.aroute.snapshot.params;
        if(this.accountId==undefined || this.accountId==""){
            this.showBtn=false;
        }
        else{
            this.showBtn=true;
        }
        if(cat.type != undefined || cat.type != null){
            if(cat.type == 'categoryCourses'){
                this.isByCategory=true;
                this.hideCat=true;
                // debugger;
                this.mycourses.getCategoryDet(cat.id).subscribe(course =>{
                    this.allCourses = course.json()[0];
                });
            }
            else
            {
                this.mycourses.allCourses().subscribe(course =>{
                    this.allCourses = course.json();
                });
            }
        }else{
            this.mycourses.allCourses().subscribe(course =>{
                this.allCourses = course.json();
            });
        }
    }

    openCourse(courseId) {
        this.router.navigate(['/courses/'+courseId, {id:courseId}]);
    }

    createCourse() {
        this.router.navigate(['/course', {isNewCourse:true,isNewCategory:false}]);
    }

    createCategory() {
        this.router.navigate(['/course', {isNewCourse:false,isNewCategory:true}]);
    }

    getCourseDet(category) {
        this.mycourses.getCategoryDet(category).subscribe(courses => {
            this.allCourses = courses.json()[0];
            this.isByCategory=true;
        })
    }

}
