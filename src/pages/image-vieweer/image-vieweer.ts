import { BoutiquePage } from './../boutique/boutique';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform , ViewController } from 'ionic-angular';

/**
 * Generated class for the ImageVieweerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-vieweer',
  templateUrl: 'image-vieweer.html',
})
export class ImageVieweerPage {
  image_cover;
  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private app: App,public viewCtrl: ViewController) {
    this.image_cover = this.navParams.get('img');
    console.log(this.image_cover);

    this.platform.registerBackButtonAction( () => {
      this.viewCtrl.dismiss();
      /*let nav = this.app.getActiveNav();
      if (nav.canGoBack()) {
        //nav.popToRoot()
        //nav.popTo(ProfilePage)
        //this.navCtrl.pop();
        //this.viewCtrl.dismiss();
      } else {
        console.log("peut plus reculer");
        //this.navCtrl.push(BoutiquePage);
        //this.platform.exitApp();
      }*/

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageVieweerPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
