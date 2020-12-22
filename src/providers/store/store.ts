import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN_APP } from './../../app/environment';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {
  private storeUrl = DOMAIN_APP + "api/store/stores";
  private catgUrl = DOMAIN_APP + "api/store/categories";
  private createMarketUrl = DOMAIN_APP + "api/store/create_store";
  private myshopUrl = DOMAIN_APP + "api/store/my-stores";
  private deleteShopUrl = DOMAIN_APP + "api/store/my-stores";
  private suscribeUrl = DOMAIN_APP + "api/store/subscribe";
  private highCatgUrl = DOMAIN_APP + "api/store/hight_categories";
  private ByHighUrl = DOMAIN_APP + "api/store/hight_category_articles/";
  private detailMarket = DOMAIN_APP + "api/store/my-stores/";
  private detailCatgUrl = DOMAIN_APP + "api/store/categorie/";
  private productOfCatgUrl = DOMAIN_APP + "api/store/store_category_articles/";
  private updateUrl = DOMAIN_APP + "api/store/articles/";
  private updateUrl2 = DOMAIN_APP + "api/store/my-stores/";
  private addProdByMarket = DOMAIN_APP + "api/store/create_article";
  private getSpecificMarket = DOMAIN_APP + "api/store/stores/";

  private getArticleByIdUrl = DOMAIN_APP + "api/store/articles/";
  private getHighProdUrl = DOMAIN_APP + "api/store/hight_category_articles/";

  private getAllProdForUser = DOMAIN_APP + "api/store/user_articles";

  private modifyUrl = DOMAIN_APP + "api/store/update_category/";

  constructor(public http: HttpClient) {
    console.log('Hello StoreProvider Provider');
  }

  // get headers
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

  // get headers
  getHeaders2() {
    if (localStorage.getItem('language') !== null) {
      return new HttpHeaders({
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization' : 'JWT ' + localStorage.getItem('userToken'),
        'Accept-Language' : localStorage.getItem('language')
      });
    } else {
      return new HttpHeaders({
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization' : 'JWT ' + localStorage.getItem('userToken'),
        'Accept-Language' : 'en'
      });
    }
    
  }

  // language headers
  getHeaders3() {
    if (localStorage.getItem('language') !== null) {
      return new HttpHeaders({
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept-Language' : localStorage.getItem('language')
      })
    } else {
      return new HttpHeaders({
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept-Language' : 'en'
      })
    }
    
  }


  node(data): Observable<any> {
    return this.http.post('http://192.168.8.100:3000/middl/created_store',
    {
      data : data,
      token : localStorage.getItem('userToken')
    });
  }

  getListStore(): Observable<any> {
    return this.http.get(this.storeUrl, { headers : this.getHeaders() });
  }

  getCatgStore(): Observable<any> {
    return this.http.get(this.catgUrl, { headers : this.getHeaders2() });
  }

  getMyShop(): Observable<any> {
    return this.http.get(this.myshopUrl, { headers: this.getHeaders() });
  }

  createMarket(data): Observable<any> {
    return this.http.post(this.createMarketUrl, data, { headers: this.getHeaders() });
  }


  delShopById(data): Observable<any> {
    return this.http.delete(this.deleteShopUrl + "/" + data, { headers : this.getHeaders()});
  }

  Subscribe(data): Observable<any> {
    return this.http.post(this.suscribeUrl,data, { headers: this.getHeaders() });
  }

  getHighCatg(): Observable<any> {
    return this.http.get(this.highCatgUrl, { headers: this.getHeaders3() });
  }

  getProductByHighCtg(id): Observable<any> {
    return this.http.get(this.ByHighUrl + id, { headers: this.getHeaders() });
  }

  getDetailMarket(id): Observable<any> {
    return this.http.get(this.detailMarket + id, { headers: this.getHeaders2() });
  }

  getDetailCatg(id): Observable<any> {
    return this.http.get(this.detailCatgUrl + id, { headers: this.getHeaders() });
  }

  getProductByCatg(id,id2): Observable<any> {
    return this.http.get(this.productOfCatgUrl + id + '/' + id2);
  }

  updateProduct(data,id): Observable<any> {
    return this.http.patch(this.updateUrl + id,data,{ headers: this.getHeaders() });
  }


  updateProduct2(data,id): Observable<any> {
    return this.http.patch(this.updateUrl2 + id, data, { headers: this.getHeaders() });
  }


  createNewProduct(data): Observable<any> {
    return this.http.post(this.addProdByMarket, data, { headers: this.getHeaders() });
  }

  getDetailMarketById(id): Observable<any> {
    return this.http.get(this.getSpecificMarket + id , { headers: this.getHeaders3() });
  }

  getProductHigh(id): Observable<any> {
    return this.http.get(this.getHighProdUrl + id);
  }

  getProductOfUser(): Observable<any> {
    return this.http.get(this.getAllProdForUser, { headers: this.getHeaders() });
  }

  // Articles
  // obtenir produit par id
  getProductByID(id): Observable<any> {
    return this.http.get(this.getArticleByIdUrl + id);
  }

  modifyCategory(data,id): Observable<any> {
    return this.http.post(this.modifyUrl + id, data, { headers: this.getHeaders() });
  }
}
