import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../../models/menu.model';

@Injectable({ providedIn: 'root' })
export class MenuService {

  private apiUrl = 'http://localhost:8083/api/plat';
  private restaurantId: string | null = null;

  constructor(private http: HttpClient) {}

  // ====== API ======
  getByRestaurant(restaurantId: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/restaurant/${restaurantId}`);
  }

  getById(id: string): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`);
  }

  addMenu(menu: Menu): Observable<Menu> {
    console.log('Menu envoyé :', menu);
    return this.http.post<Menu>(this.apiUrl, menu);
  }

  update(id: string, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${menu.restaurantId}/${id}`, menu);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



  // ====== CONTEXTE ======
  setRestaurantId(id: string): void {
    this.restaurantId = id;
  }

  getRestaurantId(): string | null {
    return this.restaurantId;
  }

  clearRestaurantId(): void {
    this.restaurantId = null;
  }
}
