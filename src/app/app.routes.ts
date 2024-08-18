import { Routes } from '@angular/router';
import { FemmeComponent } from './component/femme/femme.component';
import { HommeComponent } from './component/homme/homme.component';
import { PageAccueilComponent } from './component/page-accueil/page-accueil.component';
import { PanierComponent } from './component/panier/panier.component';
import { ProductFormComponent } from './component/product-form/product-form.component';



export const routes: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Route par défaut vers la page d'accueil
    {path : 'homme', component: HommeComponent},
    {path: 'femme', component: FemmeComponent},
    {path: 'panier', component: PanierComponent},
    {path: 'accueil', component: PageAccueilComponent},
    {path: 'publier', component: ProductFormComponent},
  
];
