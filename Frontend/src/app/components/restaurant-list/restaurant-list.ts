import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RestaurantService } from '../../core/services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';
import { HttpErrorResponse } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  standalone: true,
  selector: 'app-restaurant-list',
  imports: [CommonModule, RouterModule,MatButtonModule,MatCardModule],
  templateUrl: './restaurant-list.html',
  styleUrls: ['./restaurant-list.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  loading = true;

  constructor(
    private service: RestaurantService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe({
      next: (data: Restaurant[]) => {
        this.restaurants = data.filter(r => !r.deleted);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  delete(id: string): void {
    if (!confirm('Supprimer ce restaurant ?')) return;
    this.service.delete(id).subscribe(() => this.load());
  }

  softDelete(id: string): void {
    if (!confirm('Cacher ce restaurant ?')) return;
    this.service.softDelete(id).subscribe(() => this.load());
  }

  goToDetail(id: string): void {
    this.router.navigate(['/restaurants', id]);
  }

}
