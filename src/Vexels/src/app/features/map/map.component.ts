import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";
import { Loader } from "@googlemaps/js-api-loader";
import { components } from '../../interfaces/wayfinder-sdk';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnChanges {

  @Input() coordinates: components['schemas']['Coordinates'] | undefined;

  public map: google.maps.Map | undefined;
  public center: any = { lat: 0, lng: 0 };
  public pointMarker: any = undefined;
  public locationMarker: any = undefined;
  public options: google.maps.MapOptions = {
    mapId: "map",
    zoom: 10,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && this.coordinatesAreValid()) {
      this.renderCoordinates();
    }
  }

  private renderCoordinates() {
    if (this.coordinates) {
      //Add point and set as map center
      if (this.coordinates?.point?.x && this.coordinates?.point?.y) {
        const markerPosition = { lat: this.coordinates?.point?.x, lng: this.coordinates?.point?.y };
        this.pointMarker = new google.maps.Marker({ position: markerPosition, title: 'Point', map: this.map }); 
        this.map?.setCenter(markerPosition);
      }
      if (this.coordinates?.location?.x && this.coordinates?.location?.y) {
        const locationPosition = { lat: this.coordinates?.location?.x, lng: this.coordinates?.location?.y };
        this.locationMarker = new google.maps.Marker({ position: locationPosition, title: 'Location', map: this.map }); 
      }
      
      //Add polyline
      const polylinePath: any[] = [];
      this.coordinates?.polyline?.forEach((point) => {
        if (point.x && point.y)
          polylinePath.push({ lat: point.x, lng: point.y});
      });
      const polyline = new google.maps.Polyline({
        path: polylinePath,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      polyline.setMap(this.map!);
    }
  }

  private coordinatesAreValid() {
    return this.coordinates && this.coordinates.polyline && this.coordinates.point && this.coordinates.location;
  }
  
  handleMapInitialized(map: google.maps.Map) {
    this.map = map;
    if (this.map && this.coordinatesAreValid()) {
      this.renderCoordinates();
    }
  }
}
