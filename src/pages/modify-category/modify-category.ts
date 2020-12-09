import { BoutiquePage } from './../boutique/boutique';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
import { StoreProvider } from './../../providers/store/store';
import { SearchProvider } from './../../providers/search/search';
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
  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider, private searchService: SearchProvider, private app: App) {

    this.platform.registerBackButtonAction( () => {
      let nav = this.app.getActiveNav();
      if (nav.canGoBack()) {
        console.log("je reviens en arriere !");

        console.log(this.navCtrl.getActiveChildNav());
        this.navCtrl.pop();
      } else {
        this.platform.exitApp();
      }
    })

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
    console.log("chooose category of id\'s " + id + " for replace !");

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
