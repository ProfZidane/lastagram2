import { SearchProvider } from './../../providers/search/search';
import { DetailProductPage } from './../detail-product/detail-product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the SearchWithProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-with-product',
  templateUrl: 'search-with-product.html',
})
export class SearchWithProductPage {
Products;
Total;
next;
  constructor(public navCtrl: NavController, private translate: TranslateService,public navParams: NavParams, private searchService: SearchProvider, private alertCtrl: AlertController) {

    this.initializeItems();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchWithProductPage');
  }

  goToDetailProduct(id,id2,id3,devis) {
    console.log(id,id2,id3);

    this.navCtrl.push(DetailProductPage, { "id" : id, "id_market": id2, "owner": id3, "devis": devis });
  }

  initializeItems() {
    /*let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();*/
    this.searchService.searchProduct().subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        this.Products = data.results;
        this.Total = data.results;
        this.next = data.next;
        console.log(data);



      //  loading.dismiss();
      },
      (err) => {
        console.log("error : " + err );
        //loading.dismiss();
        let alert = this.alertCtrl.create({
          title: this.translate.instant('ALERT.err_title'),
          subTitle: this.translate.instant('ALERT.err_subtitle'),
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
      //this.initializeItems();
      this.Products = this.Total;
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
                this.Products.push( element );
                this.Total.push(element);
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
