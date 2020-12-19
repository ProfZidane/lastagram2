import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LanguageProvider } from './../../providers/language/language';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private languageService: LanguageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LangueSettingPage');
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }

  select(lng) {
    this.languageService.setLanguage(lng);
  }

}
