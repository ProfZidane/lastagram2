import { AddProductSpecialPage } from './../add-product-special/add-product-special';
import { AddProductPage } from './../add-product/add-product';
import { StoreProvider } from './../../providers/store/store';
import { AddCategoryPage } from './../add-category/add-category';
import { BoutiqueCreatedPage } from './../boutique-created/boutique-created';
import { BoutiquePage } from './../boutique/boutique';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
/**
 * Generated class for the CreateBoutiquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-boutique',
  templateUrl: 'create-boutique.html',
})
export class CreateBoutiquePage {
  nameMarket:string = "";
  done = false;
  done1 = false;
  done2 = false;
  done3 = false;
  done4 = false;
  done5 = false;
  in = true;
  in1 = true;
  in2 = true;
  in3 = true;
  in4 = true;
  in5 = true;
  catg1;
  catg2;
  catg3;
  catg4;
  catg5;
  catg6;
  id1;
  id2;
  id3;
  id4;
  id5;
  id6;

  flash01 = true;
  flash02 = true;
  flash03 = true;
  flash04 = true;
  flash1 = false;
  flash2 = false;
  flash3 = false;
  flash4 = false;

  popular01 = true;
  popular02 = true;
  popular1 = false;
  popular2 = false;
  a;
  error_validation:string;
  base64Image;
  ref = firebase.database().ref('Markets/');
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider, private camera: Camera,public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    console.log(localStorage.getItem('article'));
    this.a = JSON.parse(localStorage.getItem('article'));
    console.log(this.a);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateBoutiquePage');
    this.catgRemote();
  }

  goToBoutique() {

    this.navCtrl.push(BoutiqueCreatedPage);
  }

  goToAddCategory(n) {
    this.navCtrl.push(AddCategoryPage, { "number" : n });
  }


  catgRemote() {
    if (localStorage.getItem('catg1') !== null && localStorage.getItem('id1') !== null ) {
      this.in = false;
      this.done = true;
      this.catg1 = localStorage.getItem('catg1');
      this.id1 = localStorage.getItem('id1');
      console.log(this.catg1);
      console.log(typeof(this.catg1));


    }

    if (localStorage.getItem('catg2') !== null && localStorage.getItem('id2') !== null ) {
      this.in1 = false;
      this.done1 = true;
      this.catg2 = localStorage.getItem('catg2');
      this.id2 = localStorage.getItem('id2');
      console.log(this.catg2);
      console.log(typeof(this.catg2));
    }

    if (localStorage.getItem('catg3') !== null && localStorage.getItem('id3') !== null ) {
      this.in2 = false;
      this.done2 = true;
      this.catg3 = localStorage.getItem('catg3');
      this.id3 = localStorage.getItem('id3');
      console.log(this.catg3);
      console.log(typeof(this.catg3));
    }

    if (localStorage.getItem('catg4') !== null && localStorage.getItem('id4') !== null ) {
      this.in3 = false;
      this.done3 = true;
      this.catg4 = localStorage.getItem('catg4');
      this.id4 = localStorage.getItem('id4');
      console.log(this.catg4);
      console.log(typeof(this.catg4));
    }

    if (localStorage.getItem('catg5') !== null && localStorage.getItem('id5') !== null ) {
      this.in4 = false;
      this.done4 = true;
      this.catg5 = localStorage.getItem('catg5');
      this.id5 = localStorage.getItem('id5');
      console.log(this.catg5);
      console.log(typeof(this.catg5));
    }

    if (localStorage.getItem('catg6') !== null && localStorage.getItem('id6') !== null ) {
      this.in5 = false;
      this.done5 = true;
      this.catg6 = localStorage.getItem('catg6');
      this.id6 = localStorage.getItem('id6');
      console.log(this.catg6);
      console.log(typeof(this.catg6));
    }

    if (localStorage.getItem('flash1') !== null) {
      this.flash01 = false;
      this.flash1 = true;
    }

    if (localStorage.getItem('flash2') !== null) {
      this.flash02 = false;
      this.flash2 = true;
    }

    if (localStorage.getItem('flash3') !== null) {
      this.flash03 = false;
      this.flash3 = true;
    }

    if (localStorage.getItem('flash4') !== null) {
      this.flash04 = false;
      this.flash4 = true;
    }

    if (localStorage.getItem('populaire1') !== null) {
      this.popular01 = false;
      this.popular1 = true;
    }

    if (localStorage.getItem('populaire2') !== null) {
      this.popular02 = false;
      this.popular2 = true;
    }
  }


  getProductInCatg(name,id,n) {
    //console.log(name);
    this.navCtrl.push(AddProductPage, { "category" : name, "id" : id, "number" : n });
  }

  getImgMarket() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      //localStorage.setItem('photoUser',this.base64Image);
      localStorage.setItem('couvertImage', this.base64Image);
    }, (err) => {
      console.log(err, "vos erreurs");
    })
  }

  addProduct(name,n) {
    this.navCtrl.push(AddProductSpecialPage, { "name" : name, "n" : n});
  }


  addItem(item) {
    if (item !== undefined && item !==null){
      let newItem = this.ref.push();
      newItem.set(item);

    }
    console.log('added to database ' + JSON.stringify(item));

  }


  ValidationCreateBoutique() {

    if (this.ValidationCheck()) {
      let loading = this.loadingCtrl.create({
        content: 'Veuillez Patienter...'
      });
      loading.present();
      let datas = {
        "name" : this.nameMarket,
        "owner" : Number(localStorage.getItem('idUser')),
        "category" : [
          {
            "id" : JSON.parse(localStorage.getItem('id1')),
            "name" : localStorage.getItem('catg1')
          },
          {
            "id" : JSON.parse(localStorage.getItem('id2')),
            "name" : localStorage.getItem('catg2')
          },
          {
            "id" : JSON.parse(localStorage.getItem('id3')),
            "name" : localStorage.getItem('catg3')
          },
          {
            "id" : JSON.parse(localStorage.getItem('id4')),
            "name" : localStorage.getItem('catg4')
          },
          {
            "id" : JSON.parse(localStorage.getItem('id5')),
            "name" : localStorage.getItem('catg5')
          },
          {
            "id" : JSON.parse(localStorage.getItem('id6')),
            "name" : localStorage.getItem('catg6')
          }
        ],
        "image_cover" : localStorage.getItem('couvertImage'),
        "articles" : [],
      }
      //datas.image_couverture = null;

      let tab = ['1','2','3','4','5','6'];
      let tab2 = ['1','2','3','4'];
      let tab3 = ['1','2'];
      tab.forEach(element => {
        JSON.parse(localStorage.getItem('article'+element)).forEach(element => {
          element.flash = false;
          element.popular = false;
          element.category = Number(element.category);
          element.price = Number(element.price);
          element.promo_price = Number(element.promo_price);
          //element.image = null;
          datas.articles.push(element);
        });
      });
      tab2.forEach(element => {
        JSON.parse(localStorage.getItem('flash'+element)).forEach(element => {
          element.flash = true;
          element.popular = false;
          element.price = Number(element.price);
          element.promo_price = Number(element.promo_price);
          element.category = null;
          //element.image = null;
          datas.articles.push(element);
        });
      });
      tab3.forEach(element => {
        JSON.parse(localStorage.getItem('populaire'+element)).forEach(element => {
          element.flash = false;
          element.popular = true;
          element.price = Number(element.price);
          element.promo_price = Number(element.promo_price);
          element.category = null;
          //element.image = null;
          datas.articles.push(element);
        });
      });

      console.log(datas);

      this.addItem(datas);

      loading.dismiss();

      this.goToBoutique();

      /*this.storeService.createMarket(datas).subscribe(
        (success) => {
          loading.dismiss();
          console.log(success);
          localStorage.setItem('myshop',JSON.stringify(success));
          tab.forEach(elt => {
            localStorage.removeItem('id'+elt);
          });
          tab.forEach(elt => {
            localStorage.removeItem('article'+elt);
          });
          tab2.forEach(elt => {
            localStorage.removeItem('flash'+elt);
          });
          tab3.forEach(elt => {
            localStorage.removeItem('populaire'+elt);
          });
          this.goToBoutique();

        },
        (error) => {
          loading.dismiss();

          console.log(error);

          if (error.status == 0 && error.statusText == "Unknown Error") {
            let alert = this.alertCtrl.create({
              title: 'ATTENTION',
              subTitle: 'Echec de la création',
              message: 'Veuillez verifiez votre connexion internet',
              buttons: ['OK']
            });
            alert.present();
          }

        }
      )*/



    } else {
      this.error_validation = "Veuillez remplir toutes les parties !";
    }




  }

  ValidationCheck() : Boolean {
    let tab = ['1','2','3','4','5','6'];
    let tab2 = ['1','2','3','4'];
    let tab3 = ['1','2'];

    let i = 0;
    let j = 0;
    let k = 0;
    tab.forEach(element => {
      if (localStorage.getItem('id'+element) !== null && localStorage.getItem('article'+element) !== null) {
          //return true;
          i = 1;
      }
    });

    tab2.forEach(element =>  {
      if (localStorage.getItem('flash'+element) !== null ) {
        j = 1;
      }
    });

    tab3.forEach(element =>  {
      if (localStorage.getItem('populaire'+element) !== null ) {
        k = 1;
      }
    });

    if (i == 1 && j==1 && k==1 && this.base64Image !== null && this.nameMarket != "") {
      return true;
    } else {
      return false;
    }
  }


}
