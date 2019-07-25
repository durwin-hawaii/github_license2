import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { IRepository} from './github';
import { Observable } from 'rxjs';
import { PullRequest }    from './github';
import 'rxjs/add/operator/map';



 
@Injectable()

export class GithubService {
    pr = new PullRequest("License Issue","Can you please install a GitHub license for this repository");
    
    constructor(private _http: HttpClient) {       
    }
    
    PostPullRequest(repo : string, auth : string) : Observable<HttpResponse<IRepository[]>>{
        console.log("_____________POSTING LICENSE REQUEST");

        const httpOptions = {
            headers: new HttpHeaders({'Authorization' : auth}),
            observe: 'response' as 'response'
        }
        return this._http.post<IRepository[]>("https://api.github.com/repos/" + repo + "/issues", this.pr, httpOptions);
    }
  
    GetRepositories(url : string) : Observable<HttpResponse<IRepository[]>>{
        const httpOptions = {
            observe: 'response' as 'response'
        }
        return this._http.get<IRepository[]>(url, httpOptions);
    }

    GetNextPage(url: string) : Observable<HttpResponse<IRepository[]>>{
        console.log("_______________GETTING NEXT PAGE");

        const httpOptions = {
            observe: 'response' as 'response'
        }
        return this._http.get<IRepository[]>(url, httpOptions);
    }
} 