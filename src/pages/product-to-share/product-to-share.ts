import { StoreProvider } from './../../providers/store/store';
import { ProductSharedPage } from './../product-shared/product-shared';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SearchProvider } from './../../providers/search/search';
import { DEEP_LINK_DOMAIN } from '../../app/environment';


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
Total;
next;
id_market;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider,public loadingCtrl: LoadingController, private alertCtrl: AlertController, private socialSharing: SocialSharing, private searchService: SearchProvider, private app: App) {
    this.id_market = this.navParams.get('id');

    this.platform.registerBackButtonAction( () => {
      let nav = this.app.getActiveNav();
      if (nav.canGoBack()) {
        this.navCtrl.pop();
      } else {

        this.navCtrl.popToRoot()
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductToSharePage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    let data = {
      "id_store" : Number(this.id_market)
    }
    console.log(data);

    this.searchService.searchProductByStore(data).subscribe(
      (data) => {
        this.products = data.results;
        this.Total = data.results
        this.next = data.next;
        this.products.visibility = false;
        console.log("obj : " + JSON.stringify(data));
        console.log(this.next);

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




  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    /*if (val && val.trim() != '') {
      this.Products = this.Products.filter((item) => {
        //return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return item.name.toLowerCase().includes(val.toLowerCase());
      })
    }*/
    if (val && val.trim() != '') {
      this.products = this.researchService(val);
    } else {
      //this.initializeItems();
      this.products = this.Total;
    }
  }


  researchService(val) {
    return this.Total.filter( (item) => {
      return item.name.toLowerCase().includes(val.toLowerCase());
    });
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
                this.products.push( element );
                //this.Total.push(element);
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


  shareOptions() {
    let img = [];
    this.selected.forEach( elt => {
      img.push(elt.image_cover);
    });
    console.log(JSON.stringify(img));

    let option = {
      message : "Etes vous intéressez par mes produits ?",
      files: img,
      url: DEEP_LINK_DOMAIN, // after url de la boutique peut être
      chooserTitle: "Choisissez une application"
    }
    this.socialSharing.shareWithOptions(option);
  }

}
