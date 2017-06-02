import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  userInfo: any = {};

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private nativeGeoCoder: NativeGeocoder) {

  }

  ngOnInit(){
    this.geolocation.getCurrentPosition({ enableHighAccuracy : true }).then((resp) => {
      this.userInfo.latitude = resp.coords.latitude;
      this.userInfo.longitude = resp.coords.longitude;
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      console.log(resp.coords);
  /*    this.nativeGeoCoder.reverseGeocode(this.userInfo.latitude,this.userInfo.longitude).then((result:NativeGeocoderReverseResult) => {
        this.userInfo.houseNumber = result.houseNumber;
        this.userInfo.street = result.street;
        this.userInfo.city = result.city;
        console.log("result" + JSON.stringify(result));
      }) */
    })/*.then(() => {
      this.nativeGeoCoder.reverseGeocode(this.userInfo.latitude,this.userInfo.longitude).then((result:NativeGeocoderReverseResult) => {
        console.log(result);
      })
    })*/.catch((error) => {
      console.log("error" + error.code);
      console.log("error" + error.message);
      this.nativeGeoCoder.reverseGeocode(33.635962899999996,-112.1170974).then((result:NativeGeocoderReverseResult) => {
        console.log("result" + JSON.stringify(result));
        this.userInfo.houseNumber = result.houseNumber;
        this.userInfo.street = result.street;
        this.userInfo.city = result.city;
      })
    });
  }
}
