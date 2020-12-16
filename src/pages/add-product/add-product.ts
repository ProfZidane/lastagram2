import { CreateBoutiquePage } from './../create-boutique/create-boutique';
import { ProductAddedPage } from './../product-added/product-added';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {NgxImageCompressService} from 'ngx-image-compress';

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
    "image_cover" : "",
    description: ""


  };
  nameCtg:string;
  idCtg;
  indic;
  base64Image: string;
  imgResultAfterCompress: any;
  count;
  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private camera: Camera,private imageCompress: NgxImageCompressService, private app: App) {
    /*this.platform.registerBackButtonAction( () => {
      let nav = this.app.getActiveNav();
      if (nav.canGoBack()) {
        console.log("back ");
        console.log(this.navCtrl.getByIndex(this.navCtrl.length () - 3));
        nav.popTo(this.navCtrl.getByIndex (this.navCtrl.length () - 3))
      } else {
        this.platform.exitApp();
      }
    })*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
    console.log(this.navParams.get('category'));
    this.nameCtg = this.navParams.get('category');
    this.idCtg = this.navParams.get('id');
    this.indic = this.navParams.get('number');

    if (localStorage.getItem('article'+this.indic) !== null) {
      let tab = JSON.parse(localStorage.getItem('article'+this.indic));
      this.count = tab.length;
    } else {
      this.count = 0;
    }
  }

  goToProductAdded() {
    this.navCtrl.push(ProductAddedPage);
  }

  AddOneProduct() {
    this.Products.category = this.idCtg;
    //this.count += this.data.length;

    if (this.data.length <= 49) {
      this.Products.description = encodeURI(this.Products.description);
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
      image_cover: "",

      description: ""

    }
    this.base64Image = "";

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
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
     // this.base64Image = 'data:image/jpeg;base64,' + imageData;

      this.imageCompress.compressFile(imageData, -1, 35, 35).then(
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
          this.Products.image_cover = this.imgResultAfterCompress;

        }
      );



    });

  }
}


