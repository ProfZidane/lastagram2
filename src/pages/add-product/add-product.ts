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
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  data = [];
  Products = {
    "name" : "",
    "price" : "",
    "promo_price" : "",
    "flash" : Boolean,
    "popular" : Boolean,
    "category" : "",
    "image_cover" : ""

  };
  nameCtg:string;
  idCtg;
  indic;
  base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
    console.log(this.navParams.get('category'));
    this.nameCtg = this.navParams.get('category');
    this.idCtg = this.navParams.get('id');
    this.indic = this.navParams.get('number');
  }

  goToProductAdded() {
    this.navCtrl.push(ProductAddedPage);
  }

  AddOneProduct() {
    this.Products.category = this.idCtg;
    if (this.data.length <= 49) {

      this.data.push(this.Products);
      console.log(this.data);
      this.presentAlert();
      this.Products = {

      name: "",
      price: "",
      promo_price: "",
      flash : Boolean,
      popular : Boolean,
      category : "",
      image_cover: ""
    }

    } else {
      console.log('stock atteint');

    }


  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'info',
      subTitle: 'Votre produit est ajouté !',
      buttons: [
        {
          text: 'Continuer',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Terminer',
          handler: () => {
            console.log('Buy clicked');
            localStorage.setItem('article' + this.indic, JSON.stringify(this.data));
            this.navCtrl.push(CreateBoutiquePage);
          }
        }
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
