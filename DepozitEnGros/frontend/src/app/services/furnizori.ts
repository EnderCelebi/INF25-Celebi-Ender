import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FurnizoriService {
  private apiUrl = 'http://localhost:3000/furnizori';

  constructor(private http: HttpClient) {}

  getFurnizori(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addFurnizor(furnizor: any): Observable<any> {
    return this.http.post(this.apiUrl, furnizor);
  }

  deleteFurnizor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateFurnizor(id: number, furnizor: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, furnizor);
  }

}