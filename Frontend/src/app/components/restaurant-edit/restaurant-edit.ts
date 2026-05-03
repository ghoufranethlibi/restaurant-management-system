import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../core/services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  standalone: true,
  selector: 'app-restaurant-edit',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './restaurant-edit.html',
  styleUrl: './restaurant-edit.css'
})
export class RestaurantEditComponent implements OnInit {

  restaurant!: Restaurant;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private service: RestaurantService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(this.id).subscribe({
      next: (data: Restaurant) => {
        this.restaurant = data;
        this.cdr.detectChanges();
      },
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
