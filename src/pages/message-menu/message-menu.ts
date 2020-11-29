import { MessageContentPage } from './../message-content/message-content';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
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
  ref = firebase.database().ref('User/');
  ref2 = firebase.database().ref('Messages/').orderByChild('idReceiver').equalTo(Number(localStorage.getItem('idUser')));
  id;
  items;
  users;
  complet = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref2.on('value', resp => {
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
    })



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
