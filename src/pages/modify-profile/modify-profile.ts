import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {NgxImageCompressService} from 'ngx-image-compress';


/**
 * Generated class for the ModifyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-profile',
  templateUrl: 'modify-profile.html',
})
export class ModifyProfilePage {
  infoUser = {
    "name1" : '',
    "name2" : '',
    "phone" : '',
    "mail" : '',
    "id" : ''
  };
  base64Image: string;
  analayse = true;
  imgResultAfterCompress: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private userService: UserProvider, public modalCtrl: ModalController,public loadingCtrl: LoadingController, private camera: Camera, private app: App,private imageCompress: NgxImageCompressService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyProfilePage');
    this.infoUser.name1 = localStorage.getItem('nameUser');
    this.infoUser.name2 = localStorage.getItem('name2User');
    this.infoUser.phone = localStorage.getItem('phoneUser');
    this.infoUser.mail = localStorage.getItem('mailUser');
    this.infoUser.id = localStorage.getItem('idUser');
    if (localStorage.getItem('photoUser') !== null ) {
      this.analayse = false;
      this.base64Image = localStorage.getItem('photoUser');
    } else {
      this.analayse = true;
      this.base64Image = "https://cdn.pixabay.com/photo/2017/02/26/00/12/human-2099157_960_720.png";
    }
  //  console.log(localStorage.getItem('userObject'));

  }

  /*async addPhoto() {
    const libraryImage = await this.OpenGallery();
    this.base64Image = 'data:image/jpeg;base64,' + libraryImage;
  }

  async OpenGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    return await this.camera.getPicture(options);
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    })
  }*/

  OpenGallery() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {

      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image, -1, 20, 20).then(
        result => {
          this.imgResultAfterCompress = result;
          this.base64Image = result;

          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          localStorage.setItem('photoUser',this.base64Image);
          console.log(this.base64Image);
          let data = {
            "photo" : this.base64Image
          }
          this.userService.setImage(data).subscribe(
            (response) => {

              console.log(" success : " + response);

              this.logoutAfterUpdate();
            },
            (err) => {
              console.log("erreur : " + JSON.stringify(err));



            }
          );

        }
      );

    });


  }

 /* OpenCamera() {
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG || this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;

      //this.logoutAfterUpdate();

    }, (err) => {
      console.log(err," eventuelle erreur !");

    })
  }*/

  goToAlertToUpdateFn() {

    let alert = this.alertCtrl.create({
      title: 'Modification',
      message: "Entrez votre nouveau prénom",
      inputs: [
        {
          name: "name1",
          placeholder: 'Votre prénom'
        },
      ],
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: 'Veuillez Patienter...'
            });
            loading.present();
              let updateData = {
                "first_name": data['name1'],
                "last_name" : this.infoUser.name2,
                "phone": this.infoUser.phone,
              };
              this.userService.updateUsers(updateData).subscribe(
                (success) => {
                  console.log("user updated");
                  loading.dismiss();
                  this.logoutAfterUpdate();
                },
                (error) => {
                  console.log(error);
                }
              )
          }
        }
      ]
    });
    alert.present();
  }

  goToAlertToUpdateLn() {

    let alert = this.alertCtrl.create({
      title: 'Modification',
      message: "Entrez votre nouveau nom",
      inputs: [
        {
          name: "name2",
          placeholder: 'Votre nom'
        },
      ],
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: 'Veuillez Patienter...'
            });
            loading.present();
              let updateData = {
                "first_name": this.infoUser.name1,
                "last_name" : data['name2'],
                "phone": this.infoUser.phone,
              };
              this.userService.updateUsers(updateData).subscribe(
                (success) => {
                  console.log("user updated");
                  loading.dismiss();
                  this.logoutAfterUpdate();
                },
                (error) => {
                  console.log(error);
                }
              )
            }
          }
      ]
    });
    alert.present();
  }

  goAlertToUpdatePh() {


    let alert = this.alertCtrl.create({
      title: 'Modification',
      message: "Entrez votre numéro de téléphone",
      inputs: [
        {
          name: "phone",
          placeholder: 'Votre numéro de téléphone (avec devant l\'indicatif)'
        },
      ],
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: 'Veuillez Patienter...'
            });
            loading.present();
            let updateData = {
              "first_name": this.infoUser.name1,
              "last_name" : this.infoUser.name2,
              "phone": data['phone'],
            };
            this.userService.updateUsers(updateData).subscribe(
              (success) => {
                console.log("user updated");
                loading.dismiss();
                this.logoutAfterUpdate();
                //console.log(success);
              },
              (error) => {
                loading.dismiss();

                console.log(error);
              }
            )
            }
          }
      ]
    });
    alert.present();
  }

  goToAlertToUpdatePs() {
    let alert = this.alertCtrl.create({
      title: 'Modification',
      message: "Entrez votre nouveau mot de passe",
      inputs: [
        {
          name: "password",
          placeholder: 'Entrez votre l\'ancien mot de passe'
        },
        {
          name: "password2",
          placeholder: 'Entrez votre nouveau mot de passe'
        },
      ],
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: 'Veuillez Patienter...'
            });
            loading.present();
            let updateData = {
              "new_password" : data['password2'],
              "current_password" : data['password']
            };
            this.userService.updatePasswordUsers(updateData).subscribe(
              (success) => {
                console.log("user updated");
                loading.dismiss();
                this.logoutAfterUpdate();
                //console.log(success);
              },
              (error) => {
                loading.dismiss();

                console.log(error);
              }
            )
            }
          }
      ]
    });
    alert.present();
  }

  goToAlertInfo() {
    let alert = this.alertCtrl.create({
      title: 'Information',
      subTitle: 'Pour des raisons sécuritaires, vous ne pouvez pas modifier votre e-mail',
      buttons: ['OK']
    });
    alert.present();

  }

  logoutAfterUpdate() {
    localStorage.clear();
    this.app.getRootNav().setRoot(HomePage);

  }


}
