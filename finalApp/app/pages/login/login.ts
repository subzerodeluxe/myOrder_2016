import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { LocationPage } from '../location/location'

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData] // voeg dependency toe 
})

export class LoginPage {
  public loginForm: any;

  constructor(public nav: NavController, public authData: AuthData, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder) {
    
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  } // einde van constructor 

  loginUser() {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.nav.setRoot(LocationPage);
        
        let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
        loading.present();

      }, error => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    }
  }

  goToSignup()  {
    this.nav.push(SignupPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

} // einde van LoginPage class