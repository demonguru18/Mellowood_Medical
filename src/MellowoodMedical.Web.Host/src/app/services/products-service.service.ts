import { Injectable } from '@angular/core';
import {Observable, throwError} from "@node_modules/rxjs";
import {Page, Product} from "@shared/service-proxies/service-proxies";
import {catchError, first, flatMap, shareReplay} from "@node_modules/rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@node_modules/@angular/common/http";
import {PropertyReader} from "@app/interfaces/property-reader";
import {CookieService} from "@node_modules/ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  private baseUrl: string = 'http://localhost:21021/api/Product/GetAllProducts';
  private baseUrlAddProduct: string = 'http://localhost:21021/api/Product/AddProduct';
  private baseUrlEditProduct: string = 'http://localhost:21021/api/Product/UpdateProduct';
  private baseUrlDeleteProduct: string = 'http://localhost:21021/api/Product/DeleteProduct';
  private baseUrlAddPage: string = 'http://localhost:21021/api/Product/AddPage';
  component: PropertyReader;

  private product$: Observable<Product[]>;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public registerComponent(comp: PropertyReader)
  {
    this.component = comp;   
  }

  getProductById(id:number) : Observable<Product> {
    return this
        .getProducts().pipe(
            flatMap(result => result),
            first(product => product.id === id)
        )

  }

  deleteProduct(id: number): Observable<any> {
    return this.http
        .delete(this.baseUrlDeleteProduct + '/' + id); // Delete product from the server            
  }

  getProducts(): Observable<Product[]> {
    // if products does not exist in cache, then get the products 
    // keep it it in local cache using shareReplay Observer.
    if(!this.product$) {
      this.product$ = this
          .http
          .get<Product[]>(this.baseUrl)
          .pipe(
              //Will get the result and keep it in local memory cache
              // Sharereply can be used to control how many products u want in resul and for how long
              // if you dont specify, it will store all
              shareReplay(),
              // Catch any error
              catchError(this.handleError)
          );
    }
    // if products cache exists return it
    return this.product$;
  }
  
  editProduct(editProduct: Product) : Observable<Product> 
  {
    return this.http
        .put<Product>(this.baseUrlEditProduct, editProduct);
  }

  insertProduct(newProduct: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', "X-XSRF-TOKEN": this.cookieService.get("XSRF-TOKEN") });
    
    return this.http
        .post<Product>(this.baseUrlAddProduct, newProduct, { headers: headers });
  }

  insertPage(newPage: Page): Observable<Page> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', "X-XSRF-TOKEN": this.cookieService.get("XSRF-TOKEN") });
    return this.http
        .post<Page>(this.baseUrlAddPage, newPage, { headers: headers });
  }

  //Method to handle error
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMsg: string;
    if (errorResponse.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMsg = 'An error occurred:' + errorResponse.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMsg = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
    }
    console.error(errorMsg);
    return throwError(errorMsg);
  }

  // finally clear the cache
  clearCache() {
    this.product$ = null;
  }
}
