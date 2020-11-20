import { CreateBoutiquePage } from './../create-boutique/create-boutique';
import { ProductAddedPage } from './../product-added/product-added';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product-special',
  templateUrl: 'add-product-special.html',
})
export class AddProductSpecialPage {
  data = [];
  Products = {
    "name" : "",
    "price" : "",
    "promo_price" : "",
    flash : Boolean,
      popular : Boolean,
    "image_cover" : "",
  };
  nameCtg:string;
  num;
  indic;
  base64Image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductSpecialPage');
    this.num = this.navParams.get('n');
    this.indic = this.navParams.get('name');
  }

  goToProductAdded() {
    this.navCtrl.push(ProductAddedPage);
  }

  AddOneProduct() {
    //this.Products.idctg = this.idCtg;
    this.data.push(this.Products);
    console.log(this.data);
    if (this.indic == "populaire") {
      localStorage.setItem('populaire' + this.num, JSON.stringify(this.data));
      this.presentAlert();
    } else if (this.indic == "flash") {
      localStorage.setItem('flash' + this.num, JSON.stringify(this.data));
      this.presentAlert();
    }

    this.Products = {

      name: "",
      price: "",
      promo_price: "",
      flash : Boolean,
      popular : Boolean,
      image_cover: "",
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'info',
      subTitle: 'Votre produit est ajouté !',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.navCtrl.push(CreateBoutiquePage);
          }
        },
      ]
    });
    alert.present();
  }

  addImg() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.Products.image_cover = this.base64Image;
      //localStorage.setItem('photoUser',this.base64Image);

    }, (err) => {
      console.log(err, "vos erreurs");
    })
  }
}
