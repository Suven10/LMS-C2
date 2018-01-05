import { Component,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {isNullOrUndefined} from "util";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    getCookie (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    };

    constructor(public router: Router,public toastr:ToastsManager,vcr: ViewContainerRef){
        let uid = this.getCookie('uid');
        this.toastr.setRootViewContainerRef(vcr);
        if(!isNullOrUndefined(uid)){
            router.navigateByUrl('/home');
        }
    }

    showSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
    }

    showError() {
        this.toastr.error('This is not good!', 'Oops!');
    }

    showWarning() {
        this.toastr.warning('You are being warned.', 'Alert!');
    }
    
    showInfo() {
        this.toastr.info('Just some information for you.');
    }
}
