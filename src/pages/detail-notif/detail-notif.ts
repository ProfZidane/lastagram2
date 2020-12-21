import { DetailProductInCartPage } from './../detail-product-in-cart/detail-product-in-cart';
import { BoutiqueGeneralPage } from './../boutique-general/boutique-general';
import { NotificationProvider } from './../../providers/notification/notification';
import { OrderProvider } from './../../providers/order/order';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the DetailNotifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-notif',
  templateUrl: 'detail-notif.html',
})
export class DetailNotifPage {
id_order;
id_notif;
Products;
Notif;
adresse;
commander;
Total;
date;
devis;
  constructor(public navCtrl: NavController, private translate: TranslateService, public navParams: NavParams,public loadingCtrl: LoadingController, private orderService: OrderProvider, private notificationService: NotificationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailNotifPage');
    let loading = this.loadingCtrl.create({
      content: this.translate.instant('LOAD.mgs')
    });
    loading.present();

    this.id_order = this.navParams.get('id_order');

    this.notificationService.getInfoNotification(this.id_order).subscribe(
      (data) => {
     //   console.log("success : " + JSON.stringify(data));
        this.Notif = data;
        this.Products = data.articles;
        this.Products.forEach(element => {
          this.devis = element.devis;
        });
        this.commander = data.owner;
        this.adresse = data.address;
        this.Total = data.total_price;
        this.date = data["ordered_date"];
        console.log("data : " + JSON.stringify(this.Products));
        loading.dismiss();
      }, (error) => {
        console.log("error : ");

          console.log(error.status);
          console.log(error.statusText);
          console.log(error.url);

          loading.dismiss();
      }
    )
  }

  gotomarket(id) {
    console.log(id);
    this.navCtrl.push(BoutiqueGeneralPage, { "id" : id })

  }

  goToDetailProduct(json) {


    this.navCtrl.push(DetailProductInCartPage, { "data" : json });
  }
}
