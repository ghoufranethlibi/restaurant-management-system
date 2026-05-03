import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { MenuService } from '../../core/services/menu.service';
import { Menu } from '../../models/menu.model';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-menu-add',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './menu-add.html',
  styleUrl: './menu-add.css'
})
export class MenuAddComponent implements OnInit {
  restaurantId!: string;
  menu: Menu = {
    nom: '',
    description: '',
    prix: 0,
    restaurantId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private service: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id')!;
    this.menu.restaurantId = this.restaurantId;
    const id = this.restaurantId;
    if (!id) {
      alert('Aucun restaurant sélectionné');
      this.router.navigate(['']);
      return;
}
  }

  save(): void {
    this.service.addMenu(this.menu).subscribe(() => {
      alert('Menu ajouté avec succès');
      this.service.clearRestaurantId();
      this.router.navigate(['']);
    });
  }
}
