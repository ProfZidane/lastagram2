import { UserProvider } from './../../providers/user/user';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssistancePage');
  }

  showAlert() {

    if (this.Messages.object !== "" && this.Messages.message !== "") {
        this.Messages.author = localStorage.getItem('name2User') + ' ' + localStorage.getItem('nameUser');
      this.Messages.date = new Date().toLocaleString();


      let email = {
        email: localStorage.getItem('mailUser'),
        objet : this.Messages.object,
        message : this.Messages.message
      }

      console.log(
        JSON.stringify(email)
      );

      this.userService.sendMail(email).subscribe(
        (success) => {
          console.log(success);

        const alert = this.alertCtrl.create({
          title: 'SUCCES',
          subTitle: 'Votre message à été envoyé, nous vous contacterons au plus vite !',
          buttons: ['OK']
        });
        alert.present();

        this.Messages = {
          author: "",
    object: "",
    message: "",
    date: ""
        }

        }, (error)=> {
          console.log(JSON.stringify(error));
          const alert = this.alertCtrl.create({
            title: 'ECHEC',
            subTitle: 'Un problème est survenu',
            buttons: ['OK']
          });
          alert.present();

          this.Messages = {
            author: "",
      object: "",
      message: "",
      date: ""
          }
        }
      )
    } else {

      const alert = this.alertCtrl.create({
        title: 'ATTENTION',
        subTitle: 'Veuillez remplir les champs s\'il vous plait !',
        buttons: ['OK']
      });
      alert.present();

    }

  }


  send() {
    this.Messages.author = localStorage.getItem("name2User") + " " + localStorage.getItem('nameUser');
    this.Messages.date = new Date().toLocaleDateString();
    console.log(
      JSON.stringify(this.Messages)
    );

  }

}


