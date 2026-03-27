import { Component } from '@angular/core';
import { RouterOutlet,RouterModule  } from '@angular/router';
import { SideBar } from './components/side-bar/side-bar';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,SideBar,BreadcrumbComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],

})
export class AppComponent {}
