import { ListOrderMePage } from './../list-order-me/list-order-me';
import { OrderProvider } from './../../providers/order/order';
import { BoutiquePage } from './../boutique/boutique';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreProvider } from './../../providers/store/store';
import { AlertController } from 'ionic-angular';


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
  devis;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, private orderService: OrderProvider, private storeService: StoreProvider) {
    this.id = this.navParams.get("id");
    this.photo = this.navParams.get('photo');
    this.name = this.navParams.get('name');
    this.devis = this.navParams.get('devis');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuMarketPage');

  }

  goToMyOrder() {
    this.navCtrl.push(ListOrderMePage, { id : this.id, devis: this.devis });
  }

  /*goToMyMessages() {
    this.navCtrl.push()
  }*/

  DeleteMarket(id) {
    console.log(id);

    this.storeService.delShopById(id).subscribe(
      (success) => {
        console.log(success);
        let alert = this.alertCtrl.create({
          title: 'SUCCESS',
          subTitle: 'Votre boutique a été supprimée!',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.popToRoot();

      },
      (error) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'L\'opération n\'a pas abouti !',
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }


  getMessageByMarket() {

  }
}
