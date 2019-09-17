import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
    this.loginForm = new FormGroup({
      'loginUsername': new FormControl(null, Validators.required),
      'loginPassword': new FormControl(null, Validators.required),
    });
  }



  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
        resolve({'emailIsForbidden': true});
        } else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log("Return object created by Angular is below as FormGroup");
    console.log( this.loginForm);
  }


  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://post-request.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  private fetchPosts(){
    this.http.get('https://post-request.firebaseio.com/posts.json')
    .subscribe(posts => {
      console.log(posts);
    });    
  }
}
