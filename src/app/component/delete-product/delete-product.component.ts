import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Product } from '../../models/models/product.model';
import { SevenService } from '../../service/seven.service';
@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {
  @Input() product: Product | undefined;
  sellerPhoneNumber: string = '';

  constructor(private sevenService: SevenService) {}

  deleteProduct(): void {
    if (this.product && this.product.sellerPhoneNumber === this.sellerPhoneNumber) {
      this.sevenService.deleteProduct(this.product.id);
      alert('Produit supprimé avec succès.');
      // Optionnel : fermez la boîte de dialogue après la suppression
      this.product = undefined;
    } else {
      alert('Numéro de vendeur incorrect.');
    }
  }
}
