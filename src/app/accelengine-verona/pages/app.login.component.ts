import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// Models
import { Application } from '@app/accelengine-std/models/application.model';

// Services
import { AccountService } from '@core/services/account.service';
import { AuthenticationService } from '@core/services/authentication.service';
import { AuthenticationSOAPService } from '@core/services/authentication.soap.service';
import { StorageService } from '@core/services/storage.service';

// Helpers
import { APP_CONFIG } from '@app/app.config';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.scss'],
})
export class AppLoginComponent implements OnInit {

  public application: Application;
  public brandText: any;
  public brandDescription: any;
  public isSubmitted = false;
  public auth_ko: string
  public spin: string = 'fa fa-sign-in';

  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private authenticationSOAPService: AuthenticationSOAPService,
    private translateService: TranslateService,
    private accountService: AccountService) {
  }

  ngOnInit() {

    this.application = this.storageService.getCurentApp();
    if (this.application != null) {

      this.authenticationService.logout(false);
      this.brandText = this.application.name;
      this.brandDescription = this.application.description + ' - V' + this.application.version;
      this.titleService.setTitle(this.application.name + ' - ' + this.application.version);

    } else {
      this.brandText = 'Problème de connexion';
      this.brandDescription = 'Le serveur d\'application ne répond pas ! contactez l\'administrateur de votre domaine pour obtenir de l\'aide';
      this.titleService.setTitle('Problème de connexion');
    }

    // Translate
    this.translateService.get('messages.auth_ko').subscribe((result: string) => {
      this.auth_ko = result;
    });

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    }, {
      //validator: MustMatch('password', 'confirmPassword')
    });
    // get return url from route parameters or default to '/'
    let url = (this.route.snapshot.queryParams['returnUrl'] !== '/') ? this.route.snapshot.queryParams['returnUrl'] : APP_CONFIG.app.loggedRedirectPage;
    this.returnUrl = url || '/';

  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    this.spin = 'fa fa-refresh';

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.spin = 'fa fa-sign-in';
      return;
    }

    if (APP_CONFIG.QADBackend) {
      this.authenticationSOAPService.login(this.f.username.value, this.f.password.value).subscribe(
        data => {
          this.isSubmitted = false;
          this.spin = 'fa fa-sign-in';
          if (data) {
            this.router.navigate([decodeURIComponent(this.returnUrl)]);
          }
        },
        error => {
          this.isSubmitted = false;
          this.authenticationService.logout(true);
        });
    } else {
      this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(
        data => {
          this.isSubmitted = false;
          this.spin = 'fa fa-sign-in';
          if (data) {
            this.accountService.getAccountBylogin(this.f.username.value).subscribe();
            this.router.navigate([decodeURIComponent(this.returnUrl)]);
          }
        },
        error => {
          this.isSubmitted = false;
          this.authenticationService.logout(true);
        });
    }

  }
}
