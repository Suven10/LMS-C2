import {Component, OnInit, Injectable,ChangeDetectorRef} from '@angular/core';
import {MycoursesService} from "../mycourses.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Http,Request,Response,Headers, RequestOptions} from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {CommonService} from "../../common.service";

@Component({
    selector: 'app-individualcourse',
    templateUrl: 'individualcourse.component.html',
    styleUrls: ['individualcourse.component.css']
})

@Injectable()
export class IndividualCourseComponent implements OnInit {
    courseDetails;
    enrolledCourses=[];
    enrolledRes;
    enrolledResult;
    enrollRes;
    isEnrolled=false;
    accountId:string;
    isInstructor:boolean;
    isStudent:boolean;
    isShowSubscribe:boolean;
    subscription:{
        guProfileId:string,
        guCourseId: string,
        moduleCount: 0,
        desc: string
    }

    constructor(private courses: MycoursesService, private aroute: ActivatedRoute,private toastr:ToastsManager,private common:CommonService,private router:Router,private chdet:ChangeDetectorRef) {
        // debugger;
        this.accountId=this.common.readCookieData("uid");
        this.isInstructor=(this.common.readCookieData("isInstructor")=="0")?false:true;
        this.isStudent=(this.common.readCookieData("isStudent")=="0")?false:true;
        if(this.accountId==undefined || this.accountId=="")
        {
            this.router.navigateByUrl('/auth');
        }
        let courseId = this.aroute.snapshot.params['course'];
        if(courseId != undefined){

            this.courses.getEnrolledCourse(this.accountId).subscribe(data=>{
                this.enrolledRes=data.json();
                // debugger;
                if(this.enrolledRes.error=="00000"){
                    this.enrolledResult=this.enrolledRes.result;
                    this.enrolledResult.forEach(courseDet => {
                        courseDet.CourseDetails[0].moduleFinished=0;
                      this.enrolledCourses.push(courseDet.CourseDetails[0]);
                    });
                    this.isEnrolled=this.enrolledCourses.find(x=>x.guCourseId==courseId)?false:true;
                }
            });
        
            this.courses.getCourseDet(courseId).subscribe(data=>{
                let course = data.json();
                this.courseDetails = course[0];
                this.courseDetails.moduleFinished=0;
            });
        }
    }

    ngOnInit() {
    }

    enrollCourse(){
        this.accountId=this.common.readCookieData("uid");
        debugger;
        if(this.accountId!=undefined && this.accountId!=""){
            this.mapSubscriptionData(this.courseDetails);
            this.courses.subscribeCourse(this.subscription).subscribe(data=>{
                this.enrollRes=data.json();
                if(this.enrollRes.error=="00000"){
                this.showSuccess("Course has been successfully enrolled!");
                //this.isEnrolled=true;
                }
                else{
                this.showError("Error while enrolling course!");
                }
            });
        }
        else{
            this.showError("Please sign in to enroll");
        }
    }

    mapSubscriptionData(subscriptionData){
        this.subscription={
            guProfileId:this.accountId,
            guCourseId:subscriptionData.guCourseId,
            moduleCount:0,
            desc:''
        }
        // this.subscription.guProfileId=this.accountId;
        // this.subscription.guCourseId=subscriptionData.guCourseId;
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

}
