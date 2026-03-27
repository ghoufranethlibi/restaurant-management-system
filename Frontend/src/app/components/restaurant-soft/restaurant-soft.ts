import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RestaurantService } from '../../core/services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';
import { RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-restaurant-soft',
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-soft.html'
})
export class RestaurantSoftComponent implements OnInit {

  restaurants: Restaurant[] = [];
  loading = true;

  constructor(
    private service: RestaurantService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;

    this.service.getSoft().subscribe({
      next: (data: Restaurant[]) => {
        console.log('Restaurants cachés:', data);
        this.restaurants = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  delete(id: string): void {
    if (!confirm('Supprimer ce restaurant ?')) return;

    this.service.delete(id).subscribe({
      next: () => this.load(), // ✅ maintenant ça existe
      error: err => console.error(err)
    });
  }
restore(id: string): void {
  if (!confirm('Restaurer ce restaurant ?')) return;

  this.service.restore(id).subscribe({
    next: () => this.load(), // recharge la liste
    error: err => console.error(err)
  });
}

}
