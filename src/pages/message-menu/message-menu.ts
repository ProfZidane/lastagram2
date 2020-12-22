import { UserProvider } from './../../providers/user/user';
import { MessageContentPage } from './../message-content/message-content';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
import { SocketProvider } from './../../providers/socket/socket';
import { LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the MessageMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-menu',
  templateUrl: 'message-menu.html',
})
export class MessageMenuPage {
  username;
  id;
  items;
  users;
  Messages = [];
  ALLMessages = [];
  constructor(public http: HttpClient,private app: App, private translate: TranslateService,public navCtrl: NavController, public navParams: NavParams, private socketService: SocketProvider, private userService: UserProvider,public loadingCtrl: LoadingController) {


    this.username = localStorage.getItem('usernameChat');
    console.log("sss : " + this.username);



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageMenuPage');
    let loading = this.loadingCtrl.create({
      content: this.translate.instant('LOAD.mgs')
    });
    loading.present();

    this.socketService.getAllOfMessages(this.username)
    .subscribe( (success) => {
      //console.log("first data : " + JSON.stringify(data));
      success.forEach(element => {
        //console.log(element);
        let username = "";
        let other_username = "";
        if (element.receiver === localStorage.getItem('usernameChat')) {
          username = element.sender;
          other_username = element.receiver;
        } else {
          username = element.receiver;
          other_username = element.sender;
        }
        this.userService.getImageUser(username).subscribe(
          (data) => {
            console.log("second daata : " + JSON.stringify(data));
            let elt = {
              name: data.last_name + " " + data.first_name,
              username: username,
              other_username : other_username,
              photo: data.photo,
              last_message: element.message,
              date : data.timestamp
            }
            this.Messages.push(elt);
            this.ALLMessages.push(elt);
            console.log(this.Messages);
           // loading.dismiss();
          }, (err) => {

            //console.log("image : " + JSON.stringify(err));
            let elt = {
              name: err.error.last_name + " " + err.error.first_name,
              username: username,
              other_username : other_username,
              photo: "https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_960_720.png",
              last_message: element.message,
              date : err.error.timestamp
            }
            console.log(typeof(elt));

            console.log(JSON.stringify(elt))
            this.Messages.push(elt);
            this.ALLMessages.push(elt);
            console.log(this.Messages);
          //  loading.dismiss();

          }
        )
      });
      loading.dismiss();
    }, (err) => {
      console.log("not found : " + JSON.stringify(err));
      loading.dismiss();

    });

    //console.log(JSON.stringify(this.ALLMessages));



   /*this.http.get('https://lastagram-chat.herokuapp.com/chat/zidane2261619ajliwjjt/').subscribe(
      (data) => {
        console.log("ee : " + JSON.stringify(data));

      }, (err) => {
        console.log("rrr : " + JSON.stringify(err));

      }
    )*/



  }

  reload() {
    this.Messages = [];
    this.ALLMessages = [];
    this.socketService.getAllOfMessages(this.username)
    .subscribe( (success) => {
      //console.log("first data : " + JSON.stringify(data));
      success.forEach(element => {
        //console.log(element);
        let username = "";
        let other_username = "";
        if (element.receiver === localStorage.getItem('usernameChat')) {
          username = element.sender;
          other_username = element.receiver;
        } else {
          username = element.receiver;
          other_username = element.sender;
        }
        this.userService.getImageUser(username).subscribe(
          (data) => {
            console.log("second daata : " + JSON.stringify(data));
            let elt = {
              name: data.last_name + " " + data.first_name,
              username: username,
              other_username : other_username,
              photo: data.photo,
              last_message: element.message,
              date : data.timestamp
            }
            this.Messages.push(elt);
            this.ALLMessages.push(elt);
            console.log(this.Messages);
           // loading.dismiss();
          }, (err) => {

            //console.log("image : " + JSON.stringify(err));
            let elt = {
              name: err.error.last_name + " " + err.error.first_name,
              username: username,
              other_username : other_username,
              photo: "https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_960_720.png",
              last_message: element.message,
              date : err.error.timestamp
            }
            console.log(typeof(elt));

            console.log(JSON.stringify(elt))
            this.Messages.push(elt);
            this.ALLMessages.push(elt);
            console.log(this.Messages);
          //  loading.dismiss();

          }
        )
      });
    }, (err) => {
      console.log("not found : " + JSON.stringify(err));

    });
  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.reload();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToMessageContent(name,username,other_username,image) {
    console.log(username +  " + " + other_username);
    console.log(image);

    this.navCtrl.push(MessageContentPage, { name:  name, username: username, proprietaire: other_username, photo: image });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    /*if (val && val.trim() != '') {
      this.Products = this.Products.filter((item) => {
        //return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return item.name.toLowerCase().includes(val.toLowerCase());
      })
    }*/
    if (val && val.trim() != '') {
      this.Messages = this.researchService(val);
    } else {
      this.Messages = this.ALLMessages;
    }
  }

  researchService(val) {
    return this.Messages.filter( (item) => {
      return item.name.toLowerCase().includes(val.toLowerCase());
    });
  }
}
