import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { LanguageProvider } from './../../providers/language/language';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the LanguageSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-language-setting',
  templateUrl: 'language-setting.html',
})
export class LanguageSettingPage {

  languages = [];
  selected = '';
  indic = localStorage.getItem('language');
  constructor(public navCtrl: NavController,private translate: TranslateService, private toastCtrl: ToastController, public navParams: NavParams, private languageService: LanguageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LangueSettingPage');
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.translate.instant('OTHERS.lng_chg'),
      duration: 3000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  select(lng) {   
    this.languageService.setLanguage(lng);
    localStorage.setItem('language', lng);
    this.presentToast();
  }

}
