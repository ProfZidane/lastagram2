import { BoutiqueGeneralPage } from './../boutique-general/boutique-general';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from './../../providers/search/search';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { StoreProvider } from './../../providers/store/store';

/**
 * Generated class for the SearchWithShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-with-shop',
  templateUrl: 'search-with-shop.html',
})
export class SearchWithShopPage {
Markets;
  constructor(public navCtrl: NavController, public navParams: NavParams, private searchService: SearchProvider, public storeService: StoreProvider, private alertCtrl: AlertController,public toastCtrl: ToastController) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchWithShopPage');
  }

  initializeItems() {
    /*let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();*/
    this.searchService.searchStore().subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        this.Markets = data;
        data.forEach(element => {
          if (element.subscribers.includes(Number(localStorage.getItem('idUser')))) {
            element.isSubscribed = true;
          } else {
            element.isSubscribed = false;
          }
          })

      //  loading.dismiss();
      },
      (err) => {
        console.log("error : " + err );
        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'Echec de chargement. Veuillez réessayer plus tard!',
          buttons: ['OK']
        });
        alert.present();
        //loading.dismiss();
      }
    )
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
      this.Markets = this.researchService(val);
    } else {
      this.initializeItems();
    }
  }

  researchService(val) {
    return this.Markets.filter( (item) => {
      return item.name.toLowerCase().includes(val.toLowerCase());
    });
  }



  ViewMarket(value,b) {
    console.log(value);
    this.navCtrl.push(BoutiqueGeneralPage, { "id": value, "isAbonned" :  b});
  }


  Abonne(id) {
    console.log(id);
    let data = {
      "id_store" : id
    }
    this.storeService.Subscribe(data).subscribe(
      (success) => {
       /* let alert = this.alertCtrl.create({
          title: 'SUCCESS',
          subTitle: 'Vous êtes abonné',
          buttons: ['OK']
        });
        alert.present();*/
        const toast = this.toastCtrl.create({
          message: 'Vous êtes abonné !',
          duration: 3000
        });
        toast.present();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);

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

  DesAbonne(id) {
    console.log(id);
    let data = {
      "id_store" : id
    }
    this.storeService.Subscribe(data).subscribe(
      (success) => {
        const toast = this.toastCtrl.create({
          message: 'Vous êtes maintenat désabonné !',
          duration: 3000
        });
        toast.present();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);

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
