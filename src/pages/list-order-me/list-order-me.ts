import { DetailOrdersPage } from './../detail-orders/detail-orders';
import { Component } from '@angular/core';
import { OrderProvider } from './../../providers/order/order';
import { UserProvider } from './../../providers/user/user';

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
keys;
datas = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderProvider, private userService: UserProvider) {
    this.id = this.navParams.get('id');
    this.getOrderByMarket();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOrderMePage');
  }

  getOrderByMarket() {
    this.orderService.getOrderByMarketID(Number(this.id)).subscribe(
      (data) => {
         console.log(JSON.stringify(data));
         this.next = data.next;
         this.Orders = data.result;



        console.log(JSON.stringify(this.Orders));

        this.Orders.forEach(elt => {
          let len = elt.length;
          elt.forEach(element => {
            element.taille = len;
            this.datas.push(element);
          });
        })

        console.log(" datas:  " + JSON.stringify(this.datas));

      }, (err) => {

        console.log(JSON.stringify(err));

      }
    )
  }

  goToDetailOrders(id) {
    this.navCtrl.push(DetailOrdersPage, { id: id, date: null, time: null });
    //console.log(id);

  }




}
