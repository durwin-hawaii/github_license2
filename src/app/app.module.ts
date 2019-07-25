import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubComponent} from './github/github.component';
import { FormBuilder } from '@angular/forms'
import { GithubService } from './github/github.service';


@NgModule({
  
  declarations: [
    AppComponent,
    GithubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [FormBuilder, HttpClientModule, GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
