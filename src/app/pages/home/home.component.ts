import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

const limitieren = 10;
let offsetting = 10;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  limit: number = 10;
  offset: number = 0;

  ngOnInit(): void {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((res) => {
        this.products = res;
        this.offset += this.limit;
      });
  }

  // loadMore() {
  //   this.productsService
  //     .getAllProducts(limitieren, offsetting)
  //     .subscribe((res) => {
  //       this.products = res;
  //       offsetting += limitieren;
  //     });

  //   return this.products;
  // }

  onLoadMoreHome() {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((res) => {
        this.products = this.products.concat(res);
        this.offset += this.limit;
      });
  }
}
