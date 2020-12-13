import { DOMAIN_APP } from './../../app/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  private createNotificationUrl = DOMAIN_APP +  "notification/create";
  private seeNotificationUrl = DOMAIN_APP +  "notification/my_notifications";
  private confirmationSeenNotificationUrl = DOMAIN_APP +  "notification/update_seen/";
  private detailNotificationUrl = DOMAIN_APP +  "payment/notif_order_by_id/";
  //private alreadySeeNotificationUrl = "https://lastagram.herokuapp.com/notification/my_notifications";

  constructor(public http: HttpClient) {
    console.log('Hello NotificationProvider Provider');
  }

  //Headers
  // get headers
  getHeaders() {
    return new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization' : 'JWT ' + localStorage.getItem('userToken')
    });
  }


  createNotification(data): Observable<any> {
    return this.http.post(this.createNotificationUrl, data, { headers: this.getHeaders() });
  }

  getNewNotification(): Observable<any> {
    return this.http.get(this.seeNotificationUrl, { headers: this.getHeaders() });
  }

  confirmationSeenNotif(id, data): Observable<any> {
    return this.http.patch(this.confirmationSeenNotificationUrl + id, data, { headers: this.getHeaders() })
  }

  getInfoNotification(id): Observable<any> {
    return this.http.get(this.detailNotificationUrl + id, { headers: this.getHeaders() });
  }

}
