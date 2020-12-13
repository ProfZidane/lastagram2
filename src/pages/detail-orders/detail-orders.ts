import { MessageMenuPage } from './../message-menu/message-menu';
import { MessageContentPage } from './../message-content/message-content';
import { OrderProvider } from './../../providers/order/order';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-orders',
  templateUrl: 'detail-orders.html',
})
export class DetailOrdersPage {
time;
date;
DetailOrders;
Articles;
adress;
Total;
  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailOrdersPage');
    this.time = this.navParams.get('time');
    this.date = this.navParams.get('date');
    let data = {
      "id": this.navParams.get('id')
    }
    console.log(JSON.stringify(data));

    this.orderService.getDetailOrders(Number(this.navParams.get('id'))).subscribe(
      (data) => {
        //console.log(data);
        this.DetailOrders = data;
        console.log(JSON.stringify(this.DetailOrders));
        this.Articles = this.DetailOrders.articles;
        console.log(JSON.stringify(this.Articles));
        this.adress = this.DetailOrders.address;
        this.Total = this.DetailOrders.total_price;

      }, (err) => {
        console.log("error : " + JSON.stringify(err));

      }
    )
  }

  goToMessage() {
    this.navCtrl.push(MessageMenuPage);
  }

}
