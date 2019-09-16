import { Component } from '@angular/core';
// declare const signupValidation: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'Project1';
  
  onNavigate(feature: string) {
    this.loadedFeature = feature;
    }

    // onLogin(){
    //   signupValidation();
    // }

}
