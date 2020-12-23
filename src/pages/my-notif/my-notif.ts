import { DetailNotifPage } from './../detail-notif/detail-notif';
import { NotificationProvider } from './../../providers/notification/notification';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SearchProvider } from './../../providers/search/search';
import { TranslateService } from '@ngx-translate/core';

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
next;

  constructor(private platform: Platform,public navCtrl: NavController, private app: App, private translate: TranslateService,public navParams: NavParams, private notificationService: NotificationProvider,public loadingCtrl: LoadingController, private searchService: SearchProvider) {

    /*document.addEventListener('backbutton', () => {
      if (this.navCtrl.getActive().component.name === "MyNotifPage") {
        console.log("click to back button MyNotifPage !");

        this.app.getRootNav().getActiveChildNav().select(0);

      } else {
        console.log("c pas sa");

      }

    })*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNotifPage');
    let loading = this.loadingCtrl.create({
      content: this.translate.instant('LOAD.mgs')
    });
    loading.present();
    this.notificationService.getNewNotification().subscribe(
      (data) => {
        //console.log(data);
        //console.log(JSON.stringify(data));
        //console.log(localStorage.getItem('idUser'));
        this.next = data.next;
        data.results.forEach(element => {
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

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    console.log(this.next);

    setTimeout(() => {
      if (this.next !== null) {
        this.searchService.searchInfinite(this.next).subscribe(
          (data) => {
            let data_next = data.results;
            console.log(data);
            console.log(data);

            data_next.forEach(element => {
              if (element !== null) {
                  if ( element.is_seen.includes(Number(localStorage.getItem('idUser'))) === true ) {
                    //console.log('dd');

                    if (element.receiver.includes(Number(localStorage.getItem('idUser'))) === true) {

                      let etl = JSON.parse(element.content);


                      let obj = {
                        "id_order" : etl[1],
                        "id_notif" : element.id,
                        "type": element.notifications_type,
                        "mgs" : etl[0],
                        "date": element.date
                      }
                      this.Notification.push(obj);

                    }

                }
              }
            });

            this.next = data.next;

          }
        )
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
