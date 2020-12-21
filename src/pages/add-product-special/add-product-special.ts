import { CreateBoutiquePage } from './../create-boutique/create-boutique';
import { ProductAddedPage } from './../product-added/product-added';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {NgxImageCompressService} from 'ngx-image-compress';
import { TranslateService } from '@ngx-translate/core';
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
    description: ""
  };
  nameCtg:string;
  num;
  indic;
  base64Image: string;
  imgResultAfterCompress: string;
  constructor(public navCtrl: NavController,private translate : TranslateService, public navParams: NavParams, private alertCtrl: AlertController, private camera: Camera,private imageCompress: NgxImageCompressService) {
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
    this.Products.description = encodeURI(this.Products.description);
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
      description: ""
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: this.translate.instant('ALERT.succ_sub_prod2'),
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
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      //this.base64Image = 'data:image/jpeg;base64,' + imageData;

      this.imageCompress.compressFile(imageData, -1, 20, 20).then(
        result => {
          this.imgResultAfterCompress = result;
          this.Products.image_cover = this.imgResultAfterCompress;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );
      //localStorage.setItem('photoUser',this.base64Image);

    }, (err) => {
      console.log(err, "vos erreurs");
    })
  }

  compressFile() {

    this.imageCompress.uploadFile().then(({image, orientation}) => {

      this.base64Image = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      this.imageCompress.compressFile(image, -1, 50, 60).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          console.log(this.imgResultAfterCompress);

          this.Products.image_cover = this.imgResultAfterCompress;

        }
      );
      /*if (this.imageCompress.byteCount(image) >= 10000000) {
        this.imageCompress.compressFile(image, -1, 15, 30).then(
          result => {
            this.imgResultAfterCompress = result;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            console.log(this.imgResultAfterCompress);

            this.Products.image_cover = this.imgResultAfterCompress;

          }
        );
      } else {
        this.imageCompress.compressFile(image, -1, 20, 20).then(
          result => {
            this.imgResultAfterCompress = result;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            console.log(this.imgResultAfterCompress);

            this.Products.image_cover = this.imgResultAfterCompress;

          }
        );
      }*/


    });

  }

}
