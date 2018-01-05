import {Injectable} from "@angular/core";
import {Http,Request,Response,Headers, RequestOptions} from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Profile} from "./auth.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AuthService {
    profile:Profile;
    http: Http;
    constructor(http:Http){
        this.http=http;
    }

    private signUpUser (authDetails): Observable<Response> {
        // API call for user Sign Up goes here
        //...
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8012/Ascentic/API/src/Ascentic.ProfileAPI/profile', JSON.stringify(authDetails),options);
    }

    private signInUser (authDetails) :Observable<Response>{
        // API call for user Sign In goes here
        //...
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8012/Ascentic/API/src/Ascentic.AccountAPI/authenticate', JSON.stringify(authDetails),options);
    }

    private callSignOut() :boolean{
        document.cookie = 'uid' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'isInstructor' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'isStudent' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        return true;
    }

    signUp (userobj):Observable<Response> {
        let signUpRes=this.signUpUser(userobj);
        return signUpRes;
    }

    signIn (userobj) :Observable<Response>{
        return this.signInUser(userobj);
    }

    signOut () :boolean{
        return this.callSignOut();
    }

}