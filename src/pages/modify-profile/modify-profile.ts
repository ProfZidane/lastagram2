import { ProfilePage } from './../profile/profile';
import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {NgxImageCompressService} from 'ngx-image-compress';
import { TranslateService } from '@ngx-translate/core';

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
  constructor(public navCtrl: NavController,private translate: TranslateService, public navParams: NavParams, private alertCtrl: AlertController, private userService: UserProvider, public modalCtrl: ModalController,public loadingCtrl: LoadingController, private camera: Camera, private app: App,private imageCompress: NgxImageCompressService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyProfilePage');
    this.infoUser.name1 = localStorage.getItem('nameUser');
    this.infoUser.name2 = localStorage.getItem('name2User');
    this.infoUser.phone = localStorage.getItem('phoneUser');
    this.infoUser.mail = localStorage.getItem('mailUser');
    this.infoUser.id = localStorage.getItem('idUser');
    if (localStorage.getItem('photoUser') !== "null" ) {
      this.analayse = false;
      this.base64Image = localStorage.getItem('photoUser');
      console.log(typeof(this.base64Image));

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

      this.imageCompress.compressFile(image, -1, 50, 60).then(
        result => {
          this.imgResultAfterCompress = result;
          this.base64Image = result;
          let loading = this.loadingCtrl.create({
            content: this.translate.instant('LOAD.mgs')
          });
          loading.present();

          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          console.log(this.base64Image);
          let data = {
            "photo" : this.base64Image
          }
          this.userService.setImage(data,Number(localStorage.getItem('idUser'))).subscribe(
            (response) => {

              console.log(" success : " + response);
              localStorage.setItem('photoUser',this.base64Image);
              loading.dismiss();
              //this.logoutAfterUpdate();
              //this.navCtrl.setRoot(this.navCtrl.getActive().component);
              this.navCtrl.push(ProfilePage);
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
      title: this.translate.instant('SHOP.MODIFICATION.title'),      
      inputs: [
        {
          name: "name1",
          placeholder: this.translate.instant('OTHERS.fn')
        },
      ],
      buttons: [
        {
          text: this.translate.instant('SHARING.option2'),
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('OTHERS.valid'),
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: this.translate.instant('LOAD.mgs')
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
                  localStorage.setItem('nameUser', data['name1']);
                  loading.dismiss();
                  //this.logoutAfterUpdate();
                  this.navCtrl.push(ProfilePage);

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
      title: this.translate.instant('SHOP.MODIFICATION.title'),
      message: "Entrez votre nouveau nom",
      inputs: [
        {
          name: "name2",
          placeholder: 'Votre nom'
        },
      ],
      buttons: [
        {
          text: this.translate.instant('SHARING.option2'),
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('OTHERS.valid'),
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: this.translate.instant('LOAD.mgs')
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
                  localStorage.setItem('name2User', data['name2']);
                  loading.dismiss();
                  //this.logoutAfterUpdate();
                  this.navCtrl.push(ProfilePage);

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
      title: this.translate.instant('SHOP.MODIFICATION.title'),
      message: this.translate.instant('OTHERS.phone'),
      inputs: [
        {
          name: "phone",
          placeholder: this.translate.instant('OTHERS.phone_pl')
        },
      ],
      buttons: [
        {
          text: this.translate.instant('SHARING.option2'),
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('OTHERS.valid'),
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: this.translate.instant('LOAD.mgs')
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
                localStorage.setItem('phoneUser', data['phone']);
                //this.logoutAfterUpdate();
                this.navCtrl.push(ProfilePage);

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
      title: this.translate.instant('SHOP.MODIFICATION.title'),
      message: this.translate.instant('OTHERS.password'),
      inputs: [
        {
          name: "password",
          placeholder: this.translate.instant('OTHERS.old_ps')
        },
        {
          name: "password2",
          placeholder: this.translate.instant('OTHERS.new_pl')
        },
      ],
      buttons: [
        {
          text: this.translate.instant('SHARING.option2'),
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('OTHERS.valid'),
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: this.translate.instant('LOAD.mgs')
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
                //this.logoutAfterUpdate();
                this.navCtrl.push(ProfilePage);

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
      title: this.translate.instant('ALERT.info_title'),
      subTitle: this.translate.instant('ALERT.info_subtitle'),
      buttons: ['OK']
    });
    alert.present();

  }

  logoutAfterUpdate() {
    localStorage.clear();
    this.app.getRootNav().setRoot(HomePage);

  }


}
