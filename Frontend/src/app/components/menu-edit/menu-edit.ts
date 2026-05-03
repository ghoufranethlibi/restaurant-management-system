import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router ,RouterModule } from '@angular/router';
import { MenuService } from '../../core/services/menu.service';
import { Menu } from '../../models/menu.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-menu-edit',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './menu-edit.html',
  styleUrl: './menu-edit.css'
})
export class MenuEditComponent implements OnInit {

  menu!: Menu;
  menuId!: string;

  constructor(
    private service: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.menuId = this.route.snapshot.paramMap.get('id')!;
    this.loadMenu();
  }

  loadMenu(): void {
    this.service.getById(this.menuId).subscribe({
      next: (data: Menu) => {this.menu = data;
        this.cdr.detectChanges();},
      error: (err: any) => console.error(err)
    });
  }

  save(): void {
    this.service.update(this.menuId, this.menu).subscribe({
      next: () => {
        this.router.navigate(['/restaurants', this.menu.restaurantId]);
      },
      error: (err: any) => console.error(err)
    });
  }
}


