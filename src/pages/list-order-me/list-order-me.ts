import { Component } from '@angular/core';
import { OrderProvider } from './../../providers/order/order';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListOrderMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-order-me',
  templateUrl: 'list-order-me.html',
})
export class ListOrderMePage {
id;
Orders = [];
grouped;
next;
  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderProvider) {
    this.id = this.navParams.get('id');
    this.getOrderByMarket();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOrderMePage');
  }

  getOrderByMarket() {
    this.orderService.getOrderByMarketID(Number(this.id)).subscribe(
      (data) => {
         console.log(data);
         this.next = data.next;
         this.Orders = data.results;

      }, (err) => {

        console.log(err);

      }
    )
  }

}
