import { CommonService } from './../common.service';
import { AuthComponent } from './../auth/auth.component';
import { Component, OnInit } from '@angular/core';
import {MycoursesService} from "../mycourses/mycourses.service";
import {Course} from "../mycourses/courses.model";
import {Chapter} from "../mycourses/courses.model";
import {Http,Request,Response,Headers, RequestOptions} from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router, ActivatedRoute} from "@angular/router";
import { Observable } from 'rxjs';
import {AuthService} from "../auth/auth.service"

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
    allCategories;
    accountId;
    hideCourse=false;
    constructor(private common:CommonService,private courses: MycoursesService, private router: Router,private auth:AuthService) { }

    ngOnInit() {
        // this.allCourses =  this.courses.allCourses();
        this.accountId=this.common.readCookieData("uid");
        if(this.accountId==undefined || this.accountId=="")
        {
            this.hideCourse=true;
        }
        else
        {
            this.hideCourse=false;
        }
        this.courses.allCategories().subscribe(data=>{
            this.allCategories = data.json();
        });
    }

    openCourse(categoryId) {
        this.router.navigate(['/categourCourses/'+categoryId, {id:categoryId, type:'categoryCourses'}]);
    }

    reloadCategories(){
        this.courses.allCategories().subscribe(data=>{
            this.allCategories=data.json();
        })
    }

    signOut(){
        this.hideCourse=this.auth.signOut();
        this.router.navigateByUrl('/auth');
    }

    changeState(){
        //this.hideCourse=!this.hideCourse;
        //this.ngOnInit();
        //debugger;
    }

}
