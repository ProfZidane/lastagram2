import { WelcomePage } from './../welcome/welcome';
import { TabsPage } from './../tabs/tabs';
import { UserProvider } from './../../providers/user/user';
import { PasswordForgetPage } from './../password-forget/password-forget';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from './../register/register';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  LoginUser = {
    "email" : '',
    "password" : ''
  };

  text;
  err;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider,public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    this.text = this.navParams.get('0');
    console.log(this.text);

  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  goToPasswordForget() {
    this.navCtrl.push(PasswordForgetPage);
  }



  LoginUsers() {
    // loading ..
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();

    console.log(this.LoginUser);
    console.log(this.LoginUser.email);
    console.log(this.LoginUser.password);

     this.userService.loginUser(this.LoginUser).subscribe(
       success => {
         console.log("user loged ! ", success);
         loading.dismiss();
         localStorage.setItem('userToken',success.access);
         if (localStorage.getItem('new') !== null) {
            if (localStorage.getItem('new') === 'true') {
                this.navCtrl.push(WelcomePage);
            } else if (localStorage.getItem('new') === 'false') {
                this.navCtrl.push(TabsPage);
            }
         } else {
            
            this.navCtrl.push(TabsPage);

         }
         
       },
       error => {
        console.log('error : clé : ');
        console.log(error.status);

        //console.log(Object.keys(error));
        //let t = Object.keys(error);

        loading.dismiss();
        this.err = "Nous n'avons pas d'utilisateurs avec ces accès !";
        //this.LoginUser.email = "";
        //this.LoginUser.password = "";
       }

     );
  }

  WithinAuth() {
      this.navCtrl.push(TabsPage);
  }
}
