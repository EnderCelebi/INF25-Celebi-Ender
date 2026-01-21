import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientiService } from '../../services/clienti';

@Component({
  selector: 'app-clienti',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clienti.html',
  styleUrls: ['./clienti.css']
})
export class ClientiComponent implements OnInit {

  clienti: any[] = [];
  idEdit: number | null = null;
  numeNou: string = '';
  telefonNou: string = '';
  emailNou: string = '';

  eroareForm: string = '';

  constructor(
    private clientiService: ClientiService,
    private cdr: ChangeDetectorRef       
  ) {}

  ngOnInit(): void {
    this.getClienti();
  }

  getClienti(): void {
    this.clientiService.getClienti().subscribe(data => {
      this.clienti = data;
      this.cdr.detectChanges();           
    });
  }

  salveazaClient(): void {
    this.eroareForm = '';

    if (!this.numeNou) {
      this.eroareForm = 'Numele este obligatoriu.';
      return;
    }

    if (!this.telefonNou || !/^\d{10}$/.test(this.telefonNou.trim())) {
      this.eroareForm = 'Numarul de telefon trebuie sa contină exact 10 cifre.';
      return;
    }


    if (!this.emailNou || !this.emailNou.includes('@')) {
      this.eroareForm = 'Email invalid.';
      return;
    }

    const client = {
      nume: this.numeNou,
      telefon: this.telefonNou || null,
      email: this.emailNou || null
    };

    if (this.idEdit === null) {
      this.clientiService.addClient(client).subscribe(() => {
        this.resetForm();
        this.getClienti();
      });
    } else {
      this.clientiService.updateClient(this.idEdit, client).subscribe(() => {
        this.resetForm();
        this.getClienti();
      });
    }
  }

  setEdit(c: any): void {
    this.idEdit = c.id_client;
    this.numeNou = c.nume;
    this.telefonNou = c.telefon || '';
    this.emailNou = c.email || '';
  }

  resetForm(): void {
    this.idEdit = null;
    this.numeNou = '';
    this.telefonNou = '';
    this.emailNou = '';
    this.eroareForm = '';
  }

  stergeClient(id: number): void {
    if (!confirm('Sigur doresti sa stergi acest client?')) return;

    this.clientiService.deleteClient(id).subscribe(() => {
      this.getClienti();
    });
  }
}
