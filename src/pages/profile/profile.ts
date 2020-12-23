import { LanguageSettingPage } from './../language-setting/language-setting';
import { LoginPage } from './../login/login';
import { MyNotifPage } from './../my-notif/my-notif';
import { AccueilPage } from './../accueil/accueil';
import { TabsPage } from './../tabs/tabs';
import { UserProvider } from './../../providers/user/user';
import { HomePage } from './../home/home';
import { MessageMenuPage } from './../message-menu/message-menu';
import { MyOrdersPage } from './../my-orders/my-orders';
import { ModifyProfilePage } from './../modify-profile/modify-profile';
import { CreateBoutiquePage } from './../create-boutique/create-boutique';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MyShopPage } from '../my-shop/my-shop';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { AssistancePage } from '../assistance/assistance';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  infoUser;
  photo;
  country;
  active = false;
  constructor(private platform: Platform,public http: HttpClient, private translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public userService: UserProvider,public loadingCtrl: LoadingController, private alertCtrl: AlertController, private app: App) {

    this.platform.registerBackButtonAction( () => {
        console.log("click to back button profile !");
        /*if (this.navCtrl.getActive().component.name === "ProfilePage") {

          this.app.getRootNav().getActiveChildNav().select(0);

        }*/



    })

   /* document.addEventListener('backbutton', () => {
      if (this.navCtrl.getActive().component.name === "ProfilePage") {
        console.log("click to back button ProfilePage !");

        this.app.getRootNav().getActiveChildNav().select(0);

      } else {
        console.log("c pas sa");

      }

    })*/

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
    if (localStorage.getItem('userToken') === null) {
      //this.navCtrl.push(HomePage);
      this.app.getRootNav().setRoot(HomePage);

    } else {
      let loading = this.loadingCtrl.create({
        content: this.translate.instant('LOAD.mgs')
      });
      loading.present();

      this.userService.findData().subscribe(
        (info) => {
          console.log(JSON.stringify(info));
          this.infoUser = info;
          this.photo = info.photo;
          if (localStorage.getItem('nameUser') == null && localStorage.getItem('name2User') == null
              && localStorage.getItem('phoneUser') == null && localStorage.getItem('mailUser') == null
              && localStorage.getItem('idUser') == null && localStorage.getItem('photoUser') == null && localStorage.getItem('usernameChat') == null && localStorage.getItem('country') == null) {

                localStorage.setItem('userObject',info);
                localStorage.setItem('nameUser', info.first_name);
                localStorage.setItem('name2User', info.last_name);
                localStorage.setItem('phoneUser', info.phone);
                localStorage.setItem('mailUser', info.email);
                localStorage.setItem('idUser', info.id);
                localStorage.setItem('photoUser', info.photo);
                localStorage.setItem('usernameChat', info.username);
                localStorage.setItem('country', info.country);
              }

              this.http.get('https://restcountries.eu/rest/v2/alpha/'+info.country).subscribe(
                (data) => {
                  this.country = data;
                  console.log('pays : ' + this.country);
                }, (err) => {
                  console.log(err)
                }
              )

          loading.dismiss();

        }, (err) =>  {
          console.log(err);
          if (err.status == 0 && err.statusText == "Unknown Error") {
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: this.translate.instant('ALERT.warn_title'),
              subTitle: this.translate.instant('ALERT.500'),
              buttons: ['OK']
            });
            alert.present();
          } else if (err.status == 401 && err.statusText == "Unauthorized") {
            loading.dismiss();
            this.Logout();
          }
        }
      )
    }



  }


  goToCreateBoutique() {
    if (localStorage.getItem('userToken') !== null) {
      this.navCtrl.push(CreateBoutiquePage);
    } else {
      //this.navCtrl.push(HomePage);
      this.app.getRootNav().setRoot(HomePage);

/*      const modal = this.modalCtrl.create(HomePage);
      modal.present();*/
    }
  }

  goToModifyProfile() {
    if (localStorage.getItem('userToken') !== null) {
      this.navCtrl.push(ModifyProfilePage);
    } else {
      //this.navCtrl.push(HomePage);
      this.app.getRootNav().setRoot(HomePage);

      /*const modal = this.modalCtrl.create(HomePage);
      modal.present();*/
    }

  }

  goToMyShop() {

    if (localStorage.getItem('userToken') !== null) {
      this.navCtrl.push(MyShopPage);
    } else {
      this.app.getRootNav().setRoot(HomePage);

      //this.navCtrl.push(HomePage);
      /*const modal = this.modalCtrl.create(HomePage);
      modal.present();*/
    }


  }

  goToMyOrders() {
    if (localStorage.getItem('userToken') !== null) {
      this.navCtrl.push(MyOrdersPage);
    } else {
      //this.navCtrl.push(HomePage);
      this.app.getRootNav().setRoot(HomePage);

      /*const modal = this.modalCtrl.create(HomePage);
      modal.present();*/
    }

  }

  goToMyNotifs() {
    this.navCtrl.push(MyNotifPage);
  }


  goToMessageMenu() {
    if (localStorage.getItem('userToken') !== null) {
      this.navCtrl.push(MessageMenuPage);
    } else {
      //this.navCtrl.push(HomePage);
      this.app.getRootNav().setRoot(HomePage);

      /*const modal = this.modalCtrl.create(HomePage);
      modal.present();*/
    }

  }

  goToAbout() {
    this.navCtrl.push(AboutPage)
  }

  goToAssistance(){
    this.navCtrl.push(AssistancePage)
  }

  goToLanguageSetting() {
    this.navCtrl.push(LanguageSettingPage);
  }

  Logout() {
    let loading = this.loadingCtrl.create({
      content: this.translate.instant('LOAD.mgs')
    });
    loading.present();
    let lng = localStorage.getItem('language');
    //localStorage.removeItem('userToken');
    localStorage.clear();

    localStorage.setItem('new', 'false');
    localStorage.setItem('language', lng);
    loading.dismiss();
    /*const modal = this.modalCtrl.create(HomePage);
    modal.present();*/
    this.app.getRootNav().setRoot(HomePage);
  }


}
