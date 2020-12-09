import { SocketProvider } from './../../providers/socket/socket';
import { FIREBASE_CONFIG, snapshotToArray, SOCKET_SERVER } from './../../app/environment';
import { AlertController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ActionSheetController } from 'ionic-angular';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications';
import {NgxImageCompressService} from 'ngx-image-compress';

import * as firebase from 'firebase';


/**
 * Generated class for the  page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({

  selector: 'page-message-content',
  templateUrl: 'message-content.html',

})

export class MessageContentPage  {
  public messages = [];
  currentUser = localStorage.getItem('idUser');
  externalUser;
  externalUser2;

  newMsg: string;
  username;
  other_username;

  items = [];
  proprio;
  Socket;
  photo;

  nameSender = localStorage.getItem("name2User") + " " + localStorage.getItem('nameUser');
  ref = firebase.database().ref('Notification/');
  //@ViewChild('ion-content') content2: any;
  @ViewChild('MessagesGrid') content:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, private socketService: SocketProvider, private localNotifications: LocalNotifications,private imageCompress: NgxImageCompressService) {
    this.username = localStorage.getItem('usernameChat');
    this.other_username =  this.navParams.get('username');
    //console.log(JSON.stringify(this.navParams.get('info')));
    //console.log(JSON.stringify(this.navParams.get('proprietaire')));
    this.proprio = this.navParams.get('proprietaire');

    if (this.navParams.get('photo') !== null) {

      this.photo = this.navParams.get('photo');

    } else {
      console.log("je n\'es pas de photo ! ");

    }

    if (this.navParams.get('info')) {
      this.externalUser = this.navParams.get('info');
      console.log(typeof(this.externalUser));

    } else {
      this.externalUser2 = this.navParams.get('name');
      console.log(this.externalUser2);

    }
    this.Socket = new WebSocket(SOCKET_SERVER + "ws/chat/" + this.username +"/"+ this.other_username+ "/");

    this.Socket.onopen = function() {

      console.log('socket connected ');

    }

    let m2 = this.messages;

    setInterval(() => {
      this.socketService.setMessages(this.Socket,this.messages);
    },1000);

    this.Socket.onmessage = function(m) {
      console.log(m);

    }


    this.Socket.onerror = (e) => {
      console.log(JSON.stringify(e));

    }


    setTimeout( () => {
      //      this.content.scrollToBottom(200);
            let itemList = document.getElementById('MessagesGrid');
            itemList.scrollTop = itemList.scrollHeight;
      //      console.log(itemList);

          }, 50);


    //console.log(localStorage.getItem('nameUser'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageContentPage');
    /*this.socket.connect();
    this.socket.emit('hello', 'zidane')*/

    // get message to API
    this.socketService.getMessages(this.username,this.other_username).subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        data.chat_messages.forEach(element => {
          this.messages.push(element);
        });

        console.log(this.messages);


      }, (err) => {
        console.log(JSON.stringify(err));
      }
    )

    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Loperation a reussi !',
      buttons: ['OK']
    });

    let alert2 = this.alertCtrl.create({
      title: 'ECHEC',
      subTitle: 'L\'opération n\'a pas abouti !',
      buttons: ['OK']
    });





   /* console.log("chat : " + JSON.stringify(this.externalUser));


      firebase.database().ref('/Messages/').on('child_added', (snapshot) => {
        let data = snapshot.val();
        console.log(JSON.stringify(data));
        this.items = data;

        console.log(typeof(data['idSender']));
        console.log(typeof(localStorage.getItem('idUser')));

        if (Number(data["idSender"]) === Number(localStorage.getItem('idUser'))) {
          this.message.push({
            "unique" : data['id'],
            "id" : data['idSender'],
            "idr": data['idReceiver'],
            "user" : localStorage.getItem('name2User'),
            "createdAt" : data["createdAt"],
            "mgs" : data["mgs"],
          });

        }




      });
*/


  }

  getMessages() {
    return this.messages;
  }

  public setMessages() {
    this.Socket.onmessage = function(m) {
      console.log(m);

      return m;

    }
  }

  socketOn() {
    let socket = new WebSocket(SOCKET_SERVER + "ws/chat/admin5522/zidane2332155/");
    let m2 = this.messages;
    socket.onopen = function() {
      console.log("socket connected !");
    }
    socket.onmessage = function(m) {
      console.log(m);
      m2.push(m);
    }
  }





  addItem(item) {
    if (item !== undefined && item !==null){
      let newItem = this.ref.push();
      newItem.set(item);

    }
    console.log('added to database ' + JSON.stringify(item));

  }

  /*send () {
      let data = {
        id : localStorage.getItem('idUser'),
        uId : localStorage.getItem('idUser') + "-T-" + new Date().getTime() + "@" + "lastagram" ,
        last_name : localStorage.getItem('name2User'),
        first_name : localStorage.getItem('nameUser'),
        email : localStorage.getItem('mailUser')
      };
      this.addItem(data);
  }

  send2 () {
    let data = {
      id: this.proprio.id,
      uId : this.proprio.id + "-T-" + new Date().getTime() + "@" + "lastagram" ,
      last_name : this.proprio.last_name,
      first_name : this.proprio.first_name,
      email : this.proprio.email
    };
    this.addItem(data);
}
*/
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Bibliothèque Photo',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Bibliothèque Vidéo',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

   // notification

   sheduleNotification(id,content,data) {

    this.localNotifications.schedule({
      id : id,
      title: "Message",
      text: content,
      data: { mydata: data },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true
    });

  }


  sendImage() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {

      //this.base64Image3 = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image, -1, 50, 60).then(
        result => {
        //  this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          //console.log(this.imgResultAfterCompress);

          //localStorage.setItem('couvertImage3', this.imgResultAfterCompress);

          let mgs = {
            "message" : result
          }

          this.Socket.send(JSON.stringify({ message : result }));
        }
      );

    });
  }

  sendVideo() {}

  sendMessage() {


    /*let mgs = {
      id : "-T-" + new Date().getTime() + "@" + "lastagram" ,
      idSender : localStorage.getItem('idUser'),
      idReceiver : this.proprio.id,
      nameSender : localStorage.getItem('name2User') + ' ' + localStorage.getItem('nameUser'),
      nameReceiver : this.externalUser.last_name + ' ' + this.externalUser.first_name,
      mgs : this.newMsg,
      createdAt : new Date().toLocaleDateString(),
    }*/

    let mgs = {
      "message" : this.newMsg
    }



    //this.Socket.send(mgs)

    //this.addItem(mgs);

    this.Socket.send(JSON.stringify({ message : this.newMsg }));


    /*if (this.navParams.get('info')) {
      this.externalUser = this.navParams.get('info');

      let text = this.externalUser.first_name + " " + this.externalUser.last_name + ": " + this.newMsg;
      let name = this.externalUser.first_name + " " + this.externalUser.last_name;
      let notif = {
        "id": Number(localStorage.getItem('idUser')),
        "text" : text,
        "title": "Message",
        "receiver" : this.other_username,
        "photo" : this.photo,
        //"sender": localStorage.getItem('usernameChat'),
        "name" : name
      }


      this.addItem(notif);

    } else {
      this.externalUser2 = this.navParams.get('name');
      console.log(this.externalUser2);
      let text = this.externalUser2 + ": " + this.newMsg;

      let notif = {
        "text" : text,
        "title": "Message",
        "receiver" : this.other_username,
        "photo" : this.photo,
        //"sender": localStorage.getItem('usernameChat'),
        "name" : this.externalUser2
      }



      this.addItem(notif);
    }*/



    console.log("message to : " + mgs);



    this.newMsg = '';
    setTimeout( () => {
//      this.content.scrollToBottom(200);
      let itemList = document.getElementById('MessagesGrid');
      itemList.scrollTop = itemList.scrollHeight;
//      console.log(itemList);

    }, 50);
  }




  goBack() {
    this.navCtrl.pop();
  }

}
