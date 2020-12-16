import { BoutiqueGeneralPage } from './../boutique-general/boutique-general';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { OrderProvider } from './../../providers/order/order';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the DetailProductInCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-product-in-cart',
  templateUrl: 'detail-product-in-cart.html',
})
export class DetailProductInCartPage {
data;
quantity;
store;
  constructor(public navCtrl: NavController,private socialSharing: SocialSharing, public navParams: NavParams, private app: App, private photoViewer: PhotoViewer) {
    this.data = this.navParams.get('data');
    console.log("data : " + JSON.stringify(this.data));
    this.data.article.description = decodeURI(this.data.article.description);
    this.quantity = this.data.quantity;
    this.store = this.data.store;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProductInCartPage');
  }

  zoomImg(img) {
    /*const modal = this.modalCtrl.create(ImageVieweerPage, { img : this.product.image_cover});
    modal.present();*/
    this.photoViewer.show(img);
  }

  goToMarket() {
    console.log(this.store);
    this.navCtrl.push(BoutiqueGeneralPage, { "id" : this.store });
  }


}
