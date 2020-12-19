import { BoutiqueGeneralPage } from './../boutique-general/boutique-general';
import { ImageVieweerPage } from './../image-vieweer/image-vieweer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CartPage } from './../cart/cart';
import { OrderProvider } from './../../providers/order/order';
import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController, ActionSheetController } from 'ionic-angular';
import { DEEP_LINK_DOMAIN } from '../../app/environment';
import { Clipboard } from '@ionic-native/clipboard';

/**
 * Generated class for the DetailProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-product',
  templateUrl: 'detail-product.html',
})
export class DetailProductPage {
  quantity = 1;
  visibility = false;
  id_article;
  id_market;
  product;
  id_owner;
  devis;
  cart;
  taille;
  isSubscribed;
  actionSheet;
  constructor( private clipboard: Clipboard,public actionSheetCtrl: ActionSheetController,private platform: Platform,public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,public loadingCtrl: LoadingController, private storeService: StoreProvider, private orderService: OrderProvider, public modalCtrl: ModalController, private socialSharing: SocialSharing,public toastCtrl: ToastController, private photoViewer: PhotoViewer) {

    if (this.navParams.get('isSubscribed')) {
        this.isSubscribed = this.navParams.get('isSubscribed');
    }



   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProductPage');
    if (this.navParams.get('devis')) {
      this.devis = this.navParams.get('devis');
    } else {
      this.devis = this.navParams.get('devis2');
    }

    console.log("le devis : " + this.devis);


    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    this.id_article = this.navParams.get('id');
    this.id_market = this.navParams.get('id_market');
    this.id_owner = this.navParams.get('owner');
    console.log("le proprio : " + this.id_owner);
    console.log(this.id_market);

    console.log(this.id_article);

    this.storeService.getProductByID(this.id_article).subscribe(
      (data) => {
        data.description = decodeURI(data.description);
        this.product = data;

        console.log("az : "+JSON.stringify(this.product));
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    )



  }

  ionViewDidLeave(){
    console.log("page ending ...");
    if (this.actionSheet) {
      this.actionSheet.dismiss();
    }
  }

  Gotomarket() {
    this.navCtrl.push(BoutiqueGeneralPage, { "id" : this.id_market })
  }

  inscrease() {
    this.quantity++;
  }

  discrease() {
    if (this.quantity !== 0) {
      this.quantity--;
    }

  }

  goToShare() {
    this.visibility = true;
  }

  closeShare() {
    this.visibility = false;
  }

  viewCart() {
    this.navCtrl.push(CartPage);
  }

  zoomImg() {
    /*const modal = this.modalCtrl.create(ImageVieweerPage, { img : this.product.image_cover});
    modal.present();*/
    this.photoViewer.show(this.product.image_cover);
  }

  addToCart(id) {

    if (localStorage.getItem('userToken') !== null) {
      let data  = {
        "id" : id,
        "id_store" : Number(this.id_market),
        "quantity": this.quantity
      };
      console.log(data);

      this.orderService.addToCart(data).subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          if (localStorage.getItem('id_owners') == null) {
            localStorage.setItem('id_owners',JSON.stringify([ Number(this.id_owner) ]));
          } else {
            let tab = JSON.parse(localStorage.getItem('id_owners'));
            if (tab.includes(this.id_owner)) {
              localStorage.setItem('id_owners', JSON.stringify(tab));
            } else {
              tab.push(Number(this.id_owner));
              localStorage.setItem('id_owners', JSON.stringify(tab));
            }


          }

          /*if (localStorage.getItem('count_cart') !== null) {
            let count = Number(JSON.parse(localStorage.getItem('count_cart')));
            count ++;
            localStorage.setItem('count_cart', JSON.stringify(count));
          } else {
            let count = 1;
            localStorage.setItem('count_cart', JSON.stringify(count));
          }*/

          let alert = this.alertCtrl.create({
            title: 'SUCCESS',
            subTitle: 'Ajoutez au panier avec succès !',
            buttons: ['OK']
          });
          alert.present();
        }, (err) => {
          console.log(err);
          let alert = this.alertCtrl.create({
            title: 'ECHEC',
            subTitle: 'Veuillez vérifier votre connexion internet',
            buttons: ['OK']
          });
          alert.present();
        }
      )
    } else {
      const modal = this.modalCtrl.create(HomePage);
      modal.present();
    }
    /*if (localStorage.getItem('panier') === null) {
      //
      console.log("aucun element dans la boutique");
      localStorage.setItem('panier',JSON.stringify([{"idProd" : Number(id), "qte" : 1, "idMarket": this.id_market }]));

      let alert = this.alertCtrl.create({
        title: 'SUCCESS',
        subTitle: 'Ajoutez au panier avec succès !',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let tab = JSON.parse(localStorage.getItem('panier'));
      //tab = JSON.parse(tab)
      tab.push({"idProd" : Number(id), "qte" : 1, "idMarket": this.id_market  });
      console.log(tab);
      localStorage.setItem('panier',JSON.stringify(tab));

      let alert = this.alertCtrl.create({
        title: 'SUCCESS',
        subTitle: 'Ajoutez au panier avec succès !',
        buttons: ['OK']
      });
      alert.present();
    }*/
  }



  shareSocialMedia() {
    let link = DEEP_LINK_DOMAIN + "product/"+ this.id_article +"/"+ this.id_market +"/"+ this.id_owner;    let option = {
      message : "Êtes-vous intéressez par mon produit ?",
      files: null,
      url: link,
      chooserTitle: "Choisissez une application"
    }
    this.socialSharing.shareWithOptions(option);
  }

  shareWhatsapp() {
    let message = "Êtes-vous intéressez par mon produit ?";
    let image = "" // image de couverture
    let link = DEEP_LINK_DOMAIN + "product/"+ this.id_article +"/"+ this.id_market +"/"+ this.id_owner;
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
    let message = "Êtes-vous intéressez par mon produit ? ";
    let image = "" // image de couverture
    let link = DEEP_LINK_DOMAIN + "product/"+ this.id_article +"/"+ this.id_market +"/"+ this.id_owner;
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
    let link = DEEP_LINK_DOMAIN + "product/"+ this.id_article +"/"+ this.id_market +"/"+ this.id_owner;
    let message = "Êtes-vous intéressez par mon produit ? " + link; // lien directe dans le message
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
    let link = DEEP_LINK_DOMAIN + "product/"+ this.id_article +"/"+ this.id_market +"/"+ this.id_owner;
    let message = "Êtes-vous intéressez par mon produit ?" + link;
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


  presentActionSheet() {
     this.actionSheet = this.actionSheetCtrl.create({
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
          text: 'Messenger',
          icon: 'chatbubbles',
          handler: () => {
            console.log('Destructive clicked');
            this.shareMessenger();
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
          text: ' Plus d\'options',
          icon: 'add-circle',
          handler: () => {
            this.shareSocialMedia();
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
    this.actionSheet.present();

  }

  shareMessenger() {
    let message = "Rejoignez nous sur Lastagram ";
    let image = "" // image de couverture
    let link = DEEP_LINK_DOMAIN + "product/"+ this.id_article +"/"+ this.id_market +"/"+ this.id_owner;


    this.socialSharing.canShareVia("com.facebook.orca","Test messenger",null,null,null).then((res) => {
      console.log(res);
      this.socialSharing.shareVia("com.facebook.orca",message,null,null,link).then(() => {
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




  goToBack() {
    this.navCtrl.pop();
  }
}
