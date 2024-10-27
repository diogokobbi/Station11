import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";
import { Loader } from "@googlemaps/js-api-loader";
import { components } from '../../interfaces/wayfinder-sdk';
import { CoordinatesService } from '../../services/coordinates.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnChanges {

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

  constructor(private readonly coordinatesService: CoordinatesService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && this.coordinates && this.coordinatesService.coordinatesAreValid(this.coordinates)) {
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
      //Add location point
      if (this.coordinates?.location?.x && this.coordinates?.location?.y) {
        const locationPosition = { lat: this.coordinates?.location?.x, lng: this.coordinates?.location?.y };
        this.locationMarker = new google.maps.Marker({ position: locationPosition, title: 'Location', map: this.map }); 
      }
      //Add location infowindow
      if (this.locationMarker) {
        const infowindow = new google.maps.InfoWindow({
          content: `<h6>Location</h6><br><p><strong>Offset</strong>: ${this.coordinates.offset}</p><p><strong>Station</strong>: ${this.coordinates.station}</p>`
        });
        this.locationMarker.addListener('click', () => {
          infowindow.open(this.map, this.locationMarker);
        });
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

  
  handleMapInitialized(map: google.maps.Map) {
    this.map = map;
    if (this.map && this.coordinates && this.coordinatesService.coordinatesAreValid(this.coordinates)) {
      this.renderCoordinates();
    }
  }
}
