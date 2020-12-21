import { RegisterCodeVerificationPage } from './../register-code-verification/register-code-verification';
import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
//import { WelcomePage } from './../welcome/welcome';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { timestamp } from 'rxjs/operators';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  register = {
    "name" : '',
    "firstname" : '',
    "email" : '',
    "indicator" : '',
    "number" : '',
    "password" : '',
    "repeat_password" : '',
  };
  my_country;
  conformite = 'Les deux mots de passe ne sont pas conforme !';
  good = '';
  err;
  base64Image:string;
  selectOptions;
  Countries;
  url = "https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;flag;callingCodes;";
  //"https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;flag;";
  constructor(public navCtrl: NavController,public http: HttpClient, public navParams: NavParams, private userService: UserProvider,private camera: Camera,public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.selectOptions = {
      title : "PAYS",
      subTitle : "Choisissez votre pays",
      mode: 'md'
    }

    this.http.get(this.url).subscribe(
      (data) => {
        this.Countries = data;        
        
      }, (err) => {
        console.log(err);
        
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.register = {
      "name" : '',
    "firstname" : '',
    "email" : '',
    "indicator" : '',
    "number" : '',
    "password" : '',
    "repeat_password" : '',
    };
  }

  loadFlags() {
    setTimeout(()=>{ 
      let countries = this.Countries;
      // console.log("get countries", countries);
     let radios=document.getElementsByClassName('alert-radio-label');
     for (let index = 0; index < radios.length; index++) {
        let element = radios[index];
        // console.log("element", element);

        // console.log("index", countries[index-1].flag);
        element.innerHTML=element.innerHTML.concat('<img class="country-image" style="width: 30px;height:16px;" src="'+countries[index].flag+'" />');
      }
  }, 50);
  }


  checkPassword() {
    if (this.register.password == this.register.repeat_password) {
        this.conformite = "";
        this.good = "Les deux sont correctes !";
    } else if (this.register.password != this.register.repeat_password) {
      this.good = "";
      this.conformite = "Les deux mots de passe ne sont pas conforme !";
    }
  }

  OpenGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err, "vos erreurs");
    })
  }

  OpenCamera() {
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err," eventuelle erreur !");

    })
  }

  /*addItem(item) {
    if (item !== undefined && item !==null){
      let newItem = this.ref.push();
      newItem.set(item);

    }
    console.log('added to database ' + JSON.stringify(item));

  }*/


  registerUSer() {

    // loading ..
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    console.log(this.register);
    if (this.register.name == "" && this.register.firstname == "" && this.register.email == "" &&
        this.register.password == "" && this.register.repeat_password == "") {

          this.err = "Veuillez remplir tous les champs !";
          loading.dismiss();
          this.register = {
            "name" : '',
          "firstname" : '',
          "email" : '',
          "indicator" : '',
          "number" : '',
          "password" : '',
          "repeat_password" : '',
          };
    } else {

      let country = {
        "country_name" : this.my_country.name,
        "country_short_name" : this.my_country.alpha3Code
      }

      let data = {
        "last_name" : this.register.name,
        "first_name" : this.register.firstname,
        "email" : this.register.email,
        "country" : this.my_country.alpha3Code,
        "phone" : "+" + this.my_country.callingCodes[0] + this.register.number,
        "password" : this.register.password,
        "re_password" : this.register.password
        
      }

      console.log(JSON.stringify(data));

      this.userService.registerUser(data).subscribe(
        response => {
          console.log("user created !", response);
          loading.dismiss();
          localStorage.setItem('UserObject', response);
//          this.addItem(response);
          let words =  {
            "0" : "Veuillez maintenant vous authentifiez !"
          };
          let alert = this.alertCtrl.create({
            title: 'SUCCES',
            subTitle: 'Vous avez réussi votre inscription',
            message: 'Nous vous avons envoyer un mail de confirmation avec un code. Prenez connaissance du code puis entrez-le dans l\'application pour confirmer !',
            buttons: [{
              text: 'OK',
              handler: () => {
          //      localStorage.setItem('new','true');
                this.navCtrl.push(RegisterCodeVerificationPage, { "password" : JSON.stringify(data) } );
                //this.navCtrl.push(HomePage, words);
              }
            }]
          });
          alert.present();
        },
        error => {
          console.log('error ', JSON.stringify(error));
          loading.dismiss();
          if (error.error.password) {
            this.err = error.error.password;
          } else if (error.error.last_name) {
            this.err = error.error.last_name;
          } else if (error.error.first_name) {
            this.err = error.error.first_name;
          } else if (error.error.email) {
            this.err = error.error.email;
          } else if (error.error.phone) {
            this.err = error.error.phone;
          } else if(error.status == 0 && error.statusText == "Unknown Error") {
            console.log('ffg');
          let alert = this.alertCtrl.create({
            title: 'ATTENTION',
            subTitle: 'Veuillez verifiez votre connexion internet',
            buttons: ['OK']
          });
          alert.present();

          }
         // console.log(error.error);

          //this.err = error;
        }
      );

      this.register = {
        "name" : '',
      "firstname" : '',
      "email" : '',
      "indicator" : '',
      "number" : '',
      "password" : '',
      "repeat_password" : '',
      };
      this.conformite = "";
      this.good = "Les deux mots de passe ne sont pas conforme !";

    }


  }
}
