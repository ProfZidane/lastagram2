import { DetailOrdersPage } from './../detail-orders/detail-orders';
import { OrderProvider } from './../../providers/order/order';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from './../../providers/search/search';

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
next;
  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderProvider, private searchService: SearchProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrdersPage');
    this.orderService.getListOrder().subscribe(
      (data) => {
        console.log(data);
        this.Orders = data.results;
        this.next = data.next;
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

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    console.log(this.next);

    setTimeout(() => {
      if (this.next !== null) {
        this.searchService.searchInfinite(this.next).subscribe(
          (data) => {
            let data_next = data.results;
            console.log(data);
            console.log(data);

            data_next.forEach(element => {
              if (element !== null) {
                this.Orders.push( element );
                //this.Total.push(element);
              }
            });

            this.next = data.next;

          }
        )
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }


}
