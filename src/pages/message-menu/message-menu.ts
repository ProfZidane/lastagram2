import { MessageContentPage } from './../message-content/message-content';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
