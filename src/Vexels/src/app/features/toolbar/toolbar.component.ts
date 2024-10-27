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
    longitude: new FormControl<number|undefined>(undefined, Validators.required)
  });

  public handleOnFormSubmitted(): void {
    if (this.requestForm.valid) {
      //TODO: fetch api
      var coordinates = this.coordinatesService.getCoordinates();
      this.onNewCoordinates.emit(coordinates);
    }
  }
}
