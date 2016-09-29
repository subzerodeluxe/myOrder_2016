import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthData {
  // Declare de variables 
  public fireAuth: any;
  public userProfile: any;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('tables/userProfile');
  }

   // login function, verwacht email en wachtwoord 
  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  // registreer functie 
  signupUser(email: string, password: string, username: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
        // na aanmaken user profiel, creer een node in Firebase 
        this.userProfile.child(authenticatedUser.uid).set({
          email: email,
          username: username
        });
      });
    });
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.fireAuth.signOut();
  }
} // einde van AuthData class