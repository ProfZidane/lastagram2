import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

const LNG_KEY = "SELECTED_LANGUAGE";
/*
  Generated class for the LanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LanguageProvider {

  selected = '';

  constructor(public http: HttpClient, private storage: Storage, private translate: TranslateService) {
    console.log('Hello LanguageProvider Provider');
  }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
}

getLanguages() {
  return [
    { text : 'English', value : 'en', flag : 'https://img.icons8.com/color/48/000000/usa.png' },
    { text : 'Français', value : 'fr', flag : 'https://img.icons8.com/color/48/000000/france.png' },
  ];
}

setLanguage(lng) {
  this.translate.use(lng);
  this.selected = lng;
  localStorage.setItem('language',lng);

  this.storage.set(LNG_KEY, lng);
}

}
