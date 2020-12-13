import { DetailProductPage } from './../detail-product/detail-product';
import { SearchProvider } from './../../providers/search/search';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SearchByMarketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-by-market',
  templateUrl: 'search-by-market.html',
})
export class SearchByMarketPage {
  Products;
  id;
  TotalProduct;
  next;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private searchService: SearchProvider) {
    this.id = this.navParams.get('id');
    console.log('id : ' + this.id);

    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchByMarketPage');
  }

  goToDetailProduct(id,id2,id3) {
    console.log(id,id2,id3);

    this.navCtrl.push(DetailProductPage, { "id" : id, "id_market": id2, "owner": id3 });
  }

  initializeItems() {
    /*let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();*/
    let data = {
      "id_store" : Number(this.id)
    }
    console.log(data);

    this.searchService.searchProductByStore(data).subscribe(
      (data) => {
        //console.log(JSON.stringify(data));
        this.Products = data.results;
        this.TotalProduct = data.results;
        console.log("data : " + JSON.stringify(data));

      //  loading.dismiss();
      },
      (err) => {
        console.log("error : " + err );
        //loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'Echec de chargement. Veuillez réessayer plus tard!',
          buttons: ['OK']
        });
        alert.present();
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
      this.Products = this.researchService(val);
    } else {
      this.Products = this.TotalProduct;
    }
  }

  researchService(val) {
    return this.Products.filter( (item) => {
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
                this.Products.push( element );
                this.TotalProduct.push(element);
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
