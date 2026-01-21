import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacturiService } from '../../services/facturi';
import { ComenziService } from '../../services/comenzi';

@Component({
  selector: 'app-facturi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './facturi.html',
  styleUrls: ['./facturi.css']
})
export class FacturiComponent implements OnInit {

  facturi: any[] = [];
  comenzi: any[] = [];

  idEdit: number | null = null;
  id_comanda: number | null = null;
  modalitate_plata: string = '';
  status_plata: string = '';
  observatii: string = '';
  eroareForm: string = '';

  constructor(
    private facturiService: FacturiService,
    private comenziService: ComenziService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getFacturi();

    this.comenziService.getComenzi().subscribe(data => {
      this.comenzi = data;
      this.cdr.detectChanges();
    });
  }

  getFacturi(): void {
    this.facturiService.getFacturi().subscribe(data => {
      this.facturi = data;
      this.cdr.detectChanges();
    });
  }

  salveazaFactura(): void {
    if (!this.valideazaFactura()) return;

    const factura = {
      id_comanda: this.id_comanda,
      modalitate_plata: this.modalitate_plata,
      status_plata: this.status_plata,
      observatii: this.observatii || null
    };

    if (this.idEdit === null) {
      this.facturiService.addFactura(factura).subscribe(() => {
        this.resetForm();
        this.getFacturi();
      });
    } else {
      this.facturiService.updateFactura(this.idEdit, factura).subscribe(() => {
        this.resetForm();
        this.getFacturi();
      });
    }
  }

  setEdit(f: any): void {
    this.idEdit = f.id_factura;
    this.id_comanda = f.id_comanda;
    this.modalitate_plata = f.modalitate_plata || '';
    this.status_plata = f.status_plata || '';
    this.observatii = f.observatii || '';
  }

  resetForm(): void {
    this.idEdit = null;
    this.id_comanda = null;
    this.modalitate_plata = '';
    this.status_plata = '';
    this.observatii = '';
    this.eroareForm = '';
  }

  stergeFactura(id: number): void {
    if (!confirm('Sigur doresti sa stergi aceasta factura?')) return;

    this.facturiService.deleteFactura(id).subscribe(() => {
      this.getFacturi();
    });
  }

  valideazaFactura(): boolean {
    this.eroareForm = '';

    if (!this.id_comanda) {
      this.eroareForm = 'Selecteaza comanda.';
      return false;
    }

    if (!['cash', 'card'].includes(this.modalitate_plata)) {
      this.eroareForm = 'Selecteaza metoda de plata.';
      return false;
    }

    if (!['platit', 'neplatit'].includes(this.status_plata)) {
      this.eroareForm = 'Selecteaza statusul platii.';
      return false;
    }

    return true;
  }
}
