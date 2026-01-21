import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProduseService } from '../../services/produse';
import { CategoriiService } from '../../services/categorii';
import { FurnizoriService } from '../../services/furnizori';

@Component({
  selector: 'app-produse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produse.html',
  styleUrls: ['./produse.css']
})
export class ProduseComponent implements OnInit {

  produse: any[] = [];
  categorii: any[] = [];
  furnizori: any[] = [];

  nume: string = '';
  descriere: string = '';
  pretAchizitie: number | null = null;
  pretVanzare: number | null = null;
  stoc: number | null = null;
  idCategorie: number | null = null;
  idFurnizor: number | null = null;

  isEditMode: boolean = false;
  editId: number | null = null;

  eroareForm: string = '';

  constructor(
    private produseService: ProduseService,
    private categoriiService: CategoriiService,
    private furnizoriService: FurnizoriService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.getCategorii();
    this.getFurnizori();
    this.getProduse();
  }

  getProduse(): void {
    this.produseService.getProduse().subscribe(data => {
      this.produse = data;
      this.cdr.detectChanges();    
    });
  }

  getCategorii(): void {
    this.categoriiService.getCategorii().subscribe(data => {
      this.categorii = data;
      this.cdr.detectChanges();
    });
  }

  getFurnizori(): void {
    this.furnizoriService.getFurnizori().subscribe(data => {
      this.furnizori = data;
      this.cdr.detectChanges();
    });
  }

  resetForm(): void {
    this.nume = '';
    this.descriere = '';
    this.pretAchizitie = null;
    this.pretVanzare = null;
    this.stoc = null;
    this.idCategorie = null;
    this.idFurnizor = null;
    this.isEditMode = false;
    this.editId = null;
    this.eroareForm = '';
  }

  adaugaProdus(): void {
    if (!this.valideazaProdus()) return;

    const produs = {
      id_categorie: this.idCategorie,
      id_furnizor: this.idFurnizor,
      nume: this.nume,
      descriere: this.descriere,
      pret_achizitie: this.pretAchizitie,
      pret_vanzare: this.pretVanzare,
      stoc: this.stoc
    };

    this.produseService.addProdus(produs).subscribe(() => {
      this.resetForm();
      this.getProduse();
    });
  }

  selecteazaProdus(p: any): void {
    this.isEditMode = true;
    this.editId = p.id_produs;

    this.idCategorie = p.id_categorie;
    this.idFurnizor = p.id_furnizor;
    this.nume = p.nume;
    this.descriere = p.descriere;
    this.pretAchizitie = p.pret_achizitie;
    this.pretVanzare = p.pret_vanzare;
    this.stoc = p.stoc;
  }

  salveazaEditare(): void {
    if (this.editId === null) return;
    if (!this.valideazaProdus()) return;

    const produs = {
      id_categorie: this.idCategorie,
      id_furnizor: this.idFurnizor,
      nume: this.nume,
      descriere: this.descriere,
      pret_achizitie: this.pretAchizitie,
      pret_vanzare: this.pretVanzare,
      stoc: this.stoc
    };

    this.produseService.updateProdus(this.editId, produs).subscribe(() => {
      this.resetForm();
      this.getProduse();
    });
  }

  stergeProdus(id: number): void {
    if (!confirm('Sigur doresti sa stergi acest produs?')) return;

    this.produseService.deleteProdus(id).subscribe(() => {
      this.resetForm();
      this.getProduse();
    });
  }

  valideazaProdus(): boolean {
    this.eroareForm = '';

    if (!this.idCategorie) {
      this.eroareForm = 'Selecteaza categoria.';
      return false;
    }

    if (!this.idFurnizor) {
      this.eroareForm = 'Selecteaza furnizorul.';
      return false;
    }

    if (!this.nume || this.nume.trim().length < 2) {
      this.eroareForm = 'Introdu numele produsului.';
      return false;
    }

    if (this.pretAchizitie === null || this.pretAchizitie < 0) {
      this.eroareForm = 'Pret de achizitie invalid.';
      return false;
    }

    if (this.pretVanzare === null || this.pretVanzare <= 0) {
      this.eroareForm = 'Pret de vanzare invalid.';
      return false;
    }

    if (this.pretVanzare < this.pretAchizitie) {
      this.eroareForm =
        'Pretul de vanzare nu poate fi mai mic decât pretul de achizitie.';
      return false;
    }

    if (this.stoc === null || this.stoc < 0) {
      this.eroareForm = 'Stoc invalid.';
      return false;
    }

    return true;
  }
}
