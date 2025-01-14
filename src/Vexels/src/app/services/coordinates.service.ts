import { Injectable } from '@angular/core';
import { components } from '../interfaces/wayfinder-sdk';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  constructor(private http: HttpClient) { }

  mockCoordinates(): any {
    return {
      point: {
        x: -22.412260,
        y: -42.966400
      },
      polyline: [
        { x: -22.906847, y: -43.172897, magnitude: 0 }, 
        { x: -22.509911, y: -43.175480, magnitude: 0 },
        { x: -21.764940, y: -43.348969, magnitude: 0 }, 
        { x: -20.139370, y: -44.886990, magnitude: 0 },
      ],
      location: {
        x: -22.420349,
        y: -43.196453,
        magnitude: 0
      },
      offset: 5,
      station: 15
    };
  }

  getCoordinates(request: components["schemas"]["CoordinatesRequest"]): any {
    //TODO: validate request

    return this.http.post<components["schemas"]["Coordinates"]>(`${environment.apiUrl}/coordinates`, request)
      .pipe(take(1)); 
  }

  coordinatesAreValid(coordinates: components["schemas"]["Coordinates"]): boolean {
    return coordinates !== null 
            && coordinates.polyline !== null 
            && coordinates.point !== null 
            && coordinates.location !== null;
  }

}
