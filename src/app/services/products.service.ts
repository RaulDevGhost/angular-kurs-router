import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  Catergoy,
} from '../models/product.model';
import { environment } from '../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private apiURL = `${environment.API_URL}`;

  getAllProducts(limit: number, offset: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http
      .get<Product[]>(`${this.apiURL}/api/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        retry(3),
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              tax: 0.19 * item.price,
            };
          })
        )
      );
  }

  testZip(id: number, changes: UpdateProductDTO) {
    return zip(this.getProduct(id), this.updateProduct(id, changes));
  }

  // getProductsByPage(limit: number, offset: number): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.apiURL}`, {
  //     params: { offset, limit },
  //   }).pipe(retry(3));
  // }

  private handleError(err: HttpErrorResponse): Observable<never> {
    if (err.status === HttpStatusCode.Conflict) {
      return throwError(() => `ERROR 500 -> ${err.message}`);
    }
    if (err.status === HttpStatusCode.NotFound) {
      return throwError(
        () => `ERROR 404 - The product does not exist -> ${err.message}`
      );
    }
    if (err.status === HttpStatusCode.Unauthorized) {
      return throwError(
        () => `ERROR 404 - You are not Authorized -> ${err.message}`
      );
    }
    return throwError(() => `ERROR SERVER -> ${err.message}`);
  }

  getProduct(id: number | string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURL}/api/products/${id}`).pipe(
      map((data) => {
        return {
          ...data,
          tax: 0.19 * data.price,
        };
      }),
      catchError(this.handleError)
    );
  }

  createProduct(product: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(`${this.apiURL}/api/products`, product);
  }

  updateProduct(id: number, product: UpdateProductDTO): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}/api/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/api/products/${id}`);
  }

  getCategoriesbyId(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(
      `${this.apiURL}/api/categories/${categoryId}/products`,
      { params }
    );
  }

  getAllCategories() {
    return this.http.get<Catergoy[]>(`${this.apiURL}/api/categories`);
  }
}
