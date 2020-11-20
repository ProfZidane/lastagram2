import { CreateBoutiquePage } from './../create-boutique/create-boutique';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreProvider } from './../../providers/store/store';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategoryPage');
    this.indic = this.navParams.get('number');
    console.log(this.navParams.get('number'));

    this.storeService.getCatgStore().subscribe(
      (data) => {
        console.log(data);
        this.AllCtg = data;
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

}
