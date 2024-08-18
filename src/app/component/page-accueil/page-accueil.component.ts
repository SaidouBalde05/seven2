import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Product } from '../../models/models/product.model';
import { SevenService } from '../../service/seven.service';

@Component({
  selector: 'app-page-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-accueil.component.html',
  styleUrl: './page-accueil.component.scss'
})
export class PageAccueilComponent implements OnInit {
  recentFemmeProducts: Product[] = [];
  recentHommeProducts: Product[] = [];

  constructor(private sevenService: SevenService) {}

  ngOnInit(): void {
    this.recentFemmeProducts = this.sevenService.getRecentProducts('femme');
    this.recentHommeProducts = this.sevenService.getRecentProducts('homme');
  }
}
