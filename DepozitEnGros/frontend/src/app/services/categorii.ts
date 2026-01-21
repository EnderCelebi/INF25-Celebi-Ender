import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriiService {
  private apiUrl = 'http://localhost:3000/categorii';

  constructor(private http: HttpClient) {}

  getCategorii(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addCategorie(categorie: any): Observable<any> {
    return this.http.post(this.apiUrl, categorie);
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
