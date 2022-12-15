import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  productId: string | null = null;
  product: Product = {
    id: 0,
    images: [''],
    price: 0,
    category: {
      id: 0,
      name: '',
      typeImg: '',
    },
    rating: {
      count: 0,
      rate: 0,
    },
    title: '',
    description: '',
    tax: 0,
  };
  @Output() addProduct = new EventEmitter<Product>();
  ngOnInit(): void {
    //AVOID CALLBACK HELL WITH SWITCHMAP RXJS
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productsService.getProduct(this.productId);
          }
          return [];
        })
      )
      .subscribe((res) => {
        this.product = res;
      });
  }

  goToBack() {
    this.location.back();
  }
}
