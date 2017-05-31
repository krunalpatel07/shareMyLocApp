import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  userInfo: any = {};

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  ngOnInit(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userInfo.latitude = resp.coords.latitude;
      this.userInfo.longitude = resp.coords.longitude;
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      console.log(resp.coords);
    }).catch((error) => {
      console.log(error);
    });
  }
}
