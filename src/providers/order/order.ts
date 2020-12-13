import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DOMAIN_APP } from './../../app/environment';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {
  private addCartUrl = DOMAIN_APP + "payment/add-to-cart/";
  private getProdUrl = DOMAIN_APP + "payment/my-order/";

  private updateQteUrl = DOMAIN_APP + "payment/order-article/update-quantity/";
  private deleteUrl = DOMAIN_APP + "payment/order-articles/delete/";
  private addPlaceUrl = DOMAIN_APP + "payment/adress";
  private validationUrl = DOMAIN_APP + "payment/checkout";
  private listOrdersUrl = DOMAIN_APP + "payment/my-orders";

  private orderByShopURL = DOMAIN_APP + "payment/my-order-store/";

  constructor(public http: HttpClient) {
    console.log('Hello OrderProvider Provider');
  }

  //Headers
  // get headers
  getHeaders() {
    return new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization' : 'JWT ' + localStorage.getItem('userToken')
    });
  }

  // Parts to cart
  addToCart(data): Observable<any> {
    return this.http.post(this.addCartUrl, data, { headers: this.getHeaders() });
  }

  getProductToCart(): Observable<any> {
    return this.http.get(this.getProdUrl , { headers: this.getHeaders() });
  }

  updateQuantity(data): Observable<any> {
    return this.http.post(this.updateQteUrl, data, { headers: this.getHeaders() });
  }

  deleteInCart(id): Observable<any> {
    return this.http.delete(this.deleteUrl + id, { headers: this.getHeaders() });
  }


  // checkout
  addPlace(data): Observable<any> {
    return this.http.post(this.addPlaceUrl, data, { headers: this.getHeaders() });
  }
  validation(data): Observable<any> {
    return this.http.post(this.validationUrl,data,{ headers: this.getHeaders() });
  }


  // Parts to orders
  getListOrder(): Observable<any> {
    return this.http.get(this.listOrdersUrl, { headers: this.getHeaders() });
  }

  getDetailOrders(id): Observable<any> {
    return this.http.get(this.getProdUrl + id,{ headers: this.getHeaders() });
  }

  getOrderByMarketID(id): Observable<any> {
    return this.http.get(this.orderByShopURL + id, { headers : this.getHeaders() });
  }
}

