import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComenziService } from '../../services/comenzi';
import { ClientiService } from '../../services/clienti';
import { ProduseService } from '../../services/produse';

@Component({
  selector: 'app-comenzi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comenzi.html',
  styleUrls: ['./comenzi.css']
})
export class ComenziComponent implements OnInit {

  comenzi: any[] = [];
  clienti: any[] = [];
  produse: any[] = [];

  idClient: number | null = null;
  idProdus: number | null = null;
  cantitate: number | null = null;

  produseCos: any[] = [];
  totalCos = 0;

  vizualizareComandaExistenta = false;
  idComandaVizualizata: number | null = null;
  eroareForm = '';

  constructor(
    private comenziService: ComenziService,
    private clientiService: ClientiService,
    private produseService: ProduseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getComenzi();

    this.clientiService.getClienti().subscribe(c => {
      this.clienti = c.sort((a: any, b: any) => a.nume.localeCompare(b.nume));
      this.cdr.detectChanges();
    });

    this.produseService.getProduse().subscribe(p => {
      this.produse = p.sort((a: any, b: any) => a.nume.localeCompare(b.nume));
      this.cdr.detectChanges();
    });
  }

  getComenzi(): void {
    this.comenziService.getComenzi().subscribe(data => {
      this.comenzi = data;
      this.cdr.detectChanges();
    });
  }

  veziDetalii(id: number): void {
    this.comenziService.getComanda(id).subscribe(data => {
      this.produseCos = data.produse;
      this.calculeazaTotal();
      this.vizualizareComandaExistenta = true;
      this.idComandaVizualizata = id;
      this.cdr.detectChanges();
    });
  }

  adaugaInCos(): void {
    if (!this.valideazaAdaugareInCos()) return;

    if (this.vizualizareComandaExistenta) {
      this.produseCos = [];
      this.totalCos = 0;
      this.vizualizareComandaExistenta = false;
      this.idComandaVizualizata = null;
    }

    const produs = this.produse.find(p => p.id_produs === this.idProdus);
    if (!produs) return;

    const existent = this.produseCos.find(p => p.id_produs === produs.id_produs);

    if (existent) {
      existent.cantitate += this.cantitate!;
    } else {
      this.produseCos.push({
        id_produs: produs.id_produs,
        nume: produs.nume,
        cantitate: this.cantitate,
        pret_unitar: produs.pret_vanzare
      });
    }

    this.calculeazaTotal();
    this.idProdus = null;
    this.cantitate = null;
    this.cdr.detectChanges();
  }

  trimiteComanda(): void {
    const comanda = {
      id_client: this.idClient,
      produse: this.produseCos.map(p => ({
        id_produs: p.id_produs,
        cantitate: p.cantitate
      }))
    };

    this.comenziService.addComanda(comanda).subscribe(() => {
      this.produseCos = [];
      this.totalCos = 0;
      this.idClient = null;
      this.getComenzi();
    });
  }

  stergeComanda(id: number): void {
    if (!confirm('Sigur doresti sa stergi aceasta comanda?')) return;

    this.comenziService.deleteComanda(id).subscribe(() => {
      this.getComenzi();
      this.produseCos = [];
      this.totalCos = 0;
    });
  }

  calculeazaTotal(): void {
    this.totalCos = this.produseCos.reduce(
      (sum, p) => sum + p.cantitate * p.pret_unitar,
      0
    );
  }

  eliminaProdus(index: number): void {
    this.produseCos.splice(index, 1);
    this.calculeazaTotal();
  }

  golesteCos(): void {
    if (!confirm('Sigur doresti sa golesti cosul?')) return;
    this.produseCos = [];
    this.totalCos = 0;
    this.eroareForm = '';
  }

  valideazaAdaugareInCos(): boolean {
    this.eroareForm = '';

    if (!this.idClient) {
      this.eroareForm = 'Selecteaza un client.';
      return false;
    }

    if (!this.idProdus) {
      this.eroareForm = 'Selecteaza un produs.';
      return false;
    }

    if (!this.cantitate || this.cantitate <= 0) {
      this.eroareForm = 'Cantitatea trebuie sa fie mai mare decât 0.';
      return false;
    }

    const produs = this.produse.find(p => p.id_produs === this.idProdus);
    if (!produs) {
      this.eroareForm = 'Produs invalid.';
      return false;
    }

    const existent = this.produseCos.find(p => p.id_produs === this.idProdus);
    const total = (existent?.cantitate || 0) + this.cantitate;

    if (total > produs.stoc) {
      this.eroareForm = `Stoc insuficient. Disponibil: ${produs.stoc}.`;
      return false;
    }

    return true;
  }
}
