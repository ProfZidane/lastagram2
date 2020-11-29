import { CreateBoutiquePage } from './../create-boutique/create-boutique';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { StoreProvider } from './../../providers/store/store';
import { SearchProvider } from './../../providers/search/search';
/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {
  AllCtg;
  indic;
  next;
  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider, private searchService: SearchProvider, private app: App) {
    this.platform.registerBackButtonAction( () => {
      let nav = this.app.getActiveNav();
      if (nav.canGoBack()) {
        console.log(this.navCtrl.getActiveChildNav());
        nav.popTo(CreateBoutiquePage);
      } else {
        this.platform.exitApp();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategoryPage');
    this.indic = this.navParams.get('number');
    console.log(this.navParams.get('number'));

    this.storeService.getCatgStore().subscribe(
      (data) => {
        console.log(data);
        this.AllCtg = data.results;
      },
      (err) => {
        console.log(err);

      }

    )
  }

  ChooseThis(id,name) {
    console.log(id);
    localStorage.setItem('catg'+ this.indic, name);
    localStorage.setItem('id'+ this.indic, id);
    this.navCtrl.push(CreateBoutiquePage);

  }

  goBackToCreate() {
    this.navCtrl.push(CreateBoutiquePage);
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
