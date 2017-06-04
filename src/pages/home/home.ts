import {Component, OnInit} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  userInfo: any = {};
  errToastOptions = {
    message : 'Location Service Denied. Please Allow Location Service.',
    duration : 5000,
    position : 'top'
  };

  constructor(public toastCtrl: ToastController, private geolocation: Geolocation, private nativeGeoCoder: NativeGeocoder,private socialSharing: SocialSharing) {

  }

  ngOnInit(){
    this.geolocation.getCurrentPosition({ enableHighAccuracy : true }).then((resp) => {
      this.userInfo.latitude = resp.coords.latitude;
      this.userInfo.longitude = resp.coords.longitude;
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      console.log(resp.coords);
      this.nativeGeoCoder.reverseGeocode(this.userInfo.latitude,this.userInfo.longitude).then((result:NativeGeocoderReverseResult) => {
        this.userInfo.houseNumber = result.houseNumber;
        this.userInfo.street = result.street;
        this.userInfo.city = result.city;
        console.log("result" + JSON.stringify(result));
      })
    }).catch((error) => {
      if(error.code == '1' || error.code == '2'){
        let errorToast = this.toastCtrl.create(this.errToastOptions);
        errorToast.present();
      }
    });
  }

  handleShareMyLocBtnClick(){
    console.log('inside click');
    let googleMapsLink = 'http://maps.google.com/?saddr=My+Location&daddr=43.12345,-76.12345';
 //   googleMapsLink = googleMapsLink.replace( /(http:\/\/[^\s]+)/gi , '<a href="$1">$1</a>' );
    let locTemplate: string = `My Location is: ` + this.userInfo.houseNumber + ' ' + this.userInfo.street + ' ' + this.userInfo.city + ` 

` + 'Google Maps Link :' + googleMapsLink ;
    this.socialSharing.share(locTemplate,null,null,null);
  }
}
