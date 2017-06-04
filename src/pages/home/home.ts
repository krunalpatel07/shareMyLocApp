import {Component, OnInit} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import { GeoCodeService } from "./geocode.service";


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

  constructor(public toastCtrl: ToastController,
              private geolocation: Geolocation,
              private nativeGeoCoder: NativeGeocoder,
              private socialSharing: SocialSharing,
              private geocode: GeoCodeService) {
  }

  ngOnInit(){
    this.geolocation.getCurrentPosition({ enableHighAccuracy : true }).then((resp) => {
      this.userInfo.latitude = resp.coords.latitude;
      this.userInfo.longitude = resp.coords.longitude;
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      console.log(resp.coords);
     /* this.geocode.getAddress(resp.coords.latitude,resp.coords.longitude).subscribe((data)=>{
        if(data.results[0].formatted_address !== undefined){
          this.userInfo.address = data.results[0].formatted_address;
        }
        console.log(data);
      }); */
      this.nativeGeoCoder.reverseGeocode(this.userInfo.latitude,this.userInfo.longitude).then((result:NativeGeocoderReverseResult) => {
        this.userInfo.houseNumber = result.houseNumber;
        this.userInfo.street = result.street;
        this.userInfo.city = result.city;
        this.userInfo.postalCode = result.postalCode;
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
    let googleMapsLink = 'http://maps.google.com/?saddr=My+Location&daddr='+this.userInfo.latitude+','+this.userInfo.longitude;
    let appleMapsLink = 'http://maps.apple.com/maps?saddr=Current%20Location&daddr='+this.userInfo.latitude+','+this.userInfo.longitude;
    let houseNumber = typeof(this.userInfo.houseNumber) !== 'undefined' ? this.userInfo.houseNumber : '';
    let street = typeof(this.userInfo.street) !== 'undefined' ? this.userInfo.street : '';
    let city = typeof(this.userInfo.city) !== 'undefined' ? this.userInfo.city : '';
    let postalCode = typeof(this.userInfo.postalCode) !== 'undefined' ? this.userInfo.postalCode : '';
    let locTemplate: string = `My Location is: ` + houseNumber + ' ' + street + ' ' + city + ' ' + postalCode + ` 

` + 'Google Maps Link :' + googleMapsLink + `

` + 'Apple Maps Link :' + appleMapsLink + `

` + 'Other Information:' + `
` + 'Latitude :' + this.userInfo.latitude + `
` + 'Longitude :' + this.userInfo.longitude;
    this.socialSharing.share(locTemplate,null,null,null);
  }
}
