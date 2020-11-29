import { MenuMarketPage } from './../menu-market/menu-market';
import { BoutiquePage } from './../boutique/boutique';
import { HomePage } from './../home/home';

import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
/**
 * Generated class for the MyShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-shop',
  templateUrl: 'my-shop.html',
})
export class MyShopPage {
  Market = {
    "id" : Number,
    "name" : "",
    "subscribers_count" : Number,
  }

  Markets;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider, private alertCtrl: AlertController,public loadingCtrl: LoadingController, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyShopPage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();

    /*firebase.database().ref("/Markets/").orderByChild('owner').equalTo(2).on('value', (snapshot) => {
      let data = snapshot.val();
      console.log(Object.keys(data));

     // console.log("data market " + JSON.stringify(data));
    })*/
    this.storeService.getMyShop().subscribe(
      (data) => {
        console.log(data);
        this.Markets = data.results
        loading.dismiss();

      },
      (err) => {
        console.log(err);
        localStorage.clear();

    localStorage.setItem('new', 'false');

    loading.dismiss();
    /*const modal = this.modalCtrl.create(HomePage);
    modal.present();*/
    this.app.getRootNav().setRoot(HomePage);
      }


     )

  }


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
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
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

  goToMarket(id) {
    console.log(id);
    this.navCtrl.push(BoutiquePage, { "id": id });
  }

  Abonne(id) {
    console.log(id);
    let data = {
      "id_store" : id
    }
    this.storeService.Subscribe(data).subscribe(
      (success) => {
        let alert = this.alertCtrl.create({
          title: 'SUCCESS',
          subTitle: 'Vous êtes abonnés',
          buttons: ['OK']
        });
        alert.present();
      },
      (error) => {
        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'L\'opération n\'a pas abouti !',
          buttons: ['OK']
        });
        alert.present();
      }
    )

  }
}
