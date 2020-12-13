import { MyShopPage } from './../my-shop/my-shop';
import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {NgxImageCompressService} from 'ngx-image-compress';

/**
 * Generated class for the ModifyProdSpecialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-prod-special',
  templateUrl: 'modify-prod-special.html',
})
export class ModifyProdSpecialPage {
  id_catg;
  id_market;
  Products = {
    "name" : "",
    "price" : "",
    "promo_price" : "",
    "flash" : Boolean,
    "popular" : Boolean,
    "category" : "",
    "image_cover" : "",
    description : ""

  };
  base64Image: string;
  imgResultAfterCompress: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private storeService: StoreProvider,public loadingCtrl: LoadingController, private alertCtrl: AlertController,private imageCompress: NgxImageCompressService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyProdSpecialPage');
    this.id_catg = this.navParams.get('id_catg');
    this.id_market = this.navParams.get('id_market');

    console.log(this.id_catg);
    console.log(this.id_market);


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
      //this.Products.image_cover = this.base64Image;
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
          this.Products.image_cover = result;

        }
      );

    });

  }


  AddOneProduct() {
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();

    let data = {
      "image_cover": this.Products.image_cover,
      "name": this.Products.name,
      "price": this.Products.price,
      "promo_price": this.Products.promo_price,
      "store": this.id_market,
      "category": this.id_catg,
      "description" : encodeURI(this.Products.description)
    };
    console.log(data);

    this.storeService.createNewProduct(data).subscribe(
      (response) => {
        console.log(response);
        let alert = this.alertCtrl.create({
          title: 'SUCCESS',
          subTitle: 'Votre produit a bien été créer !',
          buttons: ['OK']
        });
        alert.present();
        loading.dismiss();
        this.navCtrl.push(MyShopPage);

      },
      (error) => {
        console.log(JSON.stringify(error));
        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'L\'opération n\'a pas abouti !',
          buttons: ['OK']
        });
        alert.present();
        loading.dismiss();

      }
    )

  }

}
