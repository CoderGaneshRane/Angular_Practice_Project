import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-home-loan',
  templateUrl: './home-loan.component.html',
  styleUrls: ['./home-loan.component.css']
})
export class HomeLoanComponent {

  emiDetails: any;
  totalCalculation: any;
  showEmiTable: boolean = false;
  page = 1;
  pageSize = 12;

  loanForm: FormGroup = new FormGroup({
    principalAmount: new FormControl('', [Validators.required, Validators.minLength(7)]),
    annualInterest: new FormControl('', Validators.required),
    tenure: new FormControl('', Validators.required),
    isExtraEmi: new FormControl(false),
    isAnnualStepUp: new FormControl(false),
    extraEmi: new FormControl(''),
    stepUpPercent: new FormControl('')
  });

  constructor(private service: ApiService) { }

  onSubmit() {
    let data = {
      "principal": this.loanForm.get('principalAmount')?.value,
      "annualRate": this.loanForm.get('annualInterest')?.value,
      "years": this.loanForm.get('tenure')?.value,
      "allowExtraEmi": this.loanForm.get('isExtraEmi')?.value,
      "extraEmiPerYear": this.loanForm.get('extraEmi')?.value,
      "allowStepUp": this.loanForm.get('isAnnualStepUp')?.value,
      "annualIncrementPercent": this.loanForm.get('stepUpPercent')?.value
    }
    this.service.calculateHomeLoanDetails(data).subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          this.emiDetails = res.data[0]?.monthly_calculation;
          this.totalCalculation = res.data[0]?.total_calculation;
          this.showEmiTable = true;
        }
      }
    })
  }

  clearForm() {
    this.loanForm.reset();
    this.showEmiTable = false;
  }
}
