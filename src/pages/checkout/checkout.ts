import { NotificationProvider } from './../../providers/notification/notification';
import { OrderedPage } from './../ordered/ordered';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { OrderProvider } from './../../providers/order/order';
import * as firebase from 'firebase';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  quantity = 1;
  here:string = "Votre lieu de livraison";
  products = [];
  user:string;
  Order;
  Total=0;
  id_order;
  attached_articles_to_notification;
  ref = firebase.database().ref('Order_notification/');

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl: LoadingController, private orderService: OrderProvider, private notificationService: NotificationProvider, private app: App) {
    /*this.platform.registerBackButtonAction( () => {
      let nav = this.app.getActiveNav();

      if (nav.canGoBack()) {
        //nav.popToRoot()
        //nav.popTo(ProfilePage)
        this.navCtrl.pop();
      } else {
        console.log("peut plus reculer");
        //this.navCtrl.push(ProfilePage);
        //this.platform.exitApp();
      }
    })*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    this.orderService.getProductToCart().subscribe(
      (data) => {
        this.Order = data;
        this.id_order = data.id;
        this.user = data.owner.first_name + ' ' + data.owner.last_name;
        console.log(data);
        console.log("chekc : " + JSON.stringify(data));

        let product = data.articles;

        if (product.length != 0) {
          //product.qte = data.articles[0].quantity;
          product.forEach(element => {
            console.log(element);

              this.products.push(element);

          });

          //this.attached_articles_to_notification.owner = data.owner;



          this.products.forEach(elt => {
            this.Total += Number(elt.article.price) * Number(elt.quantity);
          })
          //this.Total += Number(data.articles[0].quantity) * Number(data.articles[0].article.price)
          this.user = localStorage.getItem('nameUser');
          loading.dismiss();
          //console.log(JSON.stringify(this.products));

        }



      }, (err) => {
        console.log(err);

      }
    )
  }

  addItem(item) {
    if (item !== undefined && item !==null){
      let newItem = this.ref.push();
      newItem.set(item);

    }
    console.log('added to database ' + JSON.stringify(item));

  }

  send_notification(data,tab) {

    let text = "Nouvelle commande de " + data.owner.last_name  + " " + data.owner.first_name;

    let notification = {
      "id" : data.id,
      "text" : text,
      "title": "Commande",
      "receiver": tab,
      "sender": Number(localStorage.getItem('idUser')),
      "data": JSON.stringify(data),
      "is_seen": []
    }
    this.addItem(notification);
  }

  /*getDataOrderToFire() {
    firebase.database().ref('/Order_notification').on('child_added', resp => {

    })
  }*/



  goToOrdered() {
    let id_store = [];
    this.Order.articles.forEach(element => {
      let id = element.store;
      id_store.push(id);
    });
    this.send_notification(this.Order,JSON.stringify(id_store));

    /*let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...',
    });
    loading.present();
    let data = {
      "id_order": this.id_order
    }
    if (this.here != "Votre lieu de livraison") {
      this.orderService.validation(data).subscribe(
        (success) => {
          //console.log(JSON.string);

          //this.send_notification(success);
          console.log(success);
          console.log(localStorage.getItem('id_owners'));
          console.log(JSON.parse(localStorage.getItem('id_owners')));

          this.notificationService.createNotification({
            "notification_type" : "order",
            "content" : JSON.stringify(["Vous avez une commande de " + localStorage.getItem('nameUser') + ' ' + localStorage.getItem('name2User'),this.id_order]),
            "sender": Number(localStorage.getItem('idUser')),
            "receiver": JSON.parse(localStorage.getItem('id_owners')),
            "is_seen": []
          }).subscribe(
            (data) => {
              console.log("success : " + data.id);

            }, (err) => {
              console.log('err notif : ' + err);
              console.log(Object.keys(err));
              console.log(err.status);
              console.log(err.statusText);



            }
          );
          if (localStorage.getItem('count_cart') !== null) {
            let count = Number(JSON.parse(localStorage.getItem('count_cart')));
            count = 0 ;
            localStorage.setItem('count_cart', JSON.stringify(count));
          }
          loading.dismiss()
          this.navCtrl.push(OrderedPage);
        },
        (err) => {
          console.log(err);
          loading.dismiss()
          let alert = this.alertCtrl.create({
            title: 'ECHEC',
            subTitle: 'Veuillez vérifier votre connexion internet',
            buttons: ['OK']
          });
          alert.present();

        }
      )
    } else {
      loading.dismiss()
      let alert = this.alertCtrl.create({
        title: 'ATTENTION',
        subTitle: 'Veuillez saisir le lieu de livraison.',
        buttons: ['OK']
      });
      alert.present();
      this.here = "Votre lieu de livraison";
    }*/


  }

  goToAlertToHere() {

    let alert = this.alertCtrl.create({
      title: 'LIVRAISON',
      message: "Entrez le lieu de livraison",
      inputs: [
        {
          name: "here",
          placeholder: 'Lieu de livraison'
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

            this.here = data['here'];
            let datas = {
              "location": data['here'],
              "id_order": Number(this.id_order),

            }
            this.orderService.addPlace(datas).subscribe(
              (success) => {
                console.log(success);
                loading.dismiss();
              }, (error) => {
                console.log(error);
                let alert = this.alertCtrl.create({
                  title: 'ECHEC',
                  subTitle: 'Veuillez vérifier votre connexion internet',
                  buttons: ['OK']
                });
                alert.present();
                this.here = "Votre lieu de livraison";
                loading.dismiss();
              }
            )
          }
        }
      ]
    });
    alert.present();
  }

}
