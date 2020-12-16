import { ModifyCategoryPage } from './../modify-category/modify-category';
import { ShareDesignPage } from './../share-design/share-design';
import { ModalPage } from './../modal/modal';
import { DEEP_LINK_DOMAIN } from './../../app/environment';
import { AddProductAfterPage } from './../add-product-after/add-product-after';
import { ModifyProdSpecialPage } from './../modify-prod-special/modify-prod-special';
import { MenuMarketPage } from './../menu-market/menu-market';
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
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { LoadingController, ToastController, Platform  } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, PopoverController } from 'ionic-angular';
import {NgxImageCompressService} from 'ngx-image-compress';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';

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
    image_cover2: "",
    image_cover3: "",
    category: [],
    flash: [],
    popular: [],
    articles: [],
    detail_articles: [],
    subscribers: 0,
    devis: "",
    img_static_1 : "",
    img_static_2 : "",
    img_decore: "",
    timer_flash: ""
  }
  base64Image: string;
  slug;
  imgResultAfterCompress: string;
  flash_length;
  popular_length;
  timer;
  second=0;
  minute=30;
  heure=0;
  //rootPage = BoutiquePage;
  constructor(private socialSharing: SocialSharing, private platform: Platform, public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider,public loadingCtrl: LoadingController,private callNumber: CallNumber, private alertCtrl: AlertController, private camera: Camera,public actionSheetCtrl: ActionSheetController,private imageCompress: NgxImageCompressService,public menuCtrl: MenuController, private clipboard: Clipboard, public popoverCtrl: PopoverController, private app: App) {
    /*this.platform.registerBackButtonAction( () => {
      let nav = this.app.getActiveNav();

      if (nav.canGoBack()) {
        //nav.popToRoot()
        //nav.popTo(ProfilePage)
        this.navCtrl.pop();
      } else {
        console.log("peut plus reculer");
        this.navCtrl.push(ProfilePage);
        //this.platform.exitApp();
      }
    })*/
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
          console.log(JSON.stringify(data));

          this.Market.id = data.id;
          this.Market.name = data.name;
          this.Market.image_cover = data.image_cover;
          this.Market.image_cover2 = data.image_cover_2;
          this.Market.image_cover3 = data.image_cover_3;
          this.Market.img_decore = data.img_decore;
          this.Market.category = data.category;
          this.Market.subscribers = data.subscribers.length;
          this.Market.devis = data.devis;
          this.Market.img_static_1 = data.img_static_1;
          this.Market.img_static_2 = data.img_static_2;
          this.slug = data.slug;
          this.Market.timer_flash = data.time_flash;

          if (data.articles.length !== 0) {
            data.articles.forEach(element => {
              if (element !== null) {
                if (element.flash == true && element.popular == false) {
                  this.Market.flash.push(element);
                }
                if (element.flash == false && element.popular == true) {
                  this.Market.popular.push(element);
                }
                if (element.flash == false && element.popular == false) {
                  this.Market.articles.push(element);
                }
              }
            });
          }

          this.flash_length = 6 - Number(this.Market.flash.length);

          if (this.flash_length !== 0) {
            for (let i = 0; i < this.flash_length; i++) {
              this.Market.flash.push(null);
            }
          }

          this.popular_length = 6 - Number(this.Market.popular.length);

          if (this.popular_length !== 0) {
            for (let j = 0; j < this.popular_length; j++) {
              this.Market.popular.push(null);
            }
          }

          this.timer = this.Market.timer_flash.split(':');
        console.log("type : " + Object.keys(this.timer));
        console.log(Number(this.timer[0]) + ': ' + this.timer[1] + ' :' + this.timer[2]);

        if (this.timer[0][0] === '-' || Number(this.timer[0]) <= 0  || Number(this.timer[1]) <= 0 || Math.round(this.timer[2]) <= 0) {
          this.heure = 0;
          this.minute = 0;
          this.second = 0;
        } else {
          this.heure = this.timer[0];
        this.minute = this.timer[1];
        this.second = Math.round(this.timer[2]);
          this.startTimer()

        }


          this.Market.category.forEach(element => {
            if (element !== null) {
              this.storeService.getDetailCatg(element).subscribe(
                (response) => {
                  this.Market.detail_articles.push(response);
                },
                (error) => {
                  console.log(error);

                }
              )
            }
          });
          console.log(JSON.stringify("detail : "  + this.Market.detail_articles));

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
                    //console.log(JSON.stringify(this.Market.detail_articles));

                  },
                  (error) => {
                    //loading.dismiss();
                    console.log(error);

                  }
                )
              });
              console.log(JSON.stringify(this.Market.detail_articles));

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
        loading.dismiss()
      }
    )
  }

  goToProductShare() {
    this.navCtrl.push(ProductToSharePage, { id : this.Market.id });
  }

  startTimer() {
    setInterval(() => {
      this.settingTime()
    },1000);
  }

  settingTime() {
    if (this.second !== 0) {
      this.second --;
    } else {
      if (this.minute !== 0) {
        this.second = 59;
      this.minute --;
      } else {
        if (this.heure !== 0) {
          this.heure --;
          this.minute = 59;
          this.second = 59;
        } else {
          this.heure = 0;
          this.minute = 0;
          this.second = 0;
        }

      }

    }
  }

  // presente action
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Partagez avec : ',
      buttons: [
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            console.log('Destructive clicked');
            this.shareFacebook();
            //this.navCtrl.push(ShopToSharePage);
          }
        },{
          text: 'WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            console.log('Destructive clicked');
            this.shareWhatsapp();
            //this.navCtrl.push(ShopToSharePage);
          }
        },{
          text: 'Instagram',
          icon: 'logo-instagram',
          handler: () => {
            console.log('Destructive clicked');
            this.shareInstagram();
            //this.navCtrl.push(ShopToSharePage);
          }
        },{
          text: 'Copier lien',
          icon: 'link',
          handler: () => {
            console.log('Destructive clicked');
            this.CopyLink();
            //this.navCtrl.push(ShopToSharePage);
          }
        },{
          text: ' Partagez mes produits sur les réseaux sociaux',
          icon: 'add-circle',
          handler: () => {
            this.goToProductShare();
            //this.goToProductShare();
          }
        },{
          text: 'Fermer',
          role: 'cancel',
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

  shareSocialMedia() {
    let link = DEEP_LINK_DOMAIN + this.Market.id + "/" + false;
    let option = {
      message : "Rejoignez nous sur Lastagram ",
      files: null,
      url: link,
      chooserTitle: "Choisissez une application"
    }
    this.socialSharing.shareWithOptions(option);
  }

  shareWhatsapp() {
    let message = "Rejoignez nous sur Lastagram ";
    let image = "" // image de couverture
    let link = DEEP_LINK_DOMAIN + this.Market.id + "/" + false;

    this.socialSharing.canShareVia("whatsapp","Test catana",null,null,null).then((res) => {
        console.log(res);
        this.socialSharing.shareViaWhatsApp(message,null,link).then(() => {
          console.log("sharing ::::");


        }) .catch(e => {
          console.log(e);

        })

    }) .catch((e)=> {
      console.log("erreur " + e);
      let alert = this.alertCtrl.create({
        title: 'ATTENTION',
        subTitle: 'Installer l\'application avant tout !',
        buttons: ['OK']
      });
      alert.present();

    });

  }

  shareFacebook() {
    let message = "Rejoignez nous sur Lastagram  ";
    let image = "" // image de couverture
    let link = DEEP_LINK_DOMAIN + this.Market.id + "/" + false;

    this.socialSharing.canShareVia("com.facebook.katana","Test catana",null,null,null).then((res) => {
        console.log(res);
        this.socialSharing.shareViaFacebook(message,null,link).then(() => {
          console.log("sharing ::::");


        }) .catch(e => {
          console.log(e);

        })

    }) .catch((e)=> {
      console.log("erreur " + e);


      let alert = this.alertCtrl.create({
        title: 'ATTENTION',
        subTitle: 'Installer l\'application avant tout !',
        buttons: ['OK']
      });
      alert.present();

    });

  }


  shareInstagram() {
    let link = DEEP_LINK_DOMAIN + this.Market.id + "/" + false;

    let message = "Rejoignez nous sur Lastagram  " + link; // lien directe dans le message
    let image = null // image de couverture

    this.socialSharing.canShareVia("instagram","Test catana",null,null,null).then((res) => {
        console.log(res);
        this.socialSharing.shareViaInstagram(message,image).then(() => {
          console.log("sharing ::::");


        }) .catch(e => {
          console.log(e);

        })

    }) .catch((e)=> {
      console.log("erreur " + e);


      let alert = this.alertCtrl.create({
        title: 'ATTENTION',
        subTitle: 'Installer l\'application avant tout !',
        buttons: ['OK']
      });
      alert.present();

    });
  }

  CopyLink() {
    let link = DEEP_LINK_DOMAIN + this.Market.id + "/" + false;

    let message = "Rejoignez nous sur Lastagram " + link;
            this.clipboard.copy(message).then(
              () => {
                  const toast = this.toastCtrl.create({
                    message: 'Lien copié !',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();

              }
            );
  }


  Message() {
    console.log(localStorage.getItem('phoneUser'));
    let alert = this.alertCtrl.create({
      title: 'INFO',
      subTitle: 'Vous êtes en mode administration. L\'option message est, ici, désactivé !',
      buttons: ['OK']
    });
    alert.present();
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

  AddNewProd(indic) {
    console.log("c sa");

    this.navCtrl.push(AddProductAfterPage, { "id_catg": null, "id_market": this.Market.id, "indic" : indic });
  }


  goToAddProduct() {
    this.navCtrl.push(AddProductPage);
  }


  Analyse(json,name) {
    if (this.isAdmin) {
      console.log("modifier profile");
      this.navCtrl.push(ModifyProdPage, { "0": json, "etat": name, "id": null, "id_market": this.Market.id });
    } else {
      console.log("achat");

    }
  }

  ShowProfile() {
    this.navCtrl.push(MenuMarketPage, { id : this.Market.id, photo : this.Market.image_cover, name : this.Market.name, devis: this.Market.devis });
  }

  setToZero(id) {
    let alert = this.alertCtrl.create({
      title: 'Réglage Minuteur',
      inputs: [
        {
          name: 'hour',
          placeholder: 'Heure'
        },
        {
          name: 'minute',
          placeholder: 'Minute',
        },
        {
          name: 'second',
          placeholder: 'Second',
        }
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
            //data.timeNow = new Date().getTime();

            console.log(data.hour + ":" + data.minute + ":" + data.second);

            let time = {
              "timer" : data.hour + ":" + data.minute + ":" + data.second
            }
            let loading = this.loadingCtrl.create({
              content: 'Veuillez Patienter...'
            });
            loading.present();
            this.storeService.updateProduct2(time,Number(id)).subscribe(
              (success) => {
                console.log("time updated");
                console.log(success);

                loading.dismiss();

                let alert2 = this.alertCtrl.create({
                  title: 'SUCCESS',
                  subTitle: 'Timer a été mis à jour !',
                  buttons: [
                    {
                      text: 'OK',
                      role: 'cancel',
                      handler: () => {
                        //this.navCtrl.push(MyShopPage);
                        this.navCtrl.push(BoutiquePage, { "id" : this.id });
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
                  subTitle: 'Echec de la mise à jour !',
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
  }

  setImageDeco1(id) {
    this.imageCompress.uploadFile().then(({image, orientation}) => {

      this.base64Image = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image, -1, 50, 60).then(
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
                       // this.navCtrl.push(MyShopPage);
                       this.navCtrl.push(BoutiquePage, { "id" : this.id });
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

      this.imageCompress.compressFile(image,-1, 50, 60).then(
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
                        //this.navCtrl.push(MyShopPage);
                        this.navCtrl.push(BoutiquePage, { "id" : this.id });
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

  f() {
    console.log('bonjour');
  }

  setImageDeco3(id) {
    this.imageCompress.uploadFile().then(({image, orientation}) => {

      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image,-1, 50, 60).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          let loading = this.loadingCtrl.create({
            content: 'Veuillez Patienter...'
          });
          loading.present();
          let data = {
            "img_decore" : this.imgResultAfterCompress
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
                          //this.navCtrl.push(MyShopPage);
                          this.navCtrl.push(BoutiquePage, { "id" : this.id });
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
                                      this.navCtrl.push(BoutiquePage, { "id" : this.id });
                                      //this.navCtrl.setRoot(this.navCtrl.getActive().component);
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

                this.imageCompress.compressFile(image, -1, 40, 45).then(
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
                                  //this.navCtrl.push(MyShopPage);
                                  this.navCtrl.push(BoutiquePage, { "id" : this.id });
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

  modifImg2() {

    this.imageCompress.uploadFile().then(({image, orientation}) => {

      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image, -1, 40, 45).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          let loading = this.loadingCtrl.create({
            content: 'Veuillez Patienter...'
          });
          loading.present();
          let data = {
            "image_cover2" : this.imgResultAfterCompress
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
                        //this.navCtrl.push(MyShopPage);
                        this.navCtrl.push(BoutiquePage, { "id" : this.id });
                      }
                    }
                  ]
                });
                alert4.present();
            },
            (error) => {

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

  modifImg3() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {

      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image, -1, 40, 45).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          let loading = this.loadingCtrl.create({
            content: 'Veuillez Patienter...'
          });
          loading.present();
          let data = {
            "image_cover3" : this.imgResultAfterCompress
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
                        //this.navCtrl.push(MyShopPage);
                        this.navCtrl.push(BoutiquePage, { "id" : this.id });
                      }
                    }
                  ]
                });
                alert4.present();
            },
            (error) => {

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


  addCouvertImg(num) {
    console.log('les stats ! ');
    if (num === 1) {
      this.imageCompress.uploadFile().then(({image, orientation}) => {

        //this.base64Image = image;
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
        let loading = this.loadingCtrl.create({
          content: 'Veuillez Patienter...'
        });
        loading.present();
        this.imageCompress.compressFile(image, -1, 50, 60).then(
          result => {
            this.imgResultAfterCompress = result;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            let data = {
              "image_cover" : this.imgResultAfterCompress
            }
            this.storeService.updateProduct2(data,this.Market.id).subscribe(
              (response) => {
                  console.log(response);
                  loading.dismiss();
                  let alert2 = this.alertCtrl.create({
                    title: 'SUCCESS',
                    subTitle: 'Photo de boutique modifée !',
                    buttons: [
                      {
                        text: 'OK',
                        role: 'cancel',
                        handler: () => {
                         // this.navCtrl.push(MyShopPage);
                         this.navCtrl.push(BoutiquePage, { "id" : this.id });
                        }
                      }
                    ]
                  });
                  alert2.present();
              },
              (error) => {

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
    } else if (num === 2) {
      this.imageCompress.uploadFile().then(({image, orientation}) => {

        //this.base64Image = image;
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
        let loading = this.loadingCtrl.create({
          content: 'Veuillez Patienter...'
        });
        loading.present();
        this.imageCompress.compressFile(image, -1, 50, 60).then(
          result => {
            this.imgResultAfterCompress = result;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            let data = {
              "image_cover_2" : this.imgResultAfterCompress
            }
            this.storeService.updateProduct2(data,this.Market.id).subscribe(
              (response) => {
                  console.log(response);
                  loading.dismiss();
                  let alert2 = this.alertCtrl.create({
                    title: 'SUCCESS',
                    subTitle: 'Photo de boutique modifée !',
                    buttons: [
                      {
                        text: 'OK',
                        role: 'cancel',
                        handler: () => {
                          //this.navCtrl.push(MyShopPage);
                          this.navCtrl.push(BoutiquePage, { "id" : this.id });
                        }
                      }
                    ]
                  });
                  alert2.present();
              },
              (error) => {

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
    } else if (num === 3) {
      this.imageCompress.uploadFile().then(({image, orientation}) => {

        //this.base64Image = image;
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
        let loading = this.loadingCtrl.create({
          content: 'Veuillez Patienter...'
        });
        loading.present();
        this.imageCompress.compressFile(image, -1, 50, 60).then(
          result => {
            this.imgResultAfterCompress = result;
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            let data = {
              "image_cover_3" : this.imgResultAfterCompress
            }
            this.storeService.updateProduct2(data,this.Market.id).subscribe(
              (response) => {
                  console.log(response);
                  loading.dismiss();
                  let alert2 = this.alertCtrl.create({
                    title: 'SUCCESS',
                    subTitle: 'Photo de boutique modifée !',
                    buttons: [
                      {
                        text: 'OK',
                        role: 'cancel',
                        handler: () => {
                          //this.navCtrl.push(MyShopPage);
                          this.navCtrl.push(BoutiquePage, { "id" : this.id });
                        }
                      }
                    ]
                  });
                  alert2.present();
              },
              (error) => {

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
  }


  goToSearchMode() {
    this.navCtrl.push(SearchPage);
  }


  async openPopover(ev: Event,id) {
    let popover = this.popoverCtrl.create(ModalPage,{ "id_catg": id, "id_boutique": this.Market.id, "slug": this.slug });
    popover.present({
      ev: ev
    });
  }


  async openSharePopover(ev: Event) {
    let popover = this.popoverCtrl.create(ShareDesignPage, { id : this.Market.id });
    popover.present({
      ev: ev
    });
  }

  presentActionSheet2(id) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Produit ',
      buttons: [
        {
          text: 'Modifier la catégorie',
          icon: 'md-create',
          handler: () => {
            console.log('Destructive clicked');
            this.navCtrl.push(ModifyCategoryPage, { id_catg: id, id_market: this.Market.id });

            //this.navCtrl.push(ShopToSharePage);
          }
        },{
          text: 'Ajouter des produits',
          icon: 'md-add-circle',
          handler: () => {
            console.log('Destructive clicked');
            this.navCtrl.push(ListProdPage, { "id_catg" : id, "id_boutique": this.Market.id, "slug":  this.slug} );

            //this.navCtrl.push(ShopToSharePage);
          }
        },{
          text: 'Fermer',
          role: 'cancel',
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
}
