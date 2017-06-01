import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder} from '@ionic-native/native-geocoder';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  userInfo: any = {};

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private nativeGeoCoder: NativeGeocoder) {

  }

  ngOnInit(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userInfo.latitude = resp.coords.latitude;
      this.userInfo.longitude = resp.coords.longitude;
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      console.log(resp.coords);
    })/*.then(() => {
      this.nativeGeoCoder.reverseGeocode(this.userInfo.latitude,this.userInfo.longitude).then((result:NativeGeocoderReverseResult) => {
        console.log(result);
      })
    })*/.catch((error) => {
      console.log(error);
    });
  }
}
