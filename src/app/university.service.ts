import {Http, Headers, Response, URLSearchParams, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { University } from './University';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UniversityService{

    universityCreateUrl:"http://localhost/MyProject/uni_service.php?";
    constructor(private http:Http){

    }

    createUniversity(uni:University):Observable<number>{
        let cpHeaders=new Headers({'Content-type':'application/json'});
        let options=new RequestOptions({headers:cpHeaders});
        return this.http.post(this.universityCreateUrl,uni,options)
                        .map(success=>success.status);
                        

    }
}