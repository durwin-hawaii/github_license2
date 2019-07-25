import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormGroup} from '@angular/forms'
import {GithubService} from './github.service';
import { Organization, IRepository }    from './github';

@Component({
  selector: 'app-hero-form',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent {

  organization = new Organization("", "");
  repositories;
  remaining : number = 60;
  status : number;
  next : string;
  reset : Date = new Date();
  timeout : Boolean = false;
  post_message : string;
  token : string; // example = "Token 1234567890c17479f5416d487bd011be2b557daf";
  
  constructor(private service:GithubService) {
    this.reset.setHours(this.reset.getHours() + 1);
  }


  SearchRepositories(userForm: NgForm) { 
    console.log("SEARCHING FOR " + this.organization.name);
    let url : string = "https://api.github.com/orgs/" + this.organization.name + "/repos";
    this.GetNextPage(url);
  }

  GetNextPage(url : string) {
    this.service.GetNextPage(url)
    .subscribe(
      (response) => {
        this.remaining = parseInt(response.headers.get('x-ratelimit-remaining'));
        if (this.remaining == 0)
          this.timeout = true;
        this.reset =  new Date(parseInt(response.headers.get('x-ratelimit-reset')) * 1000);
        this.status = response.status;

        let now = new Date;
        if (now > this.reset)
          this.timeout = true
        else 
          this.timeout = false;

        let links = response.headers.get('link');
        if (links != null) 
          this.next =  links.split(';').find(x => x.includes('rel="next"')).replace('rel="next",', '').replace('<', '').replace('>', '').replace(' ','') ;

        this.repositories = (response.body);
      }  
    );
    this.post_message = null;
  }   

  RequestLicense(repo:string, ) {
    this.service.PostPullRequest(repo, this.token)
    .subscribe(
      success => this.post_message = "License Request Made",
      error => this.post_message = "Error Requesting License"
    );
  }

}
