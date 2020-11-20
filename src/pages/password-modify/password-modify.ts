import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PasswordValidationPage } from '../password-validation/password-validation';

/**
 * Generated class for the PasswordModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-modify',
  templateUrl: 'password-modify.html',
})
export class PasswordModifyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordModifyPage');
  }

  goToPasswordValidation() {
    this.navCtrl.push(PasswordValidationPage);
  }

}
