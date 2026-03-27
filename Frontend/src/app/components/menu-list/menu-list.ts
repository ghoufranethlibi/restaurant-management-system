import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuService } from '../../core/services/menu.service';
import { Menu } from '../../models/menu.model';

@Component({
  standalone: true,
  selector: 'app-menu-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-list.html',
  styleUrls: ['./menu-list.css']
})
export class MenuListComponent implements OnInit {
  menus: Menu[] = [];
  restaurantId!: string;

  constructor(private service: MenuService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params['id'];
    this.load();
  }

  load(): void {
    this.service.getByRestaurant(this.restaurantId).subscribe({
      next: (data: Menu[]) => {
        this.menus = data;
      },
      error: (err) => console.error(err)
    });
  }

  delete(id: string): void {
    if (!confirm('Supprimer ce menu ?')) return;

    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }
}
