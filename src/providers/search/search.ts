import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN_APP } from './../../app/environment';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {
  private searchURl = DOMAIN_APP +  "api/store/articles";
  private searchURl2 = DOMAIN_APP +  "api/store/stores";

  private indicate_search = "?search=";
  constructor(public http: HttpClient) {
    console.log('Hello SearchProvider Provider');
  }

  getHeaders() {
    if (localStorage.getItem('userToken') !== null) {
      return new HttpHeaders({
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization' : 'JWT ' + localStorage.getItem('userToken')
      });
    } else {
      return new HttpHeaders({
        'Content-Type' : 'application/json; charset=utf-8'
      });
    }
    
  }

  searchByProduct(data): Observable<any> {
    return this.http.get(this.searchURl + this.indicate_search + data);
  }


  searchByShop(data): Observable<any> {
    return this.http.get(this.searchURl2 + this.indicate_search + data);
  }

  searchProduct(): Observable<any> {
    return this.http.get(this.searchURl, { headers: this.getHeaders() });
  }

  searchStore(): Observable<any> {
    return this.http.get(this.searchURl2, { headers: this.getHeaders() });
  }

  searchByStore_product(data): Observable<any> {
    return this.http.get(this.searchURl, data);
  }

  searchProductByStore(data): Observable<any> {
    return this.http.get(this.searchURl, data);
  }

  searchInfinite(url): Observable<any> {
    return this.http.get(url);
  }
}
