import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { PasswordModifyPage } from './../password-modify/password-modify';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PasswordForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-forget',
  templateUrl: 'password-forget.html',
})
export class PasswordForgetPage {
  email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordForgetPage');
  }
  goToPassordModify() {
    console.log(this.email);
    let data = {
        "email" : this.email
    };
    this.userService.sendMailToResetPassword(data).subscribe(
      (success) => {
        console.log("attente de mail ! ");
        let alert = this.alertCtrl.create({
          title: 'ATTENTION',
          subTitle: 'Un mail vous a été envoyer. \nVeuillez le consulter et cliquer sur le lien de confirmation !',
          buttons: [
            {
              text: "OK",
              handler: () => {
                console.log("end on email");
                let words =  {
                  "0" : "Veuillez maintenant vous authentifiez !"
                };
                this.navCtrl.push(HomePage, words);


              }
            }
          ]
        });
        alert.present();

      }, (error) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'ECHEC',
          subTitle: 'L\'opération n\'a pas abouti !',
          buttons: ['OK']
        });
        alert.present();
      }
    )
  //    this.navCtrl.push(PasswordModifyPage);
  }

}
