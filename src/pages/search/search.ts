import { SearchWithProductPage } from './../search-with-product/search-with-product';
import { SearchWithShopPage } from './../search-with-shop/search-with-shop';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  autoManufacturers;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  goToSearchWithShop() {
    console.log(this.autoManufacturers);
    this.navCtrl.push(SearchWithShopPage);
  }

  goToSearchWithProduct() {
    console.log(this.autoManufacturers);
    this.navCtrl.push(SearchWithProductPage);
  }


}
