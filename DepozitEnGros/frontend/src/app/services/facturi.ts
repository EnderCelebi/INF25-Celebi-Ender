import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturiService {
  private apiUrl = 'http://localhost:3000/facturi';

  constructor(private http: HttpClient) {}

  getFacturi(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addFactura(factura: any): Observable<any> {
    return this.http.post(this.apiUrl, factura);
  }

  updateFactura(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteFactura(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
