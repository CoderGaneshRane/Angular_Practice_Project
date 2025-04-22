import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedLogin: 'mobile' | 'aadhaar' | null = null;
  mobileNumber: string = '';
  aadhaarNumber: string = '';

  selectLogin(method: 'mobile' | 'aadhaar') {
    this.selectedLogin = method;
  }

  loginWithMobile() {
    console.log('Logging in with Mobile:', this.mobileNumber);
  }

  loginWithAadhaar() {
    console.log('Logging in with Aadhaar:', this.aadhaarNumber);
  }
}
