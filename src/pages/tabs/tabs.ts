import { MyNotifPage } from './../my-notif/my-notif';
import { CartPage } from './../cart/cart';
import { SearchPage } from './../search/search';
import { ProfilePage } from './../profile/profile';
import { LoginPage } from './../login/login';

import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ModalController, NavController } from 'ionic-angular';

import { OrderProvider } from './../../providers/order/order';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = CartPage;
  tab3Root = MyNotifPage;
  tab4Root = ProfilePage;

  visibility = false;
  authed;
  count;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, private orderService: OrderProvider) {
    /*if (localStorage.getItem('userToken') === null) {
        //this.navCtrl.push(HomePage);
        const modal = this.modalCtrl.create(HomePage);
        modal.present();
    }*/

    /*setInterval( () => {
      this.countCart();
    },2000);*/

  }

  countCart() {
    this.orderService.getProductToCart().subscribe(
      (data) => {
        if (data.message) {
          console.log("dd");
          this.count = 0;
        } else {
          this.count = data.articles.length;
        }
        console.log("e : " + this.count);

      }
    )
  }

  /*ionViewCanEnter(): boolean {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      return false;
    }
  }*/



}
