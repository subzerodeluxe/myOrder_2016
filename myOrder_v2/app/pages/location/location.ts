import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data/auth-data';
import { LoginPage } from '../login/login';
import { Geolocation } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/location/location.html',
  providers: [AuthData] // voeg dependency toe 
})
export class LocationPage {

  constructor(public navCtrl: NavController, public authData: AuthData) {
        Geolocation.getCurrentPosition().then((position) => {
          var lat = position.coords.latitude;
          var long = position.coords.longitude; 

          console.log("Latitude is: " + lat);
          console.log("Longitude is: " + long);

        //var geocoder = new google.maps.Geocoder(); 
      });
  }
      
      logOut() {
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
      });
  }
}
