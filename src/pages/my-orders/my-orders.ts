import { DetailOrdersPage } from './../detail-orders/detail-orders';
import { OrderProvider } from './../../providers/order/order';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {
Orders;
date_order;
time_order;
  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrdersPage');
    this.orderService.getListOrder().subscribe(
      (data) => {
        console.log(data);
        this.Orders = data;
        /*this.date_order = data.ordered_date.substr(0,10);
        this.time_order = data.ordered_date.substr(11);*/
        console.log(this.date_order + ' ' + this.time_order);

        console.log(this.Orders);

      }, (err) => {
        console.log(err);

      }
    )
  }

  goToDetail(id,value,value1) {
    this.navCtrl.push(DetailOrdersPage, { id: id, date: value, time: value1 });
  }


}
