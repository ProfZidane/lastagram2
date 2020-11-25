import { DetailProductPage } from './../detail-product/detail-product';
import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ProductOfCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-of-category',
  templateUrl: 'product-of-category.html',
})
export class ProductOfCategoryPage {
  id_market;
  id_category;
  Products = [];
  id_owner;
  name_catg:string;
  devis;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductOfCategoryPage');

    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    this.name_catg = this.navParams.get('name');
    console.log(this.name_catg);


    if (this.navParams.get('status')) {
      if(this.navParams.get('status') == 'high') {
        this.storeService.getProductHigh(this.navParams.get('id')).subscribe(
          (data) => {
            this.Products = data;
            //this.devis = data.store.devis;

            console.log(this.Products);
            loading.dismiss();

          }, (err) => {
            console.log(err);
            console.log('ff');

            loading.dismiss();
          }
        )
      }
    } else {
      this.id_market = this.navParams.get("id_boutique");
    this.id_category = this.navParams.get("id_catg");
    this.devis = this.navParams.get('devis');

    /*this.id_owner = this.navParams.get('owner');
    console.log("propio : " + this.id_owner);*/
    this.storeService.getProductByCatg(this.id_market,this.id_category).subscribe(
      (data) => {
        console.log(data);
        this.Products = data;


        console.log(this.Products);
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    )
    }

  }

  goToDetail(id,id_market,id_owner2, devis2) {
    console.log(id);
    console.log(id_owner2);
    console.log(devis2);

    this.navCtrl.push(DetailProductPage, { "id" : id, "id_market": id_market, "owner" : id_owner2 , "devis": this.devis, "devis2" : devis2});

    /*if (id_owner1 == num) {
      this.navCtrl.push(DetailProductPage, { "id" : id, "id_market": id_market, "owner" : id_owner2 });
    } else if (id_owner2 == undefined) {
      this.navCtrl.push(DetailProductPage, { "id" : id, "id_market": id_market, "owner" : id_owner1 });
    }*/


  }

}
