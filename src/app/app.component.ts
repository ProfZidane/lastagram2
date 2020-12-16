import { MyShopPage } from './../pages/my-shop/my-shop';
import { CreateBoutiquePage } from './../pages/create-boutique/create-boutique';
import { BoutiqueGeneralPage } from './../pages/boutique-general/boutique-general';
import { PasswordModifyPage } from './../pages/password-modify/password-modify';
import { DetailProductPage } from './../pages/detail-product/detail-product';
import { ProfilePage } from './../pages/profile/profile';
import { LoginPage } from './../pages/login/login';
import { Deeplinks } from '@ionic-native/deeplinks';
import { TabsPage } from './../pages/tabs/tabs';
import { HomePage } from './../pages/home/home';
import { Component, NgZone, ViewChild } from '@angular/core';
import { Platform, Nav, App,AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG, snapshotToArray } from './environment';
import * as firebase from 'firebase';

firebase.initializeApp(FIREBASE_CONFIG);

import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications';

//import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;



  @ViewChild(Nav) navChild:Nav;
  constructor(platform: Platform,public alertCtrl: AlertController, private app: App, private localNotifications: LocalNotifications, statusBar: StatusBar, splashScreen: SplashScreen, private deeplinks: Deeplinks, private zone: NgZone) {
    if (localStorage.getItem('userToken') !== null) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = HomePage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.




      statusBar.styleDefault();
      splashScreen.hide();

      platform.registerBackButtonAction( () => {
        let nav = this.app.getActiveNav();

        console.log(
          typeof(nav.getActive().component.name)
        );



        if (nav.canGoBack()) {
          if (nav.getActive().component.name === "LoginPage") {
            const alert = this.alertCtrl.create({
              title: 'ATTENTION',
              subTitle: 'Voulez-vous sortir vraiment de Lastagram ?',
              buttons: [
                {
                  text: "Aller à l\'accueil",
                  role: 'cancel',
                  handler: () => {
                      console.log("go to home");
                    nav.push(LoginPage);
                  }

                },
                {
                  text: "Quitter",
                  handler: () => {
                    console.log("exit");
                    platform.exitApp();


                  }
                }
              ]
            });
            alert.present();

          } else if (nav.getActive().component.name === "CreateBoutiquePage") {

            nav.popToRoot();

          } else if (nav.getActive().component.name === "AddProductPage") {

            nav.push(CreateBoutiquePage);

          } else if (nav.getActive().component.name === "BoutiquePage") {

            nav.push(MyShopPage);

          } else if (nav.getActive().component.name === "ProfilePage") {

            nav.push(LoginPage);

          } else if (nav.getActive().component.name === "MyShopPage") {

            nav.push(ProfilePage);

          } else if (nav.getActive().component.name === "ListProdPage") {

            nav.pop();

          } else if (nav.getActive().component.name === "MessageContentPage") {

            nav.popToRoot();

          } else {

            nav.pop();

          }


        } else {
          console.log(nav);

          if (nav.getActive().component.name === "LoginPage") {
            const alert = this.alertCtrl.create({
              title: 'ATTENTION',
              subTitle: 'Voulez-vous sortir vraiment de Lastagram ?',
              buttons: [
                {
                  text: "Aller à l\'accueil",
                  role: 'cancel',
                  handler: () => {
                      console.log("go to home");
                    nav.push(LoginPage);
                  }

                },
                {
                  text: "Quitter",
                  handler: () => {
                    console.log("exit");
                    platform.exitApp();


                  }
                }
              ]
            });
            alert.present();

          } else if (nav.getActive().component.name === "CreateBoutiquePage") {

            nav.popToRoot();

          } else if (nav.getActive().component.name === "AddProductPage") {

            nav.push(CreateBoutiquePage);

          } else if (nav.getActive().component.name === "BoutiquePage") {

            nav.push(MyShopPage);

          } else if (nav.getActive().component.name === "ProfilePage") {

            nav.push(LoginPage);

          } else {

            const alert = this.alertCtrl.create({
              title: 'ATTENTION',
              subTitle: 'Voulez-vous sortir vraiment de Lastagram ?',
              buttons: [
                {
                  text: "Aller à l\'accueil",
                  role: 'cancel',
                  handler: () => {
                      console.log("go to home");
                    nav.push(LoginPage);
                  }

                },
                {
                  text: "Quitter",
                  handler: () => {
                    console.log("exit");
                    platform.exitApp();


                  }
                }
              ]
            });
            alert.present();

          }



        }
      },1)

      this.deeplinks.routeWithNavController(this.navChild,{
        '/': LoginPage,
        '/product/:id/:id_market/:owner' : DetailProductPage,
        '/market/:id/:isAbonned' : BoutiqueGeneralPage ,
        '/new-password' : PasswordModifyPage,
      }).subscribe(match => {
        console.log("deep : " + JSON.stringify(match));

      }, (nomatch => { console.log(JSON.stringify(nomatch));
      }))




    });




  }



  /*setupDeeplink() {
    this.deeplinks.route({
      "/": {},
      "/product" :  HomePage
    }).subscribe( (match) => {
      console.log(match);

    }, (err) => {
      console.log(err);

    })
  }*/

  /*setNotification(obj) {
    this.localNotifications.schedule({
      id : obj.id,
      title: obj.title,
      text: obj.text,
      data: { id: obj.id, sender: obj.sender },
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
            text : data.text,
            title : data.title
          });
        }
      } else {
        console.log('c pas  lui !')
      }
    })
  }*/
}
