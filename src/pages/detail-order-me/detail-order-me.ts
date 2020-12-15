
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
Products;
adresse;
ttc;
date;
proprio;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, private orderService: OrderProvider) {
    this.id_order = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailOrderMePage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    this.orderService.getDetailOrders(Number(this.id_order)).subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        this.Products = data.articles;
        this.proprio = data.owner;
        this.adresse = data.address;
        this.ttc = data.total_price;
        this.date = data.ordered_date;
        loading.dismiss();
      }, (err) => {
        console.log(err);
        loading.dismiss();
      }
    )
  }



}
