import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the RegisterCodeVerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-code-verification',
  templateUrl: 'register-code-verification.html',
})
export class RegisterCodeVerificationPage {
  code;
  warn_text;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, private userService: UserProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterCodeVerificationPage');
  }

  verifyCount() {
    if (this.code.length === 6) {
      this.warn_text = "Vous avez atteint les 6 chiffres";
    } else {
      this.warn_text = "";
    }
  }

  validation() {
    if (this.code.length === 6) {
      let data = {
        "validation_code" : this.code
      };
      let loading = this.loadingCtrl.create({
        content: 'Veuillez Patienter...'
      });
      loading.present();
      this.userService.confirmation(data).subscribe(
        (success) => {
          let words =  {
            "0" : "Veuillez maintenant vous authentifiez !"
          };
          localStorage.setItem('new','true');
          loading.dismiss();
          this.navCtrl.push(HomePage, words);
        }, (err) => {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'ECHEC',
            subTitle: 'Le code de validation présente une erreur. Vérifiez encore !',
            buttons: ['OK']
          });
          alert.present();
        }
      )
    }
  }
}
