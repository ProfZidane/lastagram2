import { ModifyProdSpecialPage } from './../modify-prod-special/modify-prod-special';
import { AddProductSpecialPage } from './../add-product-special/add-product-special';
import { ModifyProdPage } from './../modify-prod/modify-prod';
import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SearchProvider } from './../../providers/search/search';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the ListProdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-prod',
  templateUrl: 'list-prod.html',
})
export class ListProdPage {
id;
id_market;
slug;
articles;
taille;
state = false;
  next: any;
  constructor(public navCtrl: NavController, private translate: TranslateService, public navParams: NavParams, private storeService: StoreProvider,public loadingCtrl: LoadingController, private alertCtrl: AlertController, private searchService: SearchProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListProdPage');
    let loading = this.loadingCtrl.create({
      content: this.translate.instant('LOAD.mgs')
    });
    loading.present();
    console.log(this.navParams.get('id_catg'));
    this.id = this.navParams.get('id_catg');
    this.id_market = this.navParams.get('id_boutique');
    this.slug = this.navParams.get('slug');
    console.log(this.id_market);

    this.storeService.getProductByCatg(this.id_market,this.id).subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        this.articles = data.results;
        this.next = data.next;
        this.taille = data.results.length;
        console.log(this.taille);

        if (this.taille == 49) {
          this.state = true;
        } else if (this.taille < 49 ) {
          this.state = false;
        }

        loading.dismiss();
      },
      (error) => {
        console.log(error);
      }
    )

  }

  modify(json) {
    console.log(json);
    this.navCtrl.push(ModifyProdPage, { "0" : json, "etat" : "normal", "id" : this.id, "slug": this.slug });
  }

  delete(id) {
    let loading = this.loadingCtrl.create({
      content: this.translate.instant('LOAD.mgs')
    });
    loading.present();
    console.log(id);
    this.storeService.delShopById(id).subscribe(
      (success) => {
        console.log(success);
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'SUCCESS',
          subTitle: 'Supprimer avec succès',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      },
      (error) => {
        console.log(error);
        loading.dismiss();

        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'Echec de la suppression',
          message: 'Veuillez verifiez réessayer plus part !',
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }

  AddNewProd() {
    this.navCtrl.push(ModifyProdSpecialPage, { "id_catg": this.id, "id_market": this.id_market });
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
                this.articles.push( element );
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

}
