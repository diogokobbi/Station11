import { Injectable } from '@angular/core';
import { components } from '../interfaces/wayfinder-sdk';
@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  constructor() { }

  getCoordinates(): components["schemas"]["Coordinates"] {
    return this._mockCoordinates();
  }

  coordinatesAreValid(coordinates: components["schemas"]["Coordinates"]): boolean {
    return coordinates !== null 
            && coordinates.polyline !== null 
            && coordinates.point !== null 
            && coordinates.location !== null;
  }

  private _mockCoordinates(): components["schemas"]["Coordinates"] {
    return {
      point: {
        x: -22.412260,
        y: -42.966400,
        magnitude: 0
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
}
