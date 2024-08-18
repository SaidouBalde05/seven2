import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../../models/models/product.model';
import { SevenService } from '../../service/seven.service';

@Component({
  selector: 'app-femme',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './femme.component.html',
  styleUrls: ['./femme.component.scss']
})
export class FemmeComponent implements OnInit  {
  
  products: Product[] = [];
  recentProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedType: string = '';
  phoneNumbers: { [productId: string]: string } = {}; // Dictionnaire pour les numéros de téléphone
  selectedSizes: { [productId: string]: string } = {}; // Dictionnaire pour les pointures
  currentRecentProduct: Product | null = null;
  currentIndex: number = 0;

  constructor(private sevenService: SevenService) {}

  ngOnInit(): void {
    this.products = this.sevenService.getProducts('femme');
    this.recentProducts = this.sevenService.getRecentProducts('femme');
    this.filteredProducts = this.products;

    if (this.recentProducts.length > 0) {
      this.showRecentProductsSequentially();
    }
  }

  filterProducts(): void {
    if (this.selectedType) {
      this.filteredProducts = this.products.filter(product => product.type === this.selectedType);
      this.recentProducts = this.sevenService.getRecentProductsByType('femme', this.selectedType);
      this.showRecentProductsSequentially();
    } else {
      this.filteredProducts = this.products;
      this.recentProducts = this.sevenService.getRecentProducts('femme');
      this.showRecentProductsSequentially();
    }
  }

  prepareOrder(product: Product): void {
    const productId = product.id;

    if (product.type === 'chaussure' && !this.selectedSizes[productId]) {
      alert('Veuillez sélectionner une pointure.');
    } else if (!this.phoneNumbers[productId]) {
      alert('Veuillez entrer un numéro de téléphone.');
    } else {
      this.orderProduct(product);
    }
  }

  orderProduct(product: Product): void {
    const productId = product.id;
    const phoneNumber = this.phoneNumbers[productId];
    const size = this.selectedSizes[productId];
    this.sevenService.addToPanier(product);
    this.sendOrderViaWhatsApp(product, phoneNumber, size);
  }

  private sendOrderViaWhatsApp(product: Product, phoneNumber: string, size: string): void {
    const sellerPhoneNumber = product.sellerPhoneNumber; // Utilisation du numéro de téléphone du vendeur
    const sizeInfo = product.type === 'chaussure' ? `\nPointure: ${size}` : '';
    const message = `Commande:\nNom: ${product.name}\nPrix: ${product.price}\nDescription: ${product.description}${sizeInfo}\nNuméro de téléphone: ${phoneNumber}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${sellerPhoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  }

  confirmAndDeleteProduct(product: Product): void {
    const sellerPhone = product.sellerPhoneNumber;
    const phoneNumber = prompt('Entrez le numéro de téléphone avec lequel vous avez ajouté le produit :');
    if (phoneNumber === sellerPhone) {
      this.deleteProduct(product.id);
    } else {
      alert('Numéro de téléphone incorrect.');
    }
  }

  deleteProduct(productId: string): void {
    this.products = this.products.filter(product => product.id !== productId);
    this.filteredProducts = this.filteredProducts.filter(product => product.id !== productId);

    // Mise à jour dans le service
    this.sevenService.deleteProduct(productId);
  }

  private showRecentProductsSequentially(): void {
    if (this.recentProducts.length > 0) {
      this.currentIndex = 0;
      this.updateCurrentRecentProduct();
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.recentProducts.length;
        this.updateCurrentRecentProduct();
      }, 5000); // 5 secondes
    }
  }

  private updateCurrentRecentProduct(): void {
    this.currentRecentProduct = this.recentProducts[this.currentIndex];
  }
}