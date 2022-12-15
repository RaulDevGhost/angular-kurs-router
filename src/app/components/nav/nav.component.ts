import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/user.model';
import { StoreService } from '../../services/store.service';
import { FilesService } from '../../services/files.service';
import { ProductsService } from 'src/app/services/products.service';
import { Catergoy } from 'src/app/models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  token = '';
  profile: Profile = {
    id: '',
    name: '',
    email: '',
  };
  categories: Catergoy[] = [];

  constructor(
    private storeService: StoreService,
    private filesService: FilesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.storeService.getToken$.subscribe((res) => {
      this.token = res;
    });

    this.productsService.getAllCategories().subscribe((res) => {
      console.log('categories', res);
      this.categories = res;
    });
  }

  //onchages
  // this.authService.getProfile(this.token).subscribe((res) => {
  //   this.profile = res;
  // });

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  downloadFile() {
    console.log('hello download');
    const url = 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf';
    this.filesService
      .getFile('newFile', url, 'application/pdf')
      .subscribe((res) => {
        console.log(res);
      });
  }
}
