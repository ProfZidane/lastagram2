import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { DOMAIN_APP, SERVER_SOCKET_APP, SOCKET_SERVER } from './../../app/environment';


/*
  Generated class for the SocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketProvider {
  private connectUrl = DOMAIN_APP + "/chat/";
  private messageUrl = SERVER_SOCKET_APP + "chat/";

  readonly url: string = "ws://192.168.1.103:3000";
  socket:any;
  constructor(public http: HttpClient) {
    console.log('Hello SocketProvider Provider');

    //this.socket = Observable.webSocket(this.url);
  }

  // get headers
  getHeaders() {
    return new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization' : 'JWT ' + localStorage.getItem('userToken')
    });
  }

  getMessages(username,other_username): Observable<any>{
      return this.http.get(this.messageUrl + username + "/" + other_username + "/");
  }



  setMessages(socket,messages) {
    //console.log(socket);

    socket.onmessage = function(m) {
      let data = JSON.parse(m.data)
      console.log(data);

      let mgs = {
        sender: data.username,
        message: data.message,
        timestamp : data.created_at
      }
      messages.push(mgs);
    }
  }


}
