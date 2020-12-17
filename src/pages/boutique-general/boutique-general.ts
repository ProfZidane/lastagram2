import { SearchByMarketPage } from './../search-by-market/search-by-market';
import { CartPage } from './../cart/cart';
import { SearchPage } from './../search/search';
import { ProfilePage } from './../profile/profile';
import { LoginPage } from './../login/login';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { MessageContentPage } from './../message-content/message-content';
import { DetailProductPage } from './../detail-product/detail-product';
import { ProductOfCategoryPage } from './../product-of-category/product-of-category';
import { MyShopPage } from './../my-shop/my-shop';
import { StoreProvider } from './../../providers/store/store';
import { AddProductPage } from './../add-product/add-product';
import { ChangeDetectorRef, Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the BoutiqueGeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Entry{
  created: Date;
  id: string;
}

export interface TimeSpan{
  hours: number;
  minutes: number;
  seconds: number;
}

@IonicPage()

@Component({
  selector: 'page-boutique-general',
  templateUrl: 'boutique-general.html',
})




export class BoutiqueGeneralPage {
  id;
  isAdmin=false;
  Market = {
    id: Number,
    name: "",
    image_cover: "",
    image_cover_2: "",
    image_cover_3: "",
    img_decore : "",
    category: [],
    flash: [],
    popular: [],
    articles: [],
    detail_articles: [],
    subscribers: 0,
    owner: Number,
    devis: "",
    timer: "",
    img_static_1 : "",
    img_static_2 : "",
    time_flash: ""
  }
  base64Image: string;
  slug;
  isSubscribed;
  username;
  owner;
  ownerInfo = {
    "first_name" : "", "last_name" : ""  };
  prop;
  second=0;
  minute=30;
  heure=0;
  timer;
  tabsElt;
  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider,public loadingCtrl: LoadingController, private alertCtrl: AlertController,
     private camera: Camera, public toastCtrl: ToastController, private callNumber: CallNumber, private app: App
  ) {

    this.tabsElt = document.getElementById('tabs');
    this.platform.registerBackButtonAction( () => {
      let nav = this.app.getActiveNav();
      if (nav.canGoBack()) {
        //nav.popToRoot()
        //nav.popTo(ProfilePage)
        //this.navCtrl.pop();
      } else {
        console.log("peut plus reculer");
        //this.navCtrl.push(LoginPage);
       // this.platform.exitApp();
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoutiquePageGeneral');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();

    this.id = this.navParams.get('id');
    this.isSubscribed = this.navParams.get('isAbonned');


    console.log(this.isSubscribed);

    console.log(this.id);
    this.storeService.getDetailMarketById(this.id).subscribe(
      (success) => {
        //console.log(JSON.stringify(success));
        console.log("data : " + JSON.stringify(success));
        this.ownerInfo.first_name = success.owner.first_name;
        this.ownerInfo.last_name = success.owner.last_name;
        this.prop = success.owner;
        //console.log("information proprietaire : " + JSON.stringify(this.prop));

        this.username = success.owner.username;
        this.Market.id = success.id;
        this.Market.name = success.name;
        this.Market.image_cover = success.image_cover;
        this.Market.image_cover_2 = success.image_cover_2;
        this.Market.image_cover_3 = success.image_cover_3;
        this.Market.img_decore = success.img_decore;
        this.Market.category = success.category;
        this.Market.subscribers = success.subscribers_count;
        this.Market.detail_articles = success.category;
        this.Market.owner = success.owner.id;
        this.Market.devis = success.devis;
        this.Market.time_flash = success.time_flash;
        this.Market.img_static_1 = success.img_static_1;
        this.Market.img_static_2 = success.img_static_2;
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

        success.articles.forEach(element => {
          if (element.store.subscribers) {
            if (element.store.subscribers.length > 0) {
              if (element.store.subscribers.indexOf(Number(localStorage.getItem('idUser'))) !== undefined) {
                this.isSubscribed = true;
                return false;
              }
            }
          }


        });
        console.log("id : " + localStorage.getItem('idUser'));

        console.log("abonne : "+this.isSubscribed);



        /*this.Market.category.forEach(element => {
          this.storeService.getDetailCatg(element.id).subscribe(
            (response) => {
              this.Market.detail_articles.push(response);
            },
            (error) => {
              console.log(error);

            }
          )
        });*/

        /*
          if (localStorage.getItem('time') !== null) {

            let Storetime = JSON.parse(localStorage.getItem('time'));

            Storetime.forEach(element => {
              if (element.id === this.Market.id) {
                let time = element;
                let recent = time.recent;
                console.log("recent : " + recent);
                console.log("actual : " + new Date().getTime());

                if (element.minute > 0) {
                  let diff = new Date().getTime() - recent;


                if (diff > 60) {
                  let m = diff / 60000;
                  console.log("minute : " + m);
                  m = Math.round(m);



                  if (m <= 30) {
                    let d = this.minute - m;
                    this.minute = d;
                  } else {
                    this.minute = 0;
                  }
                  //this.minute = this.minute - m;



                } else {
                  let s = diff / 1000;
                  console.log("second : " + s);
                  s = Math.round(s)

                  if (s == 60) {
                    this.second = s;
                    this.minute --;
                  } else {
                    this.second = this.second - s;
                  }

                }

                let div = diff / 1000;

                console.log( " div : " + div);

                console.log(diff);
                }
              }
            });



          }

        this.startTimer()*/

        this.timer = this.Market.time_flash.split(':');
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



        //end of timer

        loading.dismiss();

        console.log(this.Market.detail_articles);

        console.log(this.Market.popular);

        console.log("Pas propriétaire : " + success);
      },
      (err) => {
        loading.dismiss();

        console.log(err);

      }
    )

  }

  /*ionViewWillEnter() {
    console.log('dd');

    this.tabsElt.style.display = "none";
  }

  ionViewWillLeave() {
    this.tabsElt.style.display = "block";
  }*/


  ShowProfile() {
    this.navCtrl.push(ProfilePage);
  }



  ionViewCanLeave() {
    let data = {
      timer : this.minute + ":" + this.second
    }

    console.log(data);



    /*if (localStorage.getItem('time') === null) {
      let tab = [];
      let time = {
        id : this.Market.id,
        second : this.second,
        minute : this.minute,
        hour : this.heure,
        recent : new Date().getTime()
      }
      tab.push(time)
      localStorage.setItem('time', JSON.stringify(tab));
    } else {
      let tab = JSON.parse(localStorage.getItem('time'));

      tab.forEach(element => {
        if (element.minute > 0) {
          console.log(JSON.stringify(element));
          console.log(this.Market.id);

          if (Number(element.id) === Number(this.Market.id)) {
            console.log('pareil');
            element.second = this.second;
            element.minute = this.minute;
            element.hour = this.heure;
            //tab.push(element);
            //localStorage.setItem('time', JSON.stringify(tab));
          } else {
            let time = {
              id : this.Market.id,
              second : this.second,
              minute : this.minute,
              hour : this.heure,
              recent : new Date().getTime()
            }
            tab.push(time)
            localStorage.setItem('time', JSON.stringify(tab));
          }
        }

      });


    }*/
  }

  Abonne(id) {
    console.log(id);
    let data = {
      "id_store" : id
    }
    this.storeService.Subscribe(data).subscribe(
      (success) => {
       /* let alert = this.alertCtrl.create({
          title: 'SUCCESS',
          subTitle: 'Vous êtes abonné',
          buttons: ['OK']
        });
        alert.present();*/
        const toast = this.toastCtrl.create({
          message: 'Vous êtes abonné !',
          duration: 3000
        });
        toast.present();
        this.isSubscribed = true;
        this.Market.subscribers ++;
        //this.navCtrl.setRoot(this.navCtrl.getActive().component);

      },
      (error) => {
        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'L\'opération n\'a pas abouti !',
          buttons: ['OK']
        });
        alert.present();
      }
    )

  }

  DesAbonne(id) {
    console.log(id);
    let data = {
      "id_store" : id
    }
    this.storeService.Subscribe(data).subscribe(
      (success) => {
        const toast = this.toastCtrl.create({
          message: 'Vous êtes maintenat désabonné !',
          duration: 3000
        });
        toast.present();
        this.isSubscribed = false;
        this.Market.subscribers --;
        //this.navCtrl.setRoot(this.navCtrl.getActive().component);

      },
      (error) => {
        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'L\'opération n\'a pas abouti !',
          buttons: ['OK']
        });
        alert.present();
      }
    )

  }

  Message(value) {
    if (localStorage.getItem('usernameChat') !== value) {
      let loading = this.loadingCtrl.create({
        content: 'Veuillez Patienter...'
      });
      loading.present();
      //localStorage.setItem('chatUser', value);
      /*let endpoint = "ws://192.168.1.27:8000/ws/chat/admin5522/";
      let socket = new WebSocket(endpoint);
      socket.onopen = function() {
        console.log("i am connected ....");
      }
      socket.onerror = function(err) {
        console.log("error " + err.isTrusted);

      }*/
      loading.dismiss();

      console.log("propio : " + JSON.stringify(this.ownerInfo));

      this.navCtrl.push(MessageContentPage,{
        "username": value,
      "info" : this.ownerInfo,
      "proprietaire": this.prop
    });
      /*this.app.getRootNav().push(
        MessageContentPage,
        {
          "username": value,
        "info" : this.ownerInfo,
        "proprietaire": this.prop
      }
      );*/
    } else {

      let alert = this.alertCtrl.create({
        title: 'ATTENTION',
        subTitle: 'Vous êtes le propriétaire de cette boutique, impossible d\'ouvrir la convrsation avec vous-même !',
        buttons: ['OK']
      });
      alert.present();

    }

    /*this.navCtrl.push(MessageContentPage, {
      "username": value,
      "info" : this.ownerInfo,
      "proprietaire": this.prop
    });*/
  }

  goHome() {
    this.navCtrl.push(LoginPage);
  }


  Call() {
    console.log(localStorage.getItem('phoneUser'));
    let alert = this.alertCtrl.create({
      title: 'INFO',
      subTitle: 'Numéro du propriétaire : ' + this.prop.phone,
      buttons: ['OK']
    });
    alert.present();
   // this.callNumber.callNumber(localStorage.getItem('phoneUser'), true)
  }

  GetProductByCtg(catg,catg_name, devis) {
    console.log(catg);
    this.navCtrl.push(ProductOfCategoryPage, { "id_catg" : catg, "id_boutique": this.Market.id, "name" : catg_name, "devis" : devis } );
  }

  goToAddProduct() {
    this.navCtrl.push(AddProductPage);
  }

  goToSearch() {
    this.navCtrl.push(SearchByMarketPage, { id : this.Market.id });
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }


  goToDetail(id,id_market,id_owner,devis) {
    this.navCtrl.push(DetailProductPage, { "id" : id, "id_market": id_market, "owner": id_owner, "devis" : devis, "isSubscribed" : this.isSubscribed });
  }

  startTimer() {
    setInterval(() => {
      this.settingTime()
    },1000);
  }

  startTimer2() {
    setInterval(() => {
      this.setSecond()
    },1000);
  }

  setMinute() {
    if (this.minute !== 0) {
      this.minute --;
    } else {
      this.minute = 0;
      this.second = 59;
     // this.setSecond();
    }
  }

  setSecond() {
    setInterval( () => {
      if (this.second !== 0) {
        this.second --;
      } else {
        this.second = 0;
      }
    },1000)
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

                          this.storeService.updateProduct2(data,id).subscribe(
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
                              console.log(error);
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

              const options: CameraOptions = {
                quality: 100,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
              }

              this.camera.getPicture(options).then((imageData) => {
                this.base64Image = 'data:image/jpeg;base64,' + imageData;
                let data = {
                  "image_cover" : this.base64Image
                }
                let loading = this.loadingCtrl.create({
                  content: 'Veuillez Patienter...'
                });
                loading.present();
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
                //localStorage.setItem('photoUser',this.base64Image);

              }, (err) => {
                console.log(err, "vos erreurs");
              })
            }
    }
  }

}
