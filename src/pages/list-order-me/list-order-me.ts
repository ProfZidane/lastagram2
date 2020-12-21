import { DetailOrderMePage } from './../detail-order-me/detail-order-me';
import { DetailOrdersPage } from './../detail-orders/detail-orders';
import { Component } from '@angular/core';
import { OrderProvider } from './../../providers/order/order';
import { UserProvider } from './../../providers/user/user';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ListOrderMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-order-me',
  templateUrl: 'list-order-me.html',
})
export class ListOrderMePage {
id;
Orders = [];
grouped;
next;
keys;
datas = [];
Datas = [];
devis;
country;
  constructor(public navCtrl: NavController,public http: HttpClient,private translate: TranslateService, public loadingCtrl: LoadingController, public navParams: NavParams, private orderService: OrderProvider, private userService: UserProvider) {
    this.id = this.navParams.get('id');
    console.log("id store : " + this.id);
    this.devis = this.navParams.get('devis');
    this.getOrderByMarket();
    if (localStorage.getItem('country') !== null) {
      this.http.get('https://restcountries.eu/rest/v2/alpha/'+ localStorage.getItem('country')).subscribe(
                (data) => {
                  this.country = data;
                  console.log('pays : ' + this.country);
                }, (err) => {
                  console.log(err)
                }
              )
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOrderMePage');
  }

  getOrderByMarket() {
    let loading = this.loadingCtrl.create({
      content: this.translate.instant('LOAD.mgs')
    });
    loading.present();
    this.orderService.getOrderByMarketID(Number(this.id)).subscribe(
      (data) => {

         console.log("order : " + JSON.stringify(data));
         this.next = data.next;
         this.Orders = data.result;


       // console.log(JSON.stringify(this.Orders));

        this.Orders.forEach(elt => {

            let len = elt.length;
            elt.forEach(element => {

              if (element.store_id === Number(this.id)) {
                element.taille = len;

                //this.datas.push(element);

                this.orderService.getDetailOrders(Number(element.id_order)).subscribe(
                  (data) =>{
                    let owner = data.owner;
                    let time = data.ordered_date
                  //  console.log(owner);
                    console.log("donne : " + JSON.stringify(data));

                    element.owner = owner;
                    element.time = time;

                   // console.log("elet : " + JSON.stringify(element));

                    this.datas.push(element);

                    this.Datas.push(element);

                  }, (err) => {
                    console.log((err));

                  }
                )


              }

            //  console.log(JSON.stringify(this.datas));

            });
        })
        loading.dismiss();
        console.log(" datas:  " + JSON.stringify(this.datas));

      }, (err) => {

        loading.dismiss();
        console.log((err));

      }
    )
  }

  goToDetailOrders(id) {
    this.navCtrl.push(DetailOrderMePage, { id: id, date: null, time: null, id_store: this.id, devis: this.devis });
    //console.log(id);

  }



  /*doInfinite(infiniteScroll) {
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
  }*/


}
