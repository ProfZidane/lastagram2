import { UserProvider } from './../../providers/user/user';
import { MessageContentPage } from './../message-content/message-content';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from './../../app/environment';
import { SocketProvider } from './../../providers/socket/socket';
import { LoadingController } from 'ionic-angular';

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
  ALLMessages;
  constructor(public navCtrl: NavController, public navParams: NavParams, private socketService: SocketProvider, private userService: UserProvider,public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Veuillez Patienter...'
    });
    loading.present();

  this.username = localStorage.getItem('usernameChat');

  this.socketService.getAllMessages(this.username)
    .subscribe( (data) => {
      //console.log(data);
      data.forEach(element => {
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
            //console.log(data);
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
            loading.dismiss();
          }, (err) => {

            console.log(err);
            loading.dismiss();

          }
        )
      });
    }, (err) => {
      console.log(err);
      loading.dismiss();

    });

    loading.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageMenuPage');


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
