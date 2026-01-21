import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduseService {
  private apiUrl = 'http://localhost:3000/produse';

  constructor(private http: HttpClient) {}

  getProduse(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addProdus(produs: any): Observable<any> {
    return this.http.post(this.apiUrl, produs);
  }

  updateProdus(id: number, produs: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, produs);
  }

  deleteProdus(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
