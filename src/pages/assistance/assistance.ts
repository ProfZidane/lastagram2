import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AssistancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assistance',
  templateUrl: 'assistance.html',
})
export class AssistancePage {
Messages = {
  author: "",
  object: "",
  message: "",
  date: ""
}
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssistancePage');
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'SUCCES',
      subTitle: 'Votre message à été envoyé, nous vous contacterons au plus vite !',
      buttons: ['OK']
    });
    alert.present();
  }


  send() {
    this.Messages.author = localStorage.getItem("name2User") + " " + localStorage.getItem('nameUser');
    this.Messages.date = new Date().toLocaleDateString();
    console.log(
      JSON.stringify(this.Messages)
    );

  }

}


