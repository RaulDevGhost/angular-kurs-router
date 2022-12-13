import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  total = 0;
  productsFetchAll: Product[] = [];
  shopingCart: Product[] = [];
  products: Product[] = [];
  productDetail: Product = {
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
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.shopingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((res) => {
      this.products = res;
      console.log(this.products);
    });
  }

  //CALBBACK HELL example
  readAndUpdate(id: number): void {
    this.productsService.getProduct(id).subscribe((data) => {
      const product = data;
      this.productsService
        .updateProduct(product.id, { title: 'New title' })
        .subscribe((rtaUpdated) => {
          this.productsService.updateProduct(rtaUpdated.id, {
            title: 'Second new title',
          });
        });
    });
  }

  //solution with switchMap()
  readAndUpdateSwitchMap(): void {
    const id = 3;
    // solution callback hell
    this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product) => {
          return forkJoin([
            this.productsService.updateProduct(product.id, {
              title: 'New title3',
            }),
            this.productsService.updateProduct(6, {
              title: 'New title6',
            }),
            this.productsService.updateProduct(5, {
              title: 'New title5',
            }),
          ]);
        })
      )
      .subscribe((res) => {
        // product updated
        console.log(res);
      });
  }

  readAndUpdateZip(): void {
    //const id = 3;
    // solution callback hell
    // this.productsService.getProduct(id).pipe(
    //   switchMap((product) =>
    //     this.productsService.updateProduct(product.id, {
    //       title: 'New title3',
    //     })
    //   ),
    // );
    // .subscribe((res) => {
    //   // product updated
    //   //console.log(res);
    // });
    zip(
      this.productsService.getProduct(3),
      this.productsService.updateProduct(6, {
        title: 'New title6',
      })
    ).subscribe((response) => {
      const product = response[0];
      const product2 = response[1];
      console.log('111', product);
      console.log('2222', product2);
    });
  }

  testZipService() {
    const id = 3;
    this.productsService
      .testZip(id, { title: 'new title' })
      .subscribe((resposes) => {
        console.log('response one->', resposes[0]);
        console.log('response one->', resposes[1]);
      });
  }

  //END CALBBACK HELL example

  addingCart(product: Product) {
    if (!this.shopingCart.includes(product)) {
      this.storeService.addProduct(product);
      this.total = this.storeService.getTotal();
      //this.shopingCart.push(product);
      //this.total += product.price;
      //this.total = this.shopingCart.reduce((sum, item) => sum + item.price, 0);
    }
  }

  getProduct(id: number) {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id).subscribe({
      next: (res) => {
        (this.productDetail = res), (this.statusDetail = 'success');
      },
      error: (e) => {
        this.statusDetail = 'error';
        Swal.fire({
          title: 'Error!',
          text: e,
          icon: 'error',
          confirmButtonText: 'CLOSE',
        });
      },
      complete: () => console.info('complete'),
    });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'nuevo titulo',
      price: 180,
      description:
        'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
      images: [
        'https://placeimg.com/640/480/arch?r=0.21673949981208263',
        'https://placeimg.com/640/480/arch?r=0.7067260949802254',
        'https://placeimg.com/640/480/arch?r=0.22428759698702305',
      ],
      categoryId: 1,
    };

    this.productsService.createProduct(product).subscribe((res) => {
      this.products.unshift(res);
    });
  }

  updateProduct(data: { id: number; changes: UpdateProductDTO }) {
    const { id, changes } = data;
    this.productsService.updateProduct(id, changes).subscribe((res) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === res.id
      );
      this.products[productIndex] = res;
      this.productDetail = res;
    });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe((res) => {
      console.log('res delete--->', res);
      const productIndex = this.products.findIndex((item) => item.id === id);
      this.products.splice(productIndex, 1);
      console.log(this.products);
    });
  }

  loadMore() {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((res) => {
        this.products = res;
        this.offset += this.limit;
        console.log(this.offset);
        console.log(this.products);
      });
  }
}
