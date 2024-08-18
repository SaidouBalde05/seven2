import { Injectable } from '@angular/core';
import { Product } from '../models/models/product.model';
@Injectable({
  providedIn: 'root',
})
export class SevenService {

  private femmeKey = 'femmeProducts';
  private hommeKey = 'hommeProducts';
  private panierKey = 'panier';
  private recentFemmeKey = 'recentFemmeProducts';
  private recentHommeKey = 'recentHommeProducts';

  private femmeProducts: Product[] = this.loadProducts(this.femmeKey);
  private hommeProducts: Product[] = this.loadProducts(this.hommeKey);
  private panier: Product[] = this.loadProducts(this.panierKey);
  private recentFemmeProducts: Product[] = this.loadProducts(this.recentFemmeKey);
  private recentHommeProducts: Product[] = this.loadProducts(this.recentHommeKey);
  

  private loadProducts(key: string): Product[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private saveProducts(key: string, products: Product[]): void {
    localStorage.setItem(key, JSON.stringify(products));
  }

  getProducts(category: string): Product[] {
    if (category === 'femme') {
      return this.femmeProducts;
    } else if (category === 'homme') {
      return this.hommeProducts;
    } else {
      return [];
    }
  }

  addProduct(product: Product): void {
    if (product.category === 'femme') {
      this.femmeProducts.push(product);
      this.saveProducts(this.femmeKey, this.femmeProducts);
      this.addRecentProduct(product, 'femme');
    } else if (product.category === 'homme') {
      this.hommeProducts.push(product);
      this.saveProducts(this.hommeKey, this.hommeProducts);
      this.addRecentProduct(product, 'homme');
    }
  }

  private addRecentProduct(product: Product, category: string): void {
    if (category === 'femme') {
      this.recentFemmeProducts.unshift(product);
      if (this.recentFemmeProducts.length > 5) { // Garder les 5 derniers produits
        this.recentFemmeProducts.pop();
      }
      this.saveProducts(this.recentFemmeKey, this.recentFemmeProducts);
    } else if (category === 'homme') {
      this.recentHommeProducts.unshift(product);
      if (this.recentHommeProducts.length > 5) { // Garder les 5 derniers produits
        this.recentHommeProducts.pop();
      }
      this.saveProducts(this.recentHommeKey, this.recentHommeProducts);
    }
  }

  getRecentProducts(category: string): Product[] {
    if (category === 'femme') {
      return this.recentFemmeProducts;
    } else if (category === 'homme') {
      return this.recentHommeProducts;
    } else {
      return [];
    }
  }

  getRecentProductsByType(category: string, type: string): Product[] {
    if (category === 'femme') {
      return this.recentFemmeProducts.filter(product => product.type === type);
    } else if (category === 'homme') {
      return this.recentHommeProducts.filter(product => product.type === type);
    } else {
      return [];
    }
  }

  addToPanier(product: Product): void {
    this.panier.push(product);
    this.saveProducts(this.panierKey, this.panier);
  }

  getPanier(): Product[] {
    return this.panier;
  }

  clearPanier(): void {
    this.panier = [];
    this.saveProducts(this.panierKey, this.panier);
  }

  deleteProduct(productId: string): void {
    // Supprime le produit de la liste des produits
    this.femmeProducts = this.femmeProducts.filter(product => product.id !== productId);
    this.hommeProducts = this.hommeProducts.filter(product => product.id !== productId);

    // Met à jour le localStorage
    this.saveProducts(this.femmeKey, this.femmeProducts);
    this.saveProducts(this.hommeKey, this.hommeProducts);

    // Supprime le produit de la liste des récents
    this.recentFemmeProducts = this.recentFemmeProducts.filter(product => product.id !== productId);
    this.recentHommeProducts = this.recentHommeProducts.filter(product => product.id !== productId);

    this.saveProducts(this.recentFemmeKey, this.recentFemmeProducts);
    this.saveProducts(this.recentHommeKey, this.recentHommeProducts);
  }

}
