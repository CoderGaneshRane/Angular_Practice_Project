import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedLogin: 'mobile' | 'aadhaar' | null = null;
  mobileNumber: string = '';
  aadhaarNumber: string = '';

  constructor(private toastr:ToastrService){

  }
  selectLogin(method: 'mobile' | 'aadhaar') {
    this.selectedLogin = method;
  }
  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  
  loginWithMobile() {
    if (!this.mobileNumber || this.mobileNumber.length !== 10 || !/^[0-9]{10}$/.test(this.mobileNumber)) {
      this.toastr.warning('Please enter a valid 10-digit mobile number.');
      return;
    }
    console.log('Logging in with Mobile:', this.mobileNumber);
  }

  loginWithAadhaar() {
    if (!this.aadhaarNumber || this.aadhaarNumber.length !== 12 || !/^[0-9]{12}$/.test(this.aadhaarNumber)) {
      this.toastr.warning('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    console.log('Logging in with Aadhaar:', this.aadhaarNumber);
  }
}
