import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,ActivatedRoute,RouterModule  } from '@angular/router';
import { RestaurantService } from '../../core/services/restaurant.service';
import { MenuService } from '../../core/services/menu.service';
import { Restaurant } from '../../models/restaurant.model';
import { HttpErrorResponse } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule,MatButtonModule,MatIconModule],
  templateUrl: './restaurant-detail.html',
  styleUrls: ['./restaurant-detail.css']
})
export class RestaurantDetailComponent implements OnInit {

  restaurant!: Restaurant;
  restaurantId!: string;
  constructor(
    private route: ActivatedRoute,
    private service: RestaurantService,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.restaurantId=id;
    this.service.getById(id).subscribe({
      next: (data: Restaurant) => {
        this.restaurant = data;
        this.cdr.detectChanges();
      }
    });
   this.loadRestaurant();
  }
loadRestaurant(): void {
  this.service.getById(this.restaurantId).subscribe({
    next: (data: Restaurant) => {
      this.restaurant = data;
      this.cdr.detectChanges();
    },
    error: err => console.error(err)
  });
}

addMenu(): void {

  this.router.navigate(['/restaurants',this.restaurantId,'menus','add']);
}

  deleteMenu(menuId: string): void {
    if (!confirm('Voulez-vous vraiment supprimer ce menu ?')) return;

    this.menuService.delete(menuId).subscribe({
      next: () => {
        // Mettre à jour localement la liste des menus
        this.restaurant.menu = this.restaurant.menu?.filter(m => m.id !== menuId);
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => console.error('Erreur lors de la suppression du menu', err)
    });
  }
editPlat(menuId: string) {
  this.router.navigate(['/menus/edit',menuId]);
}

}
