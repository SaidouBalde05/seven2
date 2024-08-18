import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/models/product.model';
import { SevenService } from '../../service/seven.service';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent  {
  newProduct: Product = {
    id: this.generateUniqueId(),
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    category: 'homme', 
    type: '',
    sellerPhoneNumber: '',
  };

  constructor(private sevenService: SevenService) {}

  generateUniqueId(): string {
    // Génère un identifiant unique pour chaque produit
    return Math.random().toString(36).substr(2, 9);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.newProduct.imageUrl = URL.createObjectURL(file);
  }

  addProduct(): void {
    this.newProduct.id = this.generateUniqueId();
    this.sevenService.addProduct(this.newProduct);
    this.resetForm();
  }

  resetForm(): void {
    this.newProduct = {
      id: this.generateUniqueId(),
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      category: 'homme', // ou 'femme'
      type: '',
      sellerPhoneNumber: '', // Réinitialisation du champ
    };
  }
}
