import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FurnizoriService } from '../../services/furnizori';

@Component({
  selector: 'app-furnizori',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './furnizori.html',
  styleUrls: ['./furnizori.css']
})
export class FurnizoriComponent implements OnInit {

  furnizori: any[] = [];

  idEdit: number | null = null;
  numeNou: string = '';
  telefonNou: string = '';
  emailNou: string = '';
  eroareForm: string = '';

  constructor(
    private furnizoriService: FurnizoriService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getFurnizori();
  }

  getFurnizori(): void {
    this.furnizoriService.getFurnizori().subscribe(data => {
      this.furnizori = data;
      this.cdr.detectChanges();
    });
  }

  salveazaFurnizor(): void {
    this.eroareForm = '';

    if (!this.numeNou || this.numeNou.trim().length < 2) {
      this.eroareForm = 'Numele este obligatoriu.';
      return;
    }

    if (!this.telefonNou || !/^\d{10}$/.test(this.telefonNou.trim())) {
      this.eroareForm = 'Numarul de telefon trebuie sa contina exact 10 cifre.';
      return;
    }


    if (!this.emailNou || !this.emailNou.includes('@')) {
      this.eroareForm = 'Email invalid.';
      return;
    }

    const furnizor = {
      nume: this.numeNou,
      telefon: this.telefonNou || null,
      email: this.emailNou || null
    };

    if (this.idEdit === null) {
      this.furnizoriService.addFurnizor(furnizor).subscribe(() => {
        this.resetForm();
        this.getFurnizori();
      });
    } else {
      this.furnizoriService.updateFurnizor(this.idEdit, furnizor).subscribe(() => {
        this.resetForm();
        this.getFurnizori();
      });
    }
  }

  setEdit(f: any): void {
    this.idEdit = f.id_furnizor;
    this.numeNou = f.nume;
    this.telefonNou = f.telefon || '';
    this.emailNou = f.email || '';
  }

  resetForm(): void {
    this.idEdit = null;
    this.numeNou = '';
    this.telefonNou = '';
    this.emailNou = '';
    this.eroareForm = '';
  }

  stergeFurnizor(id: number): void {
    if (!confirm('Sigur doresti sa stergi acest furnizor?')) return;

    this.furnizoriService.deleteFurnizor(id).subscribe(() => {
      this.getFurnizori();
    });
  }
}
