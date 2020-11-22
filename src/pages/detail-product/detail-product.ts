import { CartPage } from './../cart/cart';
import { OrderProvider } from './../../providers/order/order';
import { StoreProvider } from './../../providers/store/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SocialSharing } from '@ionic-native/social-sharing';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,public loadingCtrl: LoadingController, private storeService: StoreProvider, private orderService: OrderProvider, public modalCtrl: ModalController, private socialSharing: SocialSharing) {
    this.devis = this.navParams.get('devis');
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProductPage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    this.id_article = this.navParams.get('id');
    this.id_market = this.navParams.get('id_market');
    this.id_owner = this.navParams.get('owner');
    console.log("le proprio : " + this.id_owner);

    console.log(this.id_article);

    this.storeService.getProductByID(this.id_article).subscribe(
      (data) => {
        this.product = data;
        console.log(JSON.stringify(this.product));
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    )

  }

  inscrease(id,value) {
    /*this.quantity++;
    JSON.parse(localStorage.getItem('panier')).forEach(element => {
      if (element.idProd === Number(id)) {
        console.log(element.qte);
        localStorage.setItem('panier',JSON.stringify(element.))
      }
    });
    let tab = JSON.parse(localStorage.getItem('panier'));
    tab.forEach(element => {
      if (element.idProd === Number(id)) {
        element.qte ++;
        console.log(element.qte);
       localStorage.setItem('panier',JSON.stringify(tab))
      }
    });
    console.log(tab);*/
    let data = {
      "id" : id,
      "quantity": 1
    };
    console.log(data);

    this.orderService.updateQuantity(data).subscribe(
      (data) => {
        console.log(data);
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
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


  }

  discrease(id,value) {

    if (Number(value) > 1) {
      let data = {
        "id" : id,
        "quantity": -1
      };
      console.log(data);

      this.orderService.updateQuantity(data).subscribe(
        (data) => {
          console.log(data);
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
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
      let alert = this.alertCtrl.create({
        title: 'ATTENTION',
        subTitle: 'La quantité est à 1. Si vous voulez supprimer le produit, veuillez cliquez directement sur la croix !',
        buttons: ['OK']
      });
      alert.present();
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

  addToCart(id) {

    if (localStorage.getItem('userToken') !== null) {
      let data  = {
        "id" : id,
        "quantity": 1
      };
      this.orderService.addToCart(data).subscribe(
        (data) => {
          console.log(data);
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

  shareFacebook() {
    let message = "Etes vous intéressez par mon produit " +this.product.name+ " ? ";
    let image = this.product.image_cover;

    this.socialSharing.canShareVia("com.facebook.katana","Test catana",null,null,null).then((res) => {
        console.log(res);
        this.socialSharing.shareViaFacebook(message,image,null).then(() => {
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

    /*this.socialSharing.shareViaFacebook(message,image,null).then(() => {
      console.log("sharing ::::");

    }) .catch(e => {
      console.log(e);

    })*/
  }


  shareWhatsapp() {
    let message = "Etes vous intéressez par mon produit " +this.product.name+ " ? ";
    let image = this.product.image_cover;

    this.socialSharing.canShareVia("whatsapp","Test catana",null,null,null).then((res) => {
        console.log(res);
        this.socialSharing.shareViaWhatsApp(message,image,null).then(() => {
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


  shareSocialMedia() {
    let option = {
      message : "Etes vous intéressez par mon produit " +this.product.name+ " ? ",
      files: [this.product.image_cover],
      url: "lastagram://lastagram.herokuapp.com/product/"+ this.id_article +"/"+ this.id_market +"/"+ this.id_owner,
      chooserTitle: "Choisissez une application"
    }
    this.socialSharing.shareWithOptions(option);
  }


  goToBack() {
    this.navCtrl.pop();
  }
}
