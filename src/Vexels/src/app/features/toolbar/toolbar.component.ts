import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoordinatesService } from '../../services/coordinates.service';
import { components } from '../../interfaces/wayfinder-sdk';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  @Output() public onNewCoordinates: EventEmitter<components["schemas"]["Coordinates"]> = new EventEmitter<components["schemas"]["Coordinates"]>();

  constructor(private coordinatesService: CoordinatesService) {
        
  }

  public requestForm: FormGroup = new FormGroup({
    latitude: new FormControl<number|undefined>(undefined, Validators.required),
    longitude: new FormControl<number|undefined>(undefined, Validators.required),
    polylinePoints: new FormControl<File|undefined>(undefined)
  });

  public handleOnFormSubmitted(): void {
    if (this.requestForm.valid) {
      const request: components["schemas"]["CoordinatesRequest"] = {
        //TODO: fill request
      };
      const newCoordinates = this.coordinatesService.getCoordinates(request);
      this.onNewCoordinates.emit(newCoordinates);
      // this.coordinatesService.getCoordinates(request).subscribe((coordinates: components["schemas"]["Coordinates"]) => {
      //   this.onNewCoordinates.emit(coordinates);
      // });      
    }
  }
}
