import { Injectable } from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import * as tt from "@tomtom-international/web-sdk-maps";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public key : string = "AzhrmszmMRVqjdEvr043KGbFiuK4n285";
  constructor() { }


  public getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  public centerMapAroundLocation(map : tt.Map): void {


    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    this.getCurrentPosition()
      .subscribe((position: any) => {
        map.jumpTo({
          center: {
            lat: position.latitude,
            lng: position.longitude,
          },
          zoom: 15,
        });

      // this.createMarker(position,map,"You Are Here")
      });
  }

  public createMarker(position:any,map:tt.Map,message:string){
    const popup = new tt.Popup({ anchor: 'bottom', offset: { bottom: [0, -40] } }).setHTML(message);

    var marker = new tt.Marker().setLngLat({
      lat: position.latitude,
      lng: position.longitude,
    }).addTo(map);
    marker.setPopup(popup).togglePopup();
  }

  public setMarker(longitude:number, latitude:number,map:tt.Map) : tt.Marker {
      return  new tt.Marker().setLngLat([longitude, latitude]).addTo(map);
  }


}
