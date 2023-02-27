import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { ValidationService } from './../../services/validation/validation.service';
import { LocalStorageService } from '../../services/localstorage/localstorage.service'
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { AuthService as SocialAuthService, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: String;
  submitted: boolean = false;
  loginFailed: boolean = false;

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private localStorageService: LocalStorageService,
    public router: Router
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['asif.vora@multiots.com', [Validators.required, this.validationService.emailValidator]],
      password: ['123456', Validators.required]
    });
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        let { authToken } = user;
        let data = {
          ...user,
          isSocial: true,
          role: Role.User
        }
        this.localStorageService.set('token', authToken);
        this.localStorageService.set('user', data);
        this.authService.currentUserSubjectNext(data);
        this.router.navigate(['/']);
      }
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let email = this.loginForm.controls.email.value;
    // let password = this.loginForm.controls.password.value;
    // let user = { email, password }
    let data = {
      email,
      isSocial: false,
      role: Role.Admin
    }
    this.localStorageService.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    this.localStorageService.set('user', data);
    this.authService.currentUserSubjectNext(data);
    this.router.navigate(['/']);
    // this.authService.login(user).subscribe(
    //   (response: any) => {
    //     console.log('response : ', response)
    //     let { token } = response;
    //     let data = {
    //       ...response,
    //       isSocial: false,
    //       role: Role.User
    //     }
    //     this.localStorageService.set('token', token);
    //     this.localStorageService.set('user', data);
    //     this.authService.currentUserSubjectNext(data);
    //     this.router.navigate(['/']);
    //   },
    //   (error: any) => {
    //     this.loginFailed = true;
    //     this.loginError = 'Invalid email or password.';
    //     console.log('error', error)
    //   });
  }

  googleLogin(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
