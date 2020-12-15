import { DOMAIN_APP } from './../../app/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HTTP } from '@ionic-native/http/ngx';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  private registerUrl = DOMAIN_APP + "auth/users/";
  private loginUrl = DOMAIN_APP + "auth/jwt/create/";
  private infoUrl = DOMAIN_APP + "auth/users/me/";
  private updateUrl = DOMAIN_APP + "auth/users/me/";
  private updatePasswordUrl = DOMAIN_APP + "auth/users/set_password/";
  private setImageUrl = DOMAIN_APP + "auth/set_photo/";
  private emailToResetPasswordURL = DOMAIN_APP + "reset-password-email";
  private checkUser = DOMAIN_APP + "auth/users/";

  private assistanceUrl = DOMAIN_APP + "assistance";

  private confirmCodeUrl = DOMAIN_APP + "activate/";

  headers = new HttpHeaders({
    'Content-Type' : 'application/json; charset=utf-8',
    'Authorization' : 'JWT ' + localStorage.getItem ('userToken')
  });

  constructor(public http: HttpClient) {
    //console.log('Hello UserProvider Provider');
  }

  // get headers
  getHeaders() {
    return new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization' : 'JWT ' + localStorage.getItem('userToken')
    });
  }

  // register
  registerUser(data) :  Observable<any> {
      return this.http.post(this.registerUrl,data);
  }

  // login
  loginUser(data) : Observable<any> {
    return this.http.post(this.loginUrl,data);
  }

  // update
  updateUsers(data) : Observable<any> {
    return this.http.patch(this.updateUrl, data, { headers: this.getHeaders() });
  }

  // update password
  updatePasswordUsers(data) : Observable<any> {
    return this.http.post(this.updatePasswordUrl, data, { headers: this.getHeaders() });
  }

  // set image
  setImage(data,id) : Observable<any> {
    return this.http.patch(this.setImageUrl + id,data, { headers : this.getHeaders() });
  }

  // find data
  findData() : Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization' : 'JWT ' + localStorage.getItem('userToken')
    });
    //headers.append('Authorization', ':JWT ' + localStorage.getItem('userToken') );

    return this.http.get(this.infoUrl, {'headers' : headers});
  }


  sendMailToResetPassword(data): Observable<any> {
    return this.http.post(this.emailToResetPasswordURL, data);
  }

  getImageUser(username): Observable<any> {
    return this.http.get(this.checkUser + username , { headers: this.getHeaders() });
  }

  sendMail(email): Observable<any> {
    return this.http.post(this.assistanceUrl + "/", email, { headers: this.getHeaders() });
  }

  confirmation(data): Observable<any> {
    return this.http.post(this.confirmCodeUrl, data);
  }

  getInfoUser(id): Observable<any> {
    return this.http.get(this.checkUser + id + "/", { headers: this.getHeaders() });
  }
}
