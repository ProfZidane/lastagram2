import { DetailProductInCartPage } from './../detail-product-in-cart/detail-product-in-cart';

import { OrderProvider } from './../../providers/order/order';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the DetailOrderMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-order-me',
  templateUrl: 'detail-order-me.html',
})
export class DetailOrderMePage {
id_order;
id_store;
Products;
adresse;
ttc;
date;
proprio;
diff = 0;
devis;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, private orderService: OrderProvider) {
    this.id_order = this.navParams.get('id');
    this.id_store = Number(this.navParams.get('id_store'));
    this.devis = this.navParams.get('devis');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailOrderMePage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    this.orderService.getDetailOrders(Number(this.id_order)).subscribe(
      (data) => {
        //console.log("art : " + JSON.stringify(data.articles));

        this.Products = data.articles;

        this.Products.forEach(element => {
          if (element.store === this.id_store) {
            let p = Number(element.article.promo_price) * Number(element.quantity);
            console.log(p);

            this.diff += p;
          }
        });
        console.log(this.diff);

        this.proprio = data.owner;
        this.adresse = data.address;
        this.ttc = data.total_price;
        this.date = data.ordered_date;
        console.log("action : " + this.date);

        loading.dismiss();
      }, (err) => {
        console.log(err);
        loading.dismiss();
      }
    )
  }


  goToDetailProduct(json) {


    this.navCtrl.push(DetailProductInCartPage, { "data" : json });
  }

}
