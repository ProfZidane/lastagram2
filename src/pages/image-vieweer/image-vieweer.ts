import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.image_cover = this.navParams.get('img');
    console.log(this.image_cover);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageVieweerPage');
  }

}
