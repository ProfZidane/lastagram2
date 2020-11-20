import { CartPage } from './../cart/cart';
import { SearchPage } from './../search/search';
import { ProfilePage } from './../profile/profile';
import { LoginPage } from './../login/login';

import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ModalController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = SearchPage;
  tab3Root = CartPage;
  tab4Root = ProfilePage;

  visibility = false;
  authed;
  constructor(public modalCtrl: ModalController) {
    /*if (localStorage.getItem('userToken') === null) {
        //this.navCtrl.push(HomePage);
        const modal = this.modalCtrl.create(HomePage);
        modal.present();
    }*/
  }

  /*ionViewCanEnter(): boolean {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      return false;
    }
  }*/


}
