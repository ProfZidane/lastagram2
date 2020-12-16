import { DetailProductInCartPage } from './../detail-product-in-cart/detail-product-in-cart';
import { DetailProductPage } from './../detail-product/detail-product';
import { OrderProvider } from './../../providers/order/order';
import { StoreProvider } from './../../providers/store/store';
import { CheckoutPage } from './../checkout/checkout';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
panier;
products = [];
tt = [];
Total = 0;
vide;
inexiste;
  quantity: number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storeService: StoreProvider, public loadingCtrl: LoadingController, private orderService: OrderProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');

    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();

    this.orderService.getProductToCart().subscribe(
      (data) => {
        console.log( "jj : " + JSON.stringify(data));

        if (data.message) {
          this.vide = "Votre panier est vide !";
        } else {

          let product = data.articles;
          if (product.length == 0) {
            this.vide = "Votre panier est vide !";
            loading.dismiss();
          } else {
            //product.qte = data.articles[0].quantity;
            product.forEach(element => {
                this.products.push(element);
            });

            this.products.forEach(elt => {
              this.Total += Number(elt.article.price) * Number(elt.quantity);
            })
            //this.Total += Number(data.articles[0].quantity) * Number(data.articles[0].article.price)
            loading.dismiss();
            console.log(this.products);

          }




        }

      } , (err) => {
        console.log(err);
        /*let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'Veuillez vérifier votre connexion internet',
          buttons: ['OK']
        });
        alert.present();*/
        loading.dismiss();
        this.vide = "vide !"
      }
    )


  }

  goToValidation() {

    this.navCtrl.push(CheckoutPage);
  }

  goToDetailProduct(json) {


    this.navCtrl.push(DetailProductInCartPage, { "data" : json });
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

  clear(id) {
    console.log(id);
    this.orderService.deleteInCart(id).subscribe(
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

    //this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }


  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
