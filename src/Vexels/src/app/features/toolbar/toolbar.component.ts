import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoordinatesService } from '../../services/coordinates.service';
import { components } from '../../interfaces/wayfinder-sdk';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, Toast],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  @Output() public onNewCoordinates: EventEmitter<components["schemas"]["Coordinates"]> = new EventEmitter<components["schemas"]["Coordinates"]>();

  constructor(private coordinatesService: CoordinatesService, private toastr: ToastrService) {
        
  }

  public requestForm: FormGroup = new FormGroup({
    latitude: new FormControl<number|undefined>(undefined, Validators.required),
    longitude: new FormControl<number|undefined>(undefined, Validators.required),
    polylineFile: new FormControl<File|undefined>(undefined, Validators.required)
  });

  public handleOnFormSubmitted(): void {    
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
              this.toastr.error('Dados inválidos', '', { timeOut: 3000 });
            }
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Falha ao calcular coordenadas. Verifique se o arquivo é válido.', '', { timeOut: 3000 });
          }
        });      
    } else {
      this.requestForm.markAllAsTouched();
    }
  }

  public handleFileUpload(event: any): void {
    event.target.files[0].text().then((text: string) => {
      this.requestForm.get('polylineFile')?.setValue(text);
    });
  }
}
