import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import * as firebase from 'firebase';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

      // zet Firebase credentials klaar 
      var config = {
        apiKey: "AIzaSyCdimKathflXBR9gXRR1ZrhuohSC_p_AP4",
        authDomain: "myorderv2.firebaseapp.com",
        databaseURL: "https://myorderv2.firebaseio.com",
        storageBucket: "myorderv2.appspot.com",
        messagingSenderId: "1011967696896"
      };
  
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        // Als er een user is, stuur door naar homepage 
          this.rootPage = HomePage;
        } else {
          // Zo niet, dan naar login 
          this.rootPage = LoginPage;
          }
      });

  } // einde van constructor 
} // einde van myApp class

ionicBootstrap(MyApp);
