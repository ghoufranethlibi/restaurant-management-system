import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../core/services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  standalone: true,
  selector: 'app-restaurant-edit',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './restaurant-edit.html'
})
export class RestaurantEditComponent implements OnInit {

  restaurant!: Restaurant;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private service: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(this.id).subscribe({
      next: (data: Restaurant) => this.restaurant = data,
      error: err => console.error(err)
    });
  }
  save(): void {
    this.service.update(this.id, this.restaurant).subscribe({
      next: () => {
        alert('Restaurant modifié avec succès');
        this.router.navigate(['/restaurants']);
      },
      error: err => console.error(err)
    });
  }

}
