import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from "./shell/topbar/topbar.component";
import { MapComponent } from "./features/map/map.component";
import { CoordinatesService } from './services/coordinates.service';
import { components } from './interfaces/wayfinder-sdk';
import { ToolbarComponent } from './features/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, ToolbarComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Vexels';
  coordinates: components['schemas']['Coordinates'] | undefined;

  constructor(private readonly coordinatesService: CoordinatesService) {        
  }

  handleNewCoordinates(newCoordinates: components["schemas"]["Coordinates"]) {
    if (this.coordinatesService.coordinatesAreValid(newCoordinates)) {
      this.coordinates = newCoordinates;    
    }
  }
}
