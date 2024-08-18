import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FemmeComponent } from './component/femme/femme.component';
import { HommeComponent } from './component/homme/homme.component';
import { PageAccueilComponent } from './component/page-accueil/page-accueil.component';
import { PanierComponent } from './component/panier/panier.component';
import { ProductFormComponent } from './component/product-form/product-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
      RouterLink,
      PanierComponent, 
      HommeComponent, 
      FemmeComponent,
      PageAccueilComponent, 
      CommonModule, 
      FormsModule,
      ProductFormComponent,
      ReactiveFormsModule,
      HttpClientModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
