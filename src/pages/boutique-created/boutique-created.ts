import { MyShopPage } from './../my-shop/my-shop';
import { BoutiquePage } from './../boutique/boutique';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BoutiqueCreatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boutique-created',
  templateUrl: 'boutique-created.html',
})
export class BoutiqueCreatedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoutiqueCreatedPage');
  }

  goToBoutique() {
    this.navCtrl.push(MyShopPage);
  }

}
