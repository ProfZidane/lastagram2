import { UserProvider } from './../../providers/user/user';
import { MessageContentPage } from './../message-content/message-content';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
import { SocketProvider } from './../../providers/socket/socket';

/**
 * Generated class for the MessageMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-menu',
  templateUrl: 'message-menu.html',
})
export class MessageMenuPage {
  username;
  id;
  items;
  users;
  Messages = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private socketService: SocketProvider, private userService: UserProvider) {
    /*this.ref2.on('value', resp => {
      this.items = snapshotToArray(resp);
      this.items = this.items.reverse();

      this.items.forEach(element => {

        firebase.database().ref('User/').orderByChild('idReceiver').equalTo(Number(element.idReceiver)).on('value', (snapshot) => {
          this.users = snapshot;
          let data = {
            mgs : element.mgs,
            name : this.users.last_name + ' ' + this.users.first_name,
            createdAt : element.createdAt ,
            idReceiver : element.idReceiver,
            photo : this.users.photo
          }
          this.complet.push(data)
        })
      });
    })*/
  this.username = localStorage.getItem('usernameChat');

  this.socketService.getAllMessages(this.username)
    .subscribe( (data) => {
      console.log(data);
      data.forEach(element => {
        console.log(element);
        let username = "";
        if (element.receiver === localStorage.getItem('usernameChat')) {
          username = element.sender;
        } else {
          username = element.receiver;
        }
        this.userService.getImageUser(username).subscribe(
          (data) => {
            console.log(data);

          }, (err) => {
            console.log(err);

          }
        )
      });
    }, (err) => {
      console.log(err);
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageMenuPage');


  }

  goBack() {
    this.navCtrl.pop();
  }

  goToMessageContent() {
    this.navCtrl.push(MessageContentPage);
  }
}
