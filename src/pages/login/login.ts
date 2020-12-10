import { MessageContentPage } from './../message-content/message-content';
import { ProfilePage } from './../profile/profile';
import { ShopToSharePage } from './../shop-to-share/shop-to-share';
import { ShareComponent } from './../../components/share/share';
import { UserProvider } from './../../providers/user/user';
import { MyNotifPage } from './../my-notif/my-notif';
import { NotificationProvider } from './../../providers/notification/notification';
import { ProductOfCategoryPage } from './../product-of-category/product-of-category';
import { BoutiqueGeneralPage } from './../boutique-general/boutique-general';
import { BoutiquePage } from './../boutique/boutique';
import { SearchPage } from './../search/search';
import { StoreProvider } from './../../providers/store/store';
import { ProductToSharePage } from './../product-to-share/product-to-share';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController, LoadingController } from 'ionic-angular';
import { SearchProvider } from './../../providers/search/search';
import { DEEP_LINK_DOMAIN, FIREBASE_CONFIG } from '../../app/environment';
import * as firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  visibility = false;
  markets;
  id;
  high;
  seen = [];
  previous;
  next;
  constructor(public loadingCtrl: LoadingController,private platform: Platform, public navCtrl: NavController, public navParams: NavParams, public storeService: StoreProvider, private alertCtrl: AlertController,public toastCtrl: ToastController, public modalCtrl: ModalController, private localNotifications: LocalNotifications, private notificationService: NotificationProvider, private userService: UserProvider, private socialSharing: SocialSharing,public actionSheetCtrl: ActionSheetController, private searchService: SearchProvider) {

    if (localStorage.getItem('userToken') !== null) {
      this.userService.findData().subscribe(
        (data) => {
          if (localStorage.getItem('nameUser') == null && localStorage.getItem('name2User') == null
              && localStorage.getItem('phoneUser') == null && localStorage.getItem('mailUser') == null
              && localStorage.getItem('idUser') == null && localStorage.getItem('photoUser') == null && localStorage.getItem('usernameChat') == null) {

                localStorage.setItem('nameUser', data.first_name);
                localStorage.setItem('name2User', data.last_name);
                localStorage.setItem('phoneUser', data.phone);
                localStorage.setItem('mailUser', data.email);
                localStorage.setItem('idUser', data.id);
                localStorage.setItem('photoUser', data.photo);
                localStorage.setItem('usernameChat', data.username);
              }
              console.log(JSON.stringify(localStorage.getItem('idUser')));
        }, (err) => {
          console.log(err);


        }
      )
    }

    if (localStorage.getItem('userToken') !== null) {
      this.platform.ready().then( () => {
        this.localNotifications.on('click').subscribe( res => {
          if (res.title === "Message") {
            console.log("data : " + JSON.stringify(res));

            this.navCtrl.push(MessageContentPage, { name : res.data.sender, username: res.data.username, photo : res.data.photo})
          }
        });

        /*this.localNotifications.on('trigger').subscribe( res => {
          let mgs = res.data ? res.data.mydata : '';
          console.log(mgs);
          this.navCtrl.push(MyNotifPage);
        });*/
      });
     }

     this.platform.registerBackButtonAction( () => {
      this.platform.exitApp();
    })
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

   if (localStorage.getItem('userToken') !== null) {
    /*setInterval( () => {
      this.notificationService.getNewNotification().subscribe(
        (data) => {
          console.log("data : " + data);



          data.forEach(element => {
            //console.log(element);
            //console.log(JSON.stringify(element.id + " " + element.content));
              if (element.receiver.includes(Number(localStorage.getItem('idUser'))) && element.is_seen.includes(Number(localStorage.getItem('idUser'))) == false ) {
                let s = {
                  "key" : element.id,
                  "value" : element.is_seen
                };
                this.seen.push(s);
                let data = JSON.parse(element.content)
                //console.log(data[0]);
                //console.log(data[1]);
                //console.log(element.content[1]);
                this.sheduleNotification(element.id,data[0],data[1]);
                console.log("notif");

              }
          });

        }, (err) => {
          console.log("status: " + err.status);
          console.log("statusText: " + err.statusText);
          //console.log(err.error);

          console.log(Object.keys(err));


        }
      )

    }, 10000);*/

    this.getDataToFire();

   }
   let loading = this.loadingCtrl.create({
    content: 'Veuillez Patienter...'
  });
  loading.present();

    this.storeService.getListStore().subscribe(

      (store) => {
        loading.dismiss();
        console.log(store.results);
        this.markets = store.results;
        this.previous = store.previous;
        this.next = store.next;
        this.markets.forEach(element => {
            if (element.subscribers.includes(Number(localStorage.getItem('idUser')))) {
              element.isSubscribed = true;
            } else {
              element.isSubscribed = false;
            }
        });
        //console.log(this.markets);

      }, (err) => {
        loading.dismiss();
        console.log(err);
        console.log(err.status);
        console.log(err.statusText);
        if (err.status == 0 && err.statusText == "Unknown Error") {
          let alert = this.alertCtrl.create({
            title: 'ATTENTION',
            subTitle: 'Veuillez verifiez votre connexion internet',
            buttons: ['OK']
          });
          alert.present();
        } else if (err.status == 500) {
          let alert = this.alertCtrl.create({
            title: 'ECHEC',
            subTitle: 'Echec de chargement. Veuillez réessayer plus tard!',
            buttons: ['OK']
          });
          alert.present();
        } else {
          let alert = this.alertCtrl.create({
            title: 'ECHEC',
            subTitle: 'Echec de chargement. Veuillez réessayer plus tard!',
            buttons: ['OK']
          });
          alert.present();
        }/*else if (err.status == 401 && err.statusText == "Unauthorized") {
          localStorage.clear();
          const modal = this.modalCtrl.create(HomePage);
          modal.present();
        }*/

      }


    );

    this.storeService.getHighCatg().subscribe(
      (data) => {

        this.high = data.results;
        console.log(data.results);

      },
      (error) => {
        console.log(error);

        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'Echec de chargement. Veuillez réessayer plus tard!',
          buttons: ['OK']
        });
        alert.present();

         /*if (error.status == 401 && error.statusText == "Unauthorized") {
          localStorage.clear();
          const modal = this.modalCtrl.create(HomePage);
          modal.present();
        }*/
      }
    )

  }

  setNotification(obj) {
    this.localNotifications.schedule({
      id : obj.id,
      title: obj.title,
      text: obj.text,
      data: { id: obj.id, sender: obj.sender, username: obj.username_sender, photo: obj.photo },
      trigger: { in: 2, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true
    });
  }

  getDataToFire() {
    firebase.database().ref('Notification/').on('child_added', resp => {
      console.log("firebase data : " + JSON.stringify(resp));
      let data = resp.val()
      if (data.receiver === localStorage.getItem('usernameChat')) {
        console.log('c lui !')
        if (data.is_seen === false) {
          this.setNotification(data);
          firebase.database().ref('Notification/' + resp.key).update({
            id : data.id,
            is_seen: true,
            receiver : data.receiver,
            sender : data.sender,
            username_sender : data.username_sender,
            photo: data.photo,
            text : data.text,
            title : data.title
          });
        }
      } else {
        console.log('c pas  lui !')
      }
    })
  }


  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      if (this.next !== null) {
        this.searchService.searchInfinite(this.next).subscribe(
          (data) => {
            let data_next = data.results;
            console.log(data);
            console.log(data);

            data_next.forEach(element => {
              if (element !== null) {
                this.markets.push( element );
                //this.total.push(element);
              }
            });

            this.next = data.next;

          }
        )
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }


  goReload() {

    this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }

  closeShareComponent() {
    console.log("fermer");
    this.visibility = false;
  }

  showShareComponent() {
    this.visibility = true;
  }

  goToProductShare() {
    this.navCtrl.push(ProductToSharePage);
  }


  ViewMarket(value,b) {
    console.log(value);
    this.navCtrl.push(BoutiqueGeneralPage, { "id": value, "isAbonned" :  b});
  }

  goToSearch() {
    this.navCtrl.push(SearchPage);
  }

  viewArticles(id,name,ctg_name) {
    this.navCtrl.push(ProductOfCategoryPage, { "id" : id, 'status': name, "name" : ctg_name } );
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
        this.navCtrl.setRoot(this.navCtrl.getActive().component);

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
          message: 'Vous êtes maintenant désabonné !',
          duration: 3000
        });
        toast.present();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);

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

  /*shareMessenger() {
    window.plugins.soci
  }*/

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Partage',
      buttons: [
        {
          text: 'Lien de boutique',
          role: 'destructive',
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
    let option = {
      message : "Rejoignez nous sur Lastagram ",
      files: null,
      url: DEEP_LINK_DOMAIN,
      chooserTitle: "Choisissez une application"
    }
    this.socialSharing.shareWithOptions(option);
  }


  // notification

  sheduleNotification(id,content,data) {

    this.localNotifications.schedule({
      id : id,

      title: "Lastagram Notification",
      text: content,
      data: { mydata: data },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true
    });
  }

  ShowProfile() {
    this.navCtrl.push(ProfilePage);
  }
}
