import { ListOrderMePage } from './../list-order-me/list-order-me';
import { OrderProvider } from './../../providers/order/order';
import { BoutiquePage } from './../boutique/boutique';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreProvider } from './../../providers/store/store';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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
  constructor(public navCtrl: NavController,private translate: TranslateService,
    public navParams: NavParams,private alertCtrl: AlertController, private orderService: OrderProvider, private storeService: StoreProvider) {
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

  ConfirmDel(id) {
    let alert = this.alertCtrl.create({
      title: this.translate.instant('ALERT.warn_title'),
      subTitle: this.translate.instant('ALERT.conf_mgs'),
      buttons: [
        {
          text : this.translate.instant('ALERT.res_pos'),
          handler: () => {
            this.DeleteMarket(id)
          }
        },{
          text : this.translate.instant('ALERT.res_neg'),
          role: 'cancel',
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  DeleteMarket(id) {
    console.log(id);

    this.storeService.delShopById(id).subscribe(
      (success) => {
        console.log(success);
        let alert = this.alertCtrl.create({
          title: this.translate.instant('ALERT.succ_title'),
          subTitle: this.translate.instant('ALERT.succ_sub_shop'),
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.popToRoot();

      },
      (error) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: this.translate.instant('ALERT.err_title'),
          subTitle: this.translate.instant('ALERT.err_action'),
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }


  getMessageByMarket() {

  }
}
