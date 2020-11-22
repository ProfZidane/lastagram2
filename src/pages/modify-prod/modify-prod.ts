import { MyShopPage } from './../my-shop/my-shop';
import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ModifyProdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-prod',
  templateUrl: 'modify-prod.html',
})
export class ModifyProdPage {
Products = {
  id: 0,
  image_cover: "",
  name: "",
  price: "",
  promo_price: "",
  description : ""
};
state;
base64Image;
id;
slug;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private storeService: StoreProvider,public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyProdPage');
    this.Products = this.navParams.get("0");
    console.log(this.Products);
    this.state = this.navParams.get("etat");
    this.id = this.navParams.get('id');
    this.slug = this.navParams.get('slug');
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


  update() {
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();

    console.log(this.Products);
    let data;
    if (this.state === "normal") {
      data = {
        "name": this.Products.name,
        "price": this.Products.price,
        "slug": this.slug,
        "promo_price": this.Products.promo_price,
        "image_cover": this.Products.image_cover,
        "description" : this.Products.description,
        "flash": false,
        "popular": false,
        "category": this.id
      }
      console.log(data);

    } else if (this.state === "flash") {
      data = {
        "name": this.Products.name,
        "price": this.Products.price,
        "slug": this.slug,
        "promo_price": this.Products.promo_price,
        "image_cover": this.Products.image_cover,
        "description" : this.Products.description,
        "flash": true,
        "popular": false,
        "category": this.id
      }
      console.log(data);

    } else if (this.state === "popular") {
      data = {
        "name": this.Products.name,
        "price": this.Products.price,
        "slug": this.slug,
        "promo_price": this.Products.promo_price,
        "image_cover": this.Products.image_cover,
        "description" : this.Products.description,
        "flash": false,
        "popular": true,
        "category": this.id
      }
      console.log(data);

    }

    this.storeService.updateProduct(data,this.Products.id).subscribe(
      (success) => {
        console.log(success);
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'SUCCESS',
          subTitle: 'Succès de la modification',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(MyShopPage);

      },
      (error) => {
        console.log(error);
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'Echec de la modification',
          message: 'Veuillez verifiez réessayer plus part !',
          buttons: ['OK']
        });
        alert.present();
      }
    )
  }

}
