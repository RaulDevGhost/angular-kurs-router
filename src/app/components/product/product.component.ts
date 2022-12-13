import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, UpdateProductDTO } from '../../models/product.model';
import SwiperCore, { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 1,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    autoplay: {
      reverseDirection: false,
    },
  };
  @Input() product: Product = {
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
  @Input() productDetail: Product = {
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
  @Output() productEditDetail = new EventEmitter<{
    changes: UpdateProductDTO;
    id: number;
  }>();
  @Output() addProduct = new EventEmitter<Product>();
  @Output() productId = new EventEmitter<number>();
  @Output() deletetId = new EventEmitter<number>();
  showProductDetails = false;
  today = new Date();

  addToCart(product: Product) {
    this.addProduct.emit(product);
  }
  viewDetails(id: number) {
    this.showProductDetails = !this.showProductDetails;
    this.productId.emit(id);
    console.log('productDetail', this.productDetail);
  }

  editingProduct(productDetail: Product, changes2: UpdateProductDTO) {
    const id = productDetail.id;
    console.log(changes2);
    const changes: UpdateProductDTO = {
      price: 999,
      title: 'HELLO CHANGES BOWIE',
    };
    this.productEditDetail.emit({ id, changes });
  }

  deleteProduct(id: number) {
    this.deletetId.emit(id);
  }
}
