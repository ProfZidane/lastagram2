import { BoutiquePage } from './../boutique/boutique';
import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider, private alertCtrl: AlertController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyShopPage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();

    /*firebase.database().ref("/Markets/").on('value', (snapshot) => {
      let data = snapshot.exportVal();
      console.log("data market " + JSON.stringify(data));
    })*/
    this.storeService.getMyShop().subscribe(
      (data) => {
        console.log(data);
        this.Markets = data
      },
      (err) => {
        console.log(err);
      }


     )

     loading.dismiss();
  }


  DeleteMarket(id) {
    console.log(id);
    let data = {
      "id_store" : id
    }
    this.storeService.delShopById(data).subscribe(
      (success) => {
        console.log(success);
        let alert = this.alertCtrl.create({
          title: 'SUCCESS',
          subTitle: 'Votre boutique a été supprimée!',
          buttons: ['OK']
        });
        alert.present();
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
