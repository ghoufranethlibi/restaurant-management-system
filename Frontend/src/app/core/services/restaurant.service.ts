import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';

@Injectable({
  providedIn: 'root' // ✅ OBLIGATOIRE
})
export class RestaurantService {

  private apiUrl = 'http://localhost:8083/api/restaurants';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  getById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  add(restaurant: Restaurant): Observable<string> {
    return this.http.post(this.apiUrl, restaurant, { responseType: 'text' });
  }
addWithImage(data: FormData) {
  return this.http.post<Restaurant>(
    'http://localhost:8083/api/restaurants/upload',
    data
  );
}

  update(id: string, restaurant: Restaurant): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, restaurant, { responseType: 'text' });
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  softDelete(id: string): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}/soft/${id}`,{});
  }
  getSoft(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/soft`);
  }
restore(id: string): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/restore/${id}`, {});
}


}
