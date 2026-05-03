import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router , RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../core/services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';
import {MatButtonModule} from '@angular/material/button';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-restaurant-add',
  imports: [CommonModule, FormsModule,NgbModule, RouterModule,MatButtonModule],
  templateUrl: './restaurant-add.html',
  styleUrl: './restaurant-add.css'
})
export class RestaurantAddComponent {

  restaurant: Restaurant = {
    nom: '',
    adresse: '',
    telephone: ''
  };

  selectedFile!: File;
  previewUrl: any;

  constructor(
    private service: RestaurantService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Preview image
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  save() {
    const formData = new FormData();

    formData.append('nom', this.restaurant.nom || '');
    formData.append('adresse', this.restaurant.adresse || '');
    formData.append('telephone', this.restaurant.telephone || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.service.addWithImage(formData).subscribe(() => {
      alert('Restaurant ajouté avec succès');
      this.router.navigate(['/restaurants']);
    });
  }

}

