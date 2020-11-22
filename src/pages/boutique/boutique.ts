import { ProfilePage } from './../profile/profile';
import { CartPage } from './../cart/cart';
import { SearchPage } from './../search/search';
import { ProductToSharePage } from './../product-to-share/product-to-share';
import { ShopToSharePage } from './../shop-to-share/shop-to-share';
import { MyShopPage } from './../my-shop/my-shop';
import { ModifyProdPage } from './../modify-prod/modify-prod';
import { ListProdPage } from './../list-prod/list-prod';
import { StoreProvider } from './../../providers/store/store';
import { AddProductPage } from './../add-product/add-product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController  } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import {NgxImageCompressService} from 'ngx-image-compress';

/**
 * Generated class for the BoutiquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boutique',
  templateUrl: 'boutique.html',
})
export class BoutiquePage {
  id;
  isAdmin=false;
  Market = {
    id: Number,
    name: "",
    image_cover: "",
    category: [],
    flash: [],
    popular: [],
    articles: [],
    detail_articles: [],
    subscribers: 0,
    devis: "",
    img_static_1 : "",
    img_static_2 : ""
  }
  base64Image: string;
  slug;
  imgResultAfterCompress: string;
  //rootPage = BoutiquePage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider,public loadingCtrl: LoadingController,private callNumber: CallNumber, private alertCtrl: AlertController, private camera: Camera,public actionSheetCtrl: ActionSheetController,private imageCompress: NgxImageCompressService,public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoutiquePage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();

    this.id = this.navParams.get('id');
    console.log(this.id);
    this.storeService.getDetailMarket(this.id).subscribe(
      (data) => {
        if (localStorage.getItem('idUser') == data.owner) {

          this.isAdmin = true;
          console.log(this.isAdmin);
          console.log(data);

          this.Market.id = data.id;
          this.Market.name = data.name;
          this.Market.image_cover = data.image_cover;
          this.Market.category = data.category;
          this.Market.subscribers = data.subscribers.length;
          this.Market.devis = data.devis;
          this.Market.img_static_1 = data.img_static_1;
          this.Market.img_static_2 = data.img_static_2;
          this.slug = data.slug;
          data.articles.forEach(element => {
            if (element.flash == true && element.popular == false) {
              this.Market.flash.push(element);
            }
            if (element.flash == false && element.popular == true) {
              this.Market.popular.push(element);
            }
            if (element.flash == false && element.popular == false) {
              this.Market.articles.push(element);
            }
          });

          this.Market.category.forEach(element => {
            this.storeService.getDetailCatg(element).subscribe(
              (response) => {
                this.Market.detail_articles.push(response);
              },
              (error) => {
                console.log(error);

              }
            )
          });
          console.log(this.Market.detail_articles);

          loading.dismiss();
          console.log("Propiétaire : " + data);

        } else {
          this.isAdmin = false;

          this.storeService.getDetailMarketById(this.id).subscribe(
            (success) => {
              console.log(success);

              this.Market.id = success.id;
              this.Market.name = success.name;
              this.Market.image_cover = success.image_cover;
              this.Market.category = success.category;
              //this.Market.subscribers = success.subscribers.length;
              this.slug = success.slug;
              success.articles.forEach(element => {
                if (element.flash == true && element.popular == false) {
                  this.Market.flash.push(element);
                }
                if (element.flash == false && element.popular == true) {
                  this.Market.popular.push(element);
                }
                if (element.flash == false && element.popular == false) {
                  this.Market.articles.push(element);
                }
              });

              this.Market.category.forEach(element => {
                console.log(element);

                this.storeService.getDetailCatg(element.id).subscribe(
                  (response) => {
                    //loading.dismiss();
                    this.Market.detail_articles.push(response);
                  },
                  (error) => {
                    //loading.dismiss();
                    console.log(error);

                  }
                )
              });
              console.log(this.Market.detail_articles);

              loading.dismiss();

              console.log("Pas propriétaire : " + success);
            },
            (err) => {
              console.log(err);

            }
          )

        }


      },
      (err) => {
        console.log(err);
      }
    )
  }

  goToProductShare() {
    this.navCtrl.push(ProductToSharePage);
  }

  // presente action
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Partage',
      buttons: [
        {
          text: 'Lien de boutique',
          icon: 'link',
          handler: () => {
            console.log('Destructive clicked');
            this.navCtrl.push(ShopToSharePage);
          }
        },{
          text: 'Partagez sur les réseaux',
          icon: 'share-alt',
          handler: () => {
            this.goToProductShare();
          }
        },{
          text: 'Cancel',
          role: 'destructive',
          icon: 'close-circle',
          cssClass: 'cancel-btn',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  Message() {
    console.log(localStorage.getItem('phoneUser'));
  }

  Call() {
    console.log(localStorage.getItem('phoneUser'));
    let alert = this.alertCtrl.create({
      title: 'INFO',
      subTitle: 'Numéro du propriétaire : ' + localStorage.getItem('phoneUser'),
      buttons: ['OK']
    });
    alert.present();
  }

  showCart() {
    this.navCtrl.push(CartPage);
  }

  openMenu() {
    this.menuCtrl.open();
  }

  GetProductByCtg(catg) {
    console.log(catg);
    this.navCtrl.push(ListProdPage, { "id_catg" : catg, "id_boutique": this.Market.id, "slug": this.slug } );
  }

  goToAddProduct() {
    this.navCtrl.push(AddProductPage);
  }


  Analyse(json,name) {
    if (this.isAdmin) {
      console.log("modifier profile");
      this.navCtrl.push(ModifyProdPage, { "0": json, "etat": name, "id": null });
    } else {
      console.log("achat");

    }
  }

  ShowProfile() {
    this.navCtrl.push(ProfilePage);
  }

  setToZero(id) {
    let data = {
      timer : "30:00"
    }
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    this.storeService.updateProduct2(data,Number(id)).subscribe(
      (success) => {
        console.log("name updated");
        console.log(success);

        loading.dismiss();

        let alert2 = this.alertCtrl.create({
          title: 'SUCCESS',
          subTitle: 'Timer remis à 0 !',
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: () => {
                this.navCtrl.push(MyShopPage);
              }
            }
          ]
        });
        alert2.present();

      },
      (error) => {
        console.log(JSON.stringify(error));
        loading.dismiss();
        let alert3 = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'Echec de la remis à zéro !',
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: () => {
                console.log('cancel');

              }
            }
          ]
        });
        alert3.present();


      }
    )
  }

  setImageDeco1(id) {
    this.imageCompress.uploadFile().then(({image, orientation}) => {

      this.base64Image = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          let loading = this.loadingCtrl.create({
            content: 'Veuillez Patienter...'
          });
          loading.present();
          let data = {
            "img_static_1" : this.imgResultAfterCompress
          }

          this.storeService.updateProduct2(data,this.Market.id).subscribe(
            (response) => {
                console.log(response);
                loading.dismiss();
                let alert4 = this.alertCtrl.create({
                  title: 'SUCCESS',
                  subTitle: 'Photo modifée !',
                  buttons: [
                    {
                      text: 'OK',
                      role: 'cancel',
                      handler: () => {
                        this.navCtrl.push(MyShopPage);
                      }
                    }
                  ]
                });
                alert4.present();
            },
            (error) => {
              console.log(id);

              console.log(error);
              loading.dismiss();
              let alert5 = this.alertCtrl.create({
                title: 'ECHEC',
                subTitle: 'Echec de la modification !',
                buttons: [
                  {
                    text: 'OK',
                    role: 'cancel',
                    handler: () => {
                      console.log('cancel');

                    }
                  }
                ]
              });
              alert5.present();
            }

          )

        }
      );

    });
  }

  setImageDeco2(id) {
    this.imageCompress.uploadFile().then(({image, orientation}) => {

      this.base64Image = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          let loading = this.loadingCtrl.create({
            content: 'Veuillez Patienter...'
          });
          loading.present();
          let data = {
            "img_static_2" : this.imgResultAfterCompress
          }

          this.storeService.updateProduct2(data,this.Market.id).subscribe(
            (response) => {
                console.log(response);
                loading.dismiss();
                let alert4 = this.alertCtrl.create({
                  title: 'SUCCESS',
                  subTitle: 'Photo modifée !',
                  buttons: [
                    {
                      text: 'OK',
                      role: 'cancel',
                      handler: () => {
                        this.navCtrl.push(MyShopPage);
                      }
                    }
                  ]
                });
                alert4.present();
            },
            (error) => {
              console.log(id);

              console.log(error);
              loading.dismiss();
              let alert5 = this.alertCtrl.create({
                title: 'ECHEC',
                subTitle: 'Echec de la modification !',
                buttons: [
                  {
                    text: 'OK',
                    role: 'cancel',
                    handler: () => {
                      console.log('cancel');

                    }
                  }
                ]
              });
              alert5.present();
            }

          )

        }
      );

    });
  }

  modifyElt(value,id) {
    if (this.isAdmin) {
      if(value == "name") {
        //      this.storeService.updateProduct2()
                let alert = this.alertCtrl.create({
                  title: 'Modification',
                  message: "Entrez votre le nouveau nom",
                  inputs: [
                    {
                      name: "name",
                      placeholder: 'Votre nom'
                    },
                  ],
                  buttons: [
                    {
                      text: 'Fermer',
                      role: 'cancel',
                      handler: data => {
                        console.log('Cancel clicked');
                      }
                    },
                    {
                      text: 'Valider',
                      handler: data => {
                        let loading = this.loadingCtrl.create({
                          content: 'Veuillez Patienter...'
                        });
                        loading.present();


                          this.storeService.updateProduct2(data,Number(id)).subscribe(
                            (success) => {
                              console.log("name updated");
                              console.log(success);

                              loading.dismiss();

                              let alert2 = this.alertCtrl.create({
                                title: 'SUCCESS',
                                subTitle: 'Nom de boutique modifée !',
                                buttons: [
                                  {
                                    text: 'OK',
                                    role: 'cancel',
                                    handler: () => {
                                      this.navCtrl.push(MyShopPage);
                                    }
                                  }
                                ]
                              });
                              alert2.present();

                            },
                            (error) => {
                              console.log(JSON.stringify(error));
                              loading.dismiss();
                              let alert3 = this.alertCtrl.create({
                                title: 'ECHEC',
                                subTitle: 'Echec de la modification !',
                                buttons: [
                                  {
                                    text: 'OK',
                                    role: 'cancel',
                                    handler: () => {
                                      console.log('cancel');

                                    }
                                  }
                                ]
                              });
                              alert3.present();


                            }
                          )
                        }
                      }
                  ]
                });
                alert.present();

            } else if (value == "img") {


              this.imageCompress.uploadFile().then(({image, orientation}) => {

                this.base64Image = image;
                console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

                this.imageCompress.compressFile(image, orientation, 50, 50).then(
                  result => {
                    this.imgResultAfterCompress = result;
                    console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
                    let loading = this.loadingCtrl.create({
                      content: 'Veuillez Patienter...'
                    });
                    loading.present();
                    let data = {
                      "image_cover" : this.imgResultAfterCompress
                    }

                    this.storeService.updateProduct2(data,this.Market.id).subscribe(
                      (response) => {
                          console.log(response);
                          loading.dismiss();
                          let alert4 = this.alertCtrl.create({
                            title: 'SUCCESS',
                            subTitle: 'Photo de couverture modifée !',
                            buttons: [
                              {
                                text: 'OK',
                                role: 'cancel',
                                handler: () => {
                                  this.navCtrl.push(MyShopPage);
                                }
                              }
                            ]
                          });
                          alert4.present();
                      },
                      (error) => {
                        console.log(id);

                        console.log(error);
                        loading.dismiss();
                        let alert5 = this.alertCtrl.create({
                          title: 'ECHEC',
                          subTitle: 'Echec de la modification !',
                          buttons: [
                            {
                              text: 'OK',
                              role: 'cancel',
                              handler: () => {
                                console.log('cancel');

                              }
                            }
                          ]
                        });
                        alert5.present();
                      }

                    )

                  }
                );

              });

            }
    } else {
      console.log("vous netes pas admin !");

    }
  }

  compressFile() {



  }


  goToSearchMode() {
    this.navCtrl.push(SearchPage);
  }

}
