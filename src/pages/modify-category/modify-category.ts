import { MyShopPage } from './../my-shop/my-shop';
import { BoutiquePage } from './../boutique/boutique';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
import { StoreProvider } from './../../providers/store/store';
import { SearchProvider } from './../../providers/search/search';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the ModifyCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-category',
  templateUrl: 'modify-category.html',
})
export class ModifyCategoryPage {
AllCtg;
next;
old_catg;
id_market;
  constructor(private platform: Platform, private translate: TranslateService,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider, private searchService: SearchProvider, private app: App) {

    this.old_catg = this.navParams.get('id_catg');
    this.id_market = this.navParams.get('id_market');

    /*this.platform.registerBackButtonAction( () => {
      let nav = this.app.getActiveNav();
      if (nav.canGoBack()) {
        console.log("je reviens en arriere !");

        console.log(this.navCtrl.getActiveChildNav());
        this.navCtrl.pop();
      } else {
        this.platform.exitApp();
      }
    })*/

    this.storeService.getCatgStore().subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        this.AllCtg = data.results;
        this.next = data.next;
      },
      (err) => {
        console.log(err);

      }

    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyCategoryPage');
  }

  chooseToReplace(id) {
    let data = {
      "old_category_id" : Number(this.old_catg),
      "new_category_id" : Number(id)
    }
    console.log("chooose category of id\'s " + id + " for replace in " + this.id_market + "!");
    console.log("les jsons : " + JSON.stringify(data));

    this.storeService.modifyCategory({
      "old_category_id" : Number(this.old_catg),
      "new_category_id" : Number(id)
    },Number(this.id_market)).subscribe(
      (success) => {
        console.log("success : " + JSON.stringify(success));
        let alert = this.alertCtrl.create({
          title: this.translate.instant('ALERT.succ_title'),
          subTitle: this.translate.instant('ALERT.succ_mod_catg'),
          buttons: ['OK']
        });
        alert.present();
        //this.navCtrl.push(MyShopPage);
        this.navCtrl.push(BoutiquePage, { id : this.id_market });
      }, (err) => {
        console.log("errr : " + JSON.stringify(err));
        let alert = this.alertCtrl.create({
          title: this.translate.instant('ALERT.succ_title'),
          subTitle: this.translate.instant('ALERT.err_action'),
          buttons: ['OK']
        });
        alert.present();
      }
    )

  }

  do() {

    console.log(this.next);

    if (this.next !== null) {
      this.searchService.searchInfinite(this.next).subscribe(
        (data) => {
          let data_next = data.results;
          console.log(data);
          console.log(data);

          data_next.forEach(element => {
            if (element !== null) {
              this.AllCtg.push( element );
              //this.Total.push(element);
            }
          });

         this.next = data.next;

        }
      )
    }

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
                this.AllCtg.push( element );
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
