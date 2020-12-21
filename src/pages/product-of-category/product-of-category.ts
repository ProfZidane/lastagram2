import { DetailProductPage } from './../detail-product/detail-product';
import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SearchProvider } from './../../providers/search/search';
import { TranslateService } from '@ngx-translate/core';
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
  next;
  constructor(private platform: Platform, private translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider,public loadingCtrl: LoadingController, private searchService: SearchProvider, private app: App) {

    this.platform.registerBackButtonAction( () => {
      let nav = this.app.getActiveNav();
      if (nav.canGoBack()) {
        nav.pop();
        //nav.popTo(ProfilePage)
      } else {
        console.log("peut plus reculer");
        //this.navCtrl.push(LoginPage);
        this.platform.exitApp();
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductOfCategoryPage');

    let loading = this.loadingCtrl.create({
      content: this.translate.instant('LOAD.mgs')
    });
    loading.present();
    this.name_catg = this.navParams.get('name');
    console.log(this.name_catg);


    if (this.navParams.get('status')) {
      if(this.navParams.get('status') == 'high') {
        this.storeService.getProductHigh(this.navParams.get('id')).subscribe(
          (data) => {
            this.Products = data.results;
            this.next = data.next;
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
        this.Products = data.results;
        this.next = data.next;


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

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    console.log(this.next);

    setTimeout(() => {
      if (this.next !== null) {
        this.searchService.searchInfinite(this.next).subscribe(
          (data) => {
            let data_next = data.results;
            console.log(data);
            console.log(data);

            data_next.forEach(element => {
              if (element !== null) {
                this.Products.push( element );
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
