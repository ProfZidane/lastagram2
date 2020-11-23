import { OrderProvider } from './../../providers/order/order';
import { BoutiquePage } from './../boutique/boutique';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MenuMarketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-market',
  templateUrl: 'menu-market.html',
})
export class MenuMarketPage {
  rootPage = BoutiquePage;
  id;
  photo;
  name;
  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderProvider) {
    this.id = this.navParams.get("id");
    this.photo = this.navParams.get('photo');
    this.name = this.navParams.get('name');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuMarketPage');

  }

  getOrderByMarket() {
    this.orderService.getOrderByMarketID(Number(this.id)).subscribe(
      (data) => {
        console.log(data);

      }, (err) => {

        console.log(err);

      }
    )
  }

  getMessageByMarket() {

  }
}
