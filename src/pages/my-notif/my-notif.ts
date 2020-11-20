import { DetailNotifPage } from './../detail-notif/detail-notif';
import { NotificationProvider } from './../../providers/notification/notification';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the MyNotifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-notif',
  templateUrl: 'my-notif.html',
})
export class MyNotifPage {
Notification = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private notificationService: NotificationProvider,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNotifPage');
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();
    this.notificationService.getNewNotification().subscribe(
      (data) => {
        //console.log(data);
        //console.log(JSON.stringify(data));
        //console.log(localStorage.getItem('idUser'));

        data.forEach(element => {
          //console.log( JSON.stringify(element.receiver.includes(Number(localStorage.getItem('idUser'))) && element.receiver.includes(Number(localStorage.getItem('idUSer')))) );

          if ( element.is_seen.includes(Number(localStorage.getItem('idUser'))) === true ) {
              //console.log('dd');

              if (element.receiver.includes(Number(localStorage.getItem('idUser'))) === true) {
               // console.log("trueee");
                //element.content = JSON.parse(element.content)
                let etl = JSON.parse(element.content);
                //console.log(etl);
                //console.log(etl[0]);

                //console.log(JSON.parse(etl));


                let obj = {
                  "id_order" : etl[1],
                  "id_notif" : element.id,
                  "type": element.notifications_type,
                  "mgs" : etl[0],
                  "date": element.date
                }
                this.Notification.push(obj);

              }



            /*if (element.receiver.includes(Number(localStorage.getItem('idUSer'))) === true ) {
              console.log('d0d');

              this.Notification.push(element);
              console.log('ff');

            }*/

          }
        });
        //.log(JSON.stringify(this.Notification));

      }, (err) => {
        console.log(err);

      }
    )
    loading.dismiss();

  }


  goToDetail(id_notif,id_order) {
    console.log(id_notif);
    console.log(id_order);
    this.navCtrl.push(DetailNotifPage, { "id_notif" : id_notif, "id_order" : id_order });

  }
}
