import { MenuMarketPage } from './../menu-market/menu-market';
import { BoutiquePage } from './../boutique/boutique';
import { HomePage } from './../home/home';

import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
import { SearchProvider } from './../../providers/search/search';
import { CreateBoutiquePage } from './../create-boutique/create-boutique';

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
  next;
  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider, private alertCtrl: AlertController,public loadingCtrl: LoadingController, private app: App, private searchService: SearchProvider) {

    this.platform.registerBackButtonAction( () => {
      let nav = this.app.getActiveNav();

      if (nav.canGoBack()) {
        console.log("je reviens en arriere !");

        console.log(this.navCtrl.getActiveChildNav());
        this.navCtrl.popToRoot();
      } else {
        this.platform.exitApp();
      }
    })

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
        this.next = data.next;
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

  goToCreatedMarket() {
    this.navCtrl.push(CreateBoutiquePage);
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

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      if (this.next !== null) {
        this.searchService.searchInfinite(this.next).subscribe(
          (data) => {
            let data_next = data.results;
            console.log(data);
            console.log(data);

            data_next.forEach(element => {
              if (element !== null) {
                this.Markets.push( element );
                //this.total.push(element);
              }
            });

            this.next = data.next;

          }
        )
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
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
