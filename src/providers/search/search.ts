import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
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


  searchByProduct(data): Observable<any> {
    return this.http.get(this.searchURl + this.indicate_search + data);
  }


  searchByShop(data): Observable<any> {
    return this.http.get(this.searchURl2 + this.indicate_search + data);
  }

  searchProduct(): Observable<any> {
    return this.http.get(this.searchURl);
  }

  searchStore(): Observable<any> {
    return this.http.get(this.searchURl2);
  }


}
