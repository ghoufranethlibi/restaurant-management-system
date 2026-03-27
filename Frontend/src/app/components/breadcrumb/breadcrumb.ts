import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- obligatoire pour *ngFor et routerLink
  template: `
    <nav class="breadcrumb">
      <ng-container *ngFor="let crumb of breadcrumbs; let last = last">
        <a *ngIf="!last" [routerLink]="crumb.url">{{ crumb.label }}</a>
        <span *ngIf="last">{{ crumb.label }}</span>
        <span *ngIf="!last"> > </span>
      </ng-container>
    </nav>
  `,
  /*styleUrls: ['./breadcrumb.component.css']*/
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.route.root);
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: { label: string; url: string }[] = []): { label: string; url: string }[] {
    const children = route.children;
    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
        breadcrumbs.push({ label: this.formatLabel(routeURL), url });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  private formatLabel(str: string) {
    return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}
