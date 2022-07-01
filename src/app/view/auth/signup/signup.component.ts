import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { SignupRequestPayload } from "../../../utill/interfaceUtill";
import { AuthService } from "../../../service/auth.service";
import { PropertyService } from "../../../service/property.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {


  signUpRequestPayload: SignupRequestPayload;
  signUpForm!: FormGroup;
  signUpSubscription!: Subscription
  bigValidators!: boolean
  notificationSingUp!: boolean

  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService,
              private propertyService: PropertyService,
  ) {
    this.signUpRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    this.propertyService.getProperty().subscribe(
      data => {
        this.notificationSingUp = data.notificationSingUp
        this.bigValidators = data.bigValidators
      }
    )

    this.signUpForm = new FormGroup({
      username: new FormControl('', this.bigValidators
        ? [Validators.required,
          Validators.pattern('^([A-Za-z0-9]{5,}(\\\\-[a-zA-Z0-9])?)$')
        ] : Validators.required
      ),
      email: new FormControl('', this.notificationSingUp ? [Validators.required, Validators.email] : Validators.required),
      password: new FormControl('', this.bigValidators
        ? [Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
        ] : Validators.required)


    });
  }

  ngOnDestroy(): void {
    if (this.signUpSubscription) {
      this.signUpSubscription.unsubscribe()
    }
  }

  signUp() {

    this.signUpRequestPayload.email = this.signUpForm.get('email')?.value;
    this.signUpRequestPayload.username = this.signUpForm.get('username')?.value;
    this.signUpRequestPayload.password = this.signUpForm.get('password')?.value;

    if (this.signUpRequestPayload.password == "ds#@23SD") {
      this.toastrService.error("fail ds#@23SD");
      return
    }

    this.signUpSubscription = this.authService.signUp(this.signUpRequestPayload)
      .subscribe({
        next: data => {
          this.toastrService.success('success');
          this.router.navigate(['/login'], {queryParams: {registered: 'true'}});
        }, error: error => {
          this.toastrService.error(error.error);
        }
      });
  }

}
