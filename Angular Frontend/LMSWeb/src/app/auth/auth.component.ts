import { TopnavComponent } from './../topnav/topnav.component';
import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {AuthService} from "./auth.service";
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import {Profile} from "./auth.model";
import {Http,Request,Response,Headers, RequestOptions} from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {IMyOptions, IMyInputFieldChanged} from 'angular4-datepicker/src/my-date-picker/interfaces';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    providers:[TopnavComponent]
})
export class AuthComponent implements OnInit {
    isNewUser = false;
    profile=new Profile();
    isAuthSuccess;
    isValidFormSubmitted=false;
    isLoginValid=true;
    authDetails = {
        email   : '',
        password: '',
        confirmPassword:'',
        firstName   : '',
        lastName   : '',
        streetAddress:'',
        city :'',
        country:'',
        postalCode:'',
        type    : '',
        dob:{ date: { year: 2018, month: 10, day: 9 } },
        gender:'',
        ssn:'',
        phone:'',
        isStudent:false,
        isInstructor:false
    };

    public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
      };
    
      // Initialized to specific date (09.10.2018).
      //public model: any = { date: { year: 2018, month: 10, day: 9 } };
      private selector: number = 0;

    constructor(private authUser: AuthService, private router: Router,public toastr:ToastsManager,vcr: ViewContainerRef,public topnav:TopnavComponent) {
        this.toastr.setRootViewContainerRef(vcr);
    };

    ngOnInit() {
    }

    switchSignUpIn(){
        this.isNewUser = !this.isNewUser;
    }

    callSignUp(form: NgForm) {
       
        this.mapProfileData(this.authDetails);
        this.isValidFormSubmitted = false;
        if(form.invalid){
           return;	
        }
        this.authUser.signUp(this.profile).subscribe(data=>{
            this.isAuthSuccess=data.json();
            if(this.isAuthSuccess.error=="00000"){
                //document.cookie ='uid='+ this.isAuthSuccess.guProfileId;
                this.router.navigate(['/auth',{"isSignUp":true}]);
            }
        });
        
        
    }

    mapProfileData(authDet){
        this.profile.gender=authDet.gender;
        this.profile.dob=authDet.dob.formatted;
        this.profile.address=authDet.streetAddress+','+authDet.city+','+authDet.country+','+authDet.postalCode;
        this.profile.email=authDet.email;
        this.profile.firstName=authDet.firstName;
        this.profile.lastName=authDet.lastName;
        this.profile.isInstructor=authDet.isInstructor;
        this.profile.isStudent=authDet.isStudent;
        this.profile.password=authDet.password;
        this.profile.ssn=authDet.ssn;
        this.profile.username=authDet.firstName;
        this.profile.phone=authDet.phone;
    }

    mapLoginData(authDet){
        this.profile.password=authDet.password;
        this.profile.username=authDet.firstName;
    }

    callSignIn(form :NgForm) {
        this.isLoginValid = false;
        if(form.invalid){
           return;	
        }
        this.mapLoginData(this.authDetails);
        this.isAuthSuccess = this.authUser.signIn(this.profile).subscribe(data=>{
            this.isAuthSuccess=data.json();
            if(this.isAuthSuccess.status){
                document.cookie = 'uid='+ this.isAuthSuccess.profile[0].guProfileId;
                document.cookie = 'isInstructor='+ this.isAuthSuccess.profile[0].isInstructor;
                document.cookie = 'isStudent='+ this.isAuthSuccess.profile[0].isStudent;
                this.topnav.changeState();
                this.router.navigateByUrl('/home');
                this.showSuccess();
            }
            else
            {
                this.showError();
                return;
            }
        });
    }

    

    showSuccess() {
        this.toastr.success('Welcome onboard', 'Success!',{toastLife: 5000, showCloseButton: false});
    }

    showError() {
        this.toastr.error('Error while sign in!', 'Oops!');
    }

    showWarning() {
        this.toastr.warning('You are being warned.', 'Alert!');
    }
    
    showInfo() {
        this.toastr.info('Just some information for you.');
    }

    

}
