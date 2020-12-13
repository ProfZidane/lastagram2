import { HomePage } from './../home/home';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { SharePage } from '../share/share';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the AccueilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})
export class AccueilPage {
  rootPage2:any;
  visibility = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public menuCtrl: MenuController) {

    if (localStorage.getItem('userToken') !== null) {
      this.rootPage2 = TabsPage;
    } else {
      this.rootPage2 = HomePage;
    }

  }

  /*ionViewCanEnter(): boolean {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      return false;
    }
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccueilPage');
  }

  /*presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Partage',
      buttons: [
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'WhatsApp',
          icon: "logo-whatsapp",
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Télégram',
          icon: "ios-paper-plane",
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Messenger',
          icon: "logo-messenger",
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Copier lien',
          icon: "link",
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Fermer',
          role: 'destructive',
          icon: 'close-circle',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }*/



  closeShareComponent() {
    console.log("fermer");
    this.visibility = false;
  }

  showShareComponent() {
    this.visibility = true;
  }

  openMenu() {
    this.menuCtrl.open();
  }
}
