import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the ShopToSharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-to-share',
  templateUrl: 'shop-to-share.html',
})
export class ShopToSharePage {
  Markets: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider,public loadingCtrl: LoadingController, private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopToSharePage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    this.storeService.getMyShop().subscribe(
      (data) => {
        console.log(data);
        this.Markets = data
        loading.dismiss();
      }
     )
  }



  LinkShop(id_market,name,isAbonne) {
    console.log(id_market,isAbonne);
    let option = {
      message : "Visitez ma boutique " + name,
      files: null,
      url: "lastagram://lastagram.herokuapp.com/market/"+id_market+"/"+isAbonne,
      chooserTitle: "Choisissez une application"
    }
    this.socialSharing.shareWithOptions(option);
  }
}
