import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from './../../providers/order/order';

/**
 * Generated class for the DetailOrderMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-order-me',
  templateUrl: 'detail-order-me.html',
})
export class DetailOrderMePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailOrderMePage');
  }



}
