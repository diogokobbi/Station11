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
    polylineFile: new FormControl<File|undefined>(undefined)
  });

  public handleOnFormSubmitted(): void {    
    console.log('requestForm', this.requestForm);
    if (this.requestForm.valid) {
      const request: components["schemas"]["CoordinatesRequest"] = {
        point: {
          x: this.requestForm.get('latitude')?.value,
          y: this.requestForm.get('longitude')?.value
        },
        polylineFile: this.requestForm.get('polylineFile')?.value
      };
      this.coordinatesService.getCoordinates(request)
        .subscribe({
          next: (coordinates: components["schemas"]["Coordinates"]) => {            
            if (this.coordinatesService.coordinatesAreValid(coordinates)) {
              this.onNewCoordinates.emit(coordinates);
            } else {
              //TODO: toast notification
            }
          },
          error: (error: any) => {
            console.error(error);
            //TODO: toast notification
          }
        });      
    } else {
      //TODO: toast notification
    }
  }

  public handleFileUpload(event: any): void {
    event.target.files[0].text().then((text: string) => {
      this.requestForm.get('polylineFile')?.setValue(text);
    });
  }
}
