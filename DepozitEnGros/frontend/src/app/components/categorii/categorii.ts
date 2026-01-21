import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriiService } from '../../services/categorii';

@Component({
  selector: 'app-categorii',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorii.html',
  styleUrls: ['./categorii.css']
})
export class CategoriiComponent implements OnInit {

  categorii: any[] = [];
  numeNou: string = '';
  eroareForm: string = '';

  constructor(
    private categoriiService: CategoriiService,
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit(): void {
    this.getCategorii();
  }

  getCategorii(): void {
    this.categoriiService.getCategorii().subscribe(data => {
      this.categorii = data;
      this.cdr.detectChanges();   
    });
  }

  adaugaCategorie(): void {
    this.eroareForm = '';

    if (!this.numeNou || this.numeNou.trim().length === 0) {
      this.eroareForm = 'Introduceti un nume pentru categorie.';
      return;
    }

    this.categoriiService.addCategorie({ nume: this.numeNou }).subscribe(() => {
      alert('Categoria a fost adaugata cu succes.');
      this.numeNou = '';
      this.getCategorii();
    });
  }

  stergeCategorie(id: number): void {
    const ok = confirm('Sigur doriti sa stergeti aceasta categorie?');
    if (!ok) return;

    this.categoriiService.deleteCategorie(id).subscribe(() => {
      alert('Categoria a fost stearsa.');
      this.getCategorii();
    });
  }
}
