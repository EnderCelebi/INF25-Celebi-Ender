import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComenziService {
  private apiUrl = 'http://localhost:3000/comenzi';

  constructor(private http: HttpClient) {}

  getComenzi(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getComanda(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addComanda(comanda: any): Observable<any> {
    return this.http.post(this.apiUrl, comanda);
  }

  deleteComanda(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
