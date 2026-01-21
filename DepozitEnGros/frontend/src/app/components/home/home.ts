import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProduseService } from '../../services/produse';
import { ComenziService } from '../../services/comenzi';
import { FacturiService } from '../../services/facturi';
import { ClientiService } from '../../services/clienti';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  nrProduse = 0;
  nrComenzi = 0;
  nrFacturi = 0;
  nrClienti = 0;

  produseStocMic: any[] = [];
  facturiNeplatite: any[] = [];

  constructor(
    private router: Router,
    private produseService: ProduseService,
    private comenziService: ComenziService,
    private facturiService: FacturiService,
    private clientiService: ClientiService,
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit(): void {
    this.incarcaDashboard();
  }

  incarcaDashboard(): void {

    this.produseService.getProduse().subscribe((produse: any[]) => {
      this.nrProduse = produse.length;
      this.produseStocMic = produse.filter(p => p.stoc <= 10);
      this.cdr.detectChanges(); 
    });

    this.comenziService.getComenzi().subscribe((comenzi: any[]) => {
      this.nrComenzi = comenzi.length;
      this.cdr.detectChanges();
    });

    this.facturiService.getFacturi().subscribe((facturi: any[]) => {
      this.nrFacturi = facturi.length;
      this.facturiNeplatite = facturi.filter(
        f => f.status_plata === 'neplatit'
      );
      this.cdr.detectChanges();
    });

    this.clientiService.getClienti().subscribe((clienti: any[]) => {
      this.nrClienti = clienti.length;
      this.cdr.detectChanges();
    });
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }
}
