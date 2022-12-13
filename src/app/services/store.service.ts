import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private shopingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  private token = '';
  private getToken = new BehaviorSubject<string>('');

  myCart$ = this.myCart.asObservable();
  getToken$ = this.getToken.asObservable();

  addProduct(product: Product) {
    this.shopingCart.push(product);
    this.myCart.next(this.shopingCart);
  }

  getShoppingCart() {
    return this.shopingCart;
  }

  getTotal() {
    return this.shopingCart.reduce((sum, item) => sum + item.price, 0);
  }

  addToken(accessToken: string) {
    this.token = accessToken;
    this.getToken.next(this.token);
  }

  gettingToken() {
    this.getToken.next(this.token);
  }
}
