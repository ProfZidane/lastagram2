import { ModifyCategoryPage } from './../modify-category/modify-category';
import { ListProdPage } from './../list-prod/list-prod';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController  } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  id_catg;
  id_market;
  slug;
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public viewCtrl: ViewController ) {
    this.id_catg = this.navParams.get('id_catg');
    this.id_market = this.navParams.get('id_boutique');
    this.slug = this.navParams.get('slug');
    console.log("mon id categorie : " + this.id_catg);
    console.log("mon id boutique : " + this.id_market);
    console.log("mon slug : " + this.slug);



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');

  }

  modifyCategory(id) {
    this.closePopover();
    this.navCtrl.push(ModifyCategoryPage, { id_catg: id, id_market: this.id_market });
  }

  modifyProduct(id) {
    this.closePopover();
    this.navCtrl.push(ListProdPage, { "id_catg" : this.id_catg, "id_boutique": this.id_market, "slug":  this.slug} );
  }

  /*GetProductByCtg(catg) {
    console.log(catg);
    this.navCtrl.push(ListProdPage, { "id_catg" : catg, "id_boutique": this.Market.id, "slug": this.slug } );
  }*/

  closePopover() {
    this.viewCtrl.dismiss()
  }

}
