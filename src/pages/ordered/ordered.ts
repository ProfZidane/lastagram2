import { MyOrdersPage } from './../my-orders/my-orders';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordered',
  templateUrl: 'ordered.html',
})
export class OrderedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderedPage');
  }

  goToMYOrders() {
    this.navCtrl.push(MyOrdersPage);
  }
}
