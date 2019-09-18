import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email],this.forbiddenEmails),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required),
    });
  }

  onSubmit(form:NgForm) {
    console.log("Return object created by Angular is below as FormGroup");
    console.log(form.value);

    
    form.reset();
    
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

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http.get('https://post-request.firebaseio.com/posts.json')
    .subscribe(posts => {
      console.log(posts);
    });    
  }

}
