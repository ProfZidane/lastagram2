import { StoreProvider } from './../../providers/store/store';
import { ProductSharedPage } from './../product-shared/product-shared';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the ProductToSharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-to-share',
  templateUrl: 'product-to-share.html',
})
export class ProductToSharePage {
selected = [];
visibility = false;
error;
products;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider,public loadingCtrl: LoadingController, private alertCtrl: AlertController, private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductToSharePage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    this.storeService.getProductOfUser().subscribe(
      (data) => {
        this.products = data;
        this.products.visibility = false;
        //console.log("obj : " + JSON.stringify(data));
        loading.dismiss();
      }, (err) => {
        console.log('rtt : ' + err);
        console.log(err.status);
        console.log(err.url);
        console.log(err.statusText);
        loading.dismiss();

        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'L\'opération n\'a pas abouti !',
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }

  goToProductShared() {
    this.navCtrl.push(ProductSharedPage);
  }


  selectedProduct(obj) {

    if (this.selected.length === 0) {
      console.log('ajout first');
      this.selected.push(obj);
      obj.visibility = true;

    } else if (this.selected.length === 6) {

        console.log("vous navez plus le droit dajouter ");

        let alert = this.alertCtrl.create({
          title: 'ATTENTION',
          subTitle: 'Vous avez atteint le nombre maximal de (6) produits !',
          buttons: ['OK']
        });
        alert.present();

    } else {
      console.log(this.selected.length);
      console.log(this.selected.includes(obj));
      if (this.selected.includes(obj) === true ) {
        let index = this.selected.indexOf(obj);
        this.selected.splice(index,1);
        obj.visibility = false;
      } else {
        console.log("dd faux");
          obj.visibility = true;
          this.selected.push(obj);
      }

      /*this.selected.forEach(element => {
        if ((element.id == obj.id && element.name == obj.name)) {
          console.log("dd juste");
          let index = this.selected.indexOf(element);
          this.selected.splice(index,1);
          obj.visibility = false;
        } else  {
          console.log("dd faux");
          obj.visibility = true;
          this.selected.push(obj);

        }
      });*/
    }

    /*if (this.selected.includes(obj)) {
      console.log('dedans');


    } else {
      this.visibility = true;
      this.selected.push(obj);
    }*/

  }


  shareOptions() {
    let img = [];
    this.selected.forEach( elt => {
      img.push(elt.image_cover);
    });
    console.log(JSON.stringify(img));

    let option = {
      message : "Etes vous intéressez par mes produits ?",
      files: img,
      url: "lastagram://lastagram.herokuapp.com/",
      chooserTitle: "Choisissez une application"
    }
    this.socialSharing.shareWithOptions(option);
  }

}
