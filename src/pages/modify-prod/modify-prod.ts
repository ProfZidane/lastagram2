import { MyShopPage } from './../my-shop/my-shop';
import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {NgxImageCompressService} from 'ngx-image-compress';

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
  imgResultAfterCompress: any;
  status = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private storeService: StoreProvider,public loadingCtrl: LoadingController, private alertCtrl: AlertController,private imageCompress: NgxImageCompressService) {
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
    this.imageCompress.uploadFile().then(({image, orientation}) => {

      this.base64Image = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image,-1, 50, 60).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          this.Products.image_cover = result;
          this.status = true;

        }
      );

    });
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
        "description" : encodeURI(this.Products.description),
        "flash": false,
        "popular": false,
        "category": this.id
      }
      console.log(JSON.stringify(data));

    } else if (this.state === "flash") {
      data = {
        "name": this.Products.name,
        "price": this.Products.price,
        "slug": this.slug,
        "promo_price": this.Products.promo_price,
        "image_cover": this.Products.image_cover,
        "description" : encodeURI(this.Products.description),
        "flash": true,
        "popular": false,
        "category": this.id
      }
      console.log(JSON.stringify(data));

    } else if (this.state === "popular") {
      data = {
        "name": this.Products.name,
        "price": this.Products.price,
        "slug": this.slug,
        "promo_price": this.Products.promo_price,
        "image_cover": this.Products.image_cover,
        "description" : encodeURI(this.Products.description),
        "flash": false,
        "popular": true,
        "category": this.id
      }
      console.log(JSON.stringify(data));

    }

    if (this.status !== true) {
      delete data.image_cover;
    }

    this.storeService.updateProduct(data,this.Products.id).subscribe(
      (success) => {
        console.log(JSON.stringify(success));
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
        console.log(JSON.stringify(error));
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
