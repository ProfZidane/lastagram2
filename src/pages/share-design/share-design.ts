import { ProductToSharePage } from './../product-to-share/product-to-share';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import { DEEP_LINK_DOMAIN } from '../../app/environment';
import { AlertController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

/**
 * Generated class for the ShareDesignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share-design',
  templateUrl: 'share-design.html',
})
export class ShareDesignPage {
id;
link;
  constructor(private alertCtrl: AlertController, private clipboard: Clipboard, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ,private socialSharing: SocialSharing,public toastCtrl: ToastController ) {
    this.id = this.navParams.get('id');
    this.link = DEEP_LINK_DOMAIN + "market/"+this.navParams.get('id')+"/"+false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareDesignPage');
  }

  closePopover() {
    this.viewCtrl.dismiss()
  }

  shareWhatsapp() {
    let message = "Visitez ma boutique ";
    let image = "" // image de couverture

    this.socialSharing.canShareVia("whatsapp","Test catana",null,null,null).then((res) => {
        console.log(res);
        this.socialSharing.shareViaWhatsApp(message,null,this.link).then(() => {
          console.log("sharing ::::");
          this.viewCtrl.dismiss();

        }) .catch(e => {
          console.log(e);

        })

    }) .catch((e)=> {
      console.log("erreur " + e);
      let alert = this.alertCtrl.create({
        title: 'ATTENTION',
        subTitle: 'Installer l\'application avant tout !',
        buttons: ['OK']
      });
      alert.present();

    });

  }

  shareFacebook() {
    let message = "Visitez ma boutique ";
    let image = "" // image de couverture

    this.socialSharing.canShareVia("com.facebook.katana","Test catana",null,null,null).then((res) => {
        console.log(res);
        this.socialSharing.shareViaFacebook(message,null,this.link).then(() => {
          console.log("sharing ::::");
          this.viewCtrl.dismiss();

        }) .catch(e => {
          console.log(e);

        })

    }) .catch((e)=> {
      console.log("erreur " + e);
      let alert = this.alertCtrl.create({
        title: 'ATTENTION',
        subTitle: 'Installer l\'application avant tout !',
        buttons: ['OK']
      });
      alert.present();

    });

  }


  shareInstagram() {
    let message = "Visitez ma boutique " + this.link; // lien directe dans le message
    let image = "" // image de couverture

    this.socialSharing.canShareVia("instagram","Test catana",null,null,null).then((res) => {
        console.log(res);
        this.socialSharing.shareViaInstagram(message,image).then(() => {
          console.log("sharing ::::");
          this.viewCtrl.dismiss();

        }) .catch(e => {
          console.log(e);

        })

    }) .catch((e)=> {
      console.log("erreur " + e);
      let alert = this.alertCtrl.create({
        title: 'ATTENTION',
        subTitle: 'Installer l\'application avant tout !',
        buttons: ['OK']
      });
      alert.present();

    });
  }

  CopyLink() {
            this.clipboard.copy(this.link).then(
              () => {
                  const toast = this.toastCtrl.create({
                    message: 'Lien copié !',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
                  this.viewCtrl.dismiss();
              }
            );
  }

  goToProductShare() {
    this.viewCtrl.dismiss();

    this.navCtrl.push(ProductToSharePage, { id : this.id });
  }


}
