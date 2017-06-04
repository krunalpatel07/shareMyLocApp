import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class GeoCodeService {
  constructor(private http:Http) {

  }

  getAddress(latitude,longitude){
    let url = this.createUrl(latitude,longitude);
    return this.http.get(url).map((data : Response) => data.json());
  }

  createUrl(latitude,longitude){
    const url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&location_type=ROOFTOP&result_type=street_address&key=AIzaSyBpZGFqnLcpDLyr0XNOUniCom0iap9cHZA";
    console.log(url);
    return url;
  }
}
