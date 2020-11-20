import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { DOMAIN_APP } from './../../app/environment';


/*
  Generated class for the SocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketProvider {
  private connectUrl = DOMAIN_APP + "/chat/";
  readonly url: string = "ws://192.168.1.103:3000";
  socket:any;
  constructor(public http: HttpClient) {
    console.log('Hello SocketProvider Provider');
    this.socket = io(this.url);
    //this.socket = Observable.webSocket(this.url);
  }

  // get headers
  getHeaders() {
    return new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization' : 'JWT ' + localStorage.getItem('userToken')
    });
  }

  connectSocket(username): Observable<any> {
   return this.http.get(this.connectUrl + username, { headers: this.getHeaders() });
  }


  // function to socket

  listen(eventName: string) {
    return new Observable( (subscriber)=>{
      this.socket.on(eventName, (data) => {
        console.log(data);
        subscriber.next(data);

      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  sendMessage(msg: any) {
    this.socket.next(msg);
  }
  close() {
    this.socket.complete();
  }
/*
  getUrl() {
    return this.url;
  }

  setUrl (value) {
    this.url = value;
  }

  connect(url) {
        this.socket = webSocket(url);
        console.log("socket is ready ...");



    //return webSocket(this.url);
  }

  test(value) {
    this.socket.next(value)
  }*/



}
