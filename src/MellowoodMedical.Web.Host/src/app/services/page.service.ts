import { Injectable } from '@angular/core';
import {PropertyReader} from "@app/interfaces/property-reader";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@node_modules/@angular/common/http";
import {Observable, throwError} from "@node_modules/rxjs";
import {Page} from "@shared/service-proxies/service-proxies";
import {catchError, first, flatMap, shareReplay} from "@node_modules/rxjs/operators";
import {CookieService} from "@node_modules/ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private baseUrl: string = 'http://localhost:21021/api/Page/GetAllPages';
  private baseUrlGetPageContent: string = 'http://localhost:21021/api/Page/GetPageContent/';
  private baseUrlAddPage: string = 'http://localhost:21021/api/dynamic/AddPage';
  private baseUrlEditPage: string = 'http://localhost:21021/api/Page/UpdatePage';
  private baseUrlDeletePage: string = 'http://localhost:21021/api/Page/DeletePage';
  component: PropertyReader;
  private page$: Observable<Page[]>;
  private pageContetnt$: Observable<any>;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public registerComponent(comp: PropertyReader)
  {
    this.component = comp;
  }

  getPageById(id:number) : Observable<Page> {
    return this
        .getPages().pipe(
            flatMap(result => result),
            first(page => page.id === id)
        )
  }

  deletePage(id: number): Observable<any> {
    return this.http
        .delete(this.baseUrlDeletePage + '/' + id);        
  }  

  getPages() : Observable<Page[]> {
    console.log("tt");
    if(!this.page$) {
      this.page$ = this
          .http
          .get<Page[]>(this.baseUrl)
          .pipe(            
              catchError(this.handleError)
          );
    }  
    return this.page$;
  }

  editPage(editPage: Page) : Observable<Page>
  {
    return this.http
        .put<Page>(this.baseUrlEditPage, editPage);
  }
  
  getPageContent(id: number) : Observable<any> 
  {
    this.pageContetnt$ = this
        .http
        .get<any>(this.baseUrlGetPageContent + id)
        .pipe(
            catchError(this.handleError)
        );
    return this.pageContetnt$;
  }

  insertPage(newPage: Page): Observable<Page> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', "X-XSRF-TOKEN": this.cookieService.get("XSRF-TOKEN") });
    return this.http
        .post<Page>(this.baseUrlAddPage, newPage, { headers: headers });
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMsg: string;
    if (errorResponse.error instanceof Error) {   
      errorMsg = 'An error occurred:' + errorResponse.error.message;
    } else {    
      errorMsg = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
    }
    console.error(errorMsg);
    return throwError(errorMsg);
  }
 
  clearCache() {
    this.page$ = null;
  }
}

