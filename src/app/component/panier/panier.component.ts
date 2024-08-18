import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../models/models/product.model';
import { SevenService } from '../../service/seven.service';


@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent {
  panier: Product[] = [];

  constructor(private sevenService: SevenService) {}

  ngOnInit(): void {
    this.panier = this.sevenService.getPanier();
  }

  clearPanier(): void {
    this.sevenService.clearPanier();
    this.panier = [];
  }
}
