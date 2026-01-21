import { Routes } from '@angular/router';
import { CategoriiComponent } from './components/categorii/categorii';
import { ProduseComponent } from './components/produse/produse';
import { FurnizoriComponent } from './components/furnizori/furnizori';
import { ClientiComponent } from './components/clienti/clienti';
import { ComenziComponent } from './components/comenzi/comenzi';
import { FacturiComponent } from './components/facturi/facturi';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'categorii', component: CategoriiComponent },
  { path: 'produse', component: ProduseComponent },
  { path: 'furnizori', component: FurnizoriComponent },
  { path: 'clienti', component: ClientiComponent },
  { path: 'comenzi', component: ComenziComponent },
  { path: 'facturi', component: FacturiComponent },
];

