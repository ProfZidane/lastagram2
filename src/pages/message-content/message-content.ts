import { Socket } from 'ng-socket-io';
import * as firebase from 'firebase';
import { snapshotToArray, SERVER_SOCKET_APP } from './../../app/environment';
import { AlertController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

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
  messages = [
    {
      user : 'mohamed',
      createdAt: '02/12/2000, 15:00',
      mgs: 'coucou comment tu vas ?'
    },
    {
      user : 'mohamed',
      createdAt: '02/12/2000, 15:00',
      mgs: 'coucou comment tu vas ?'
    },
    {
      user : 'zidane',
      createdAt: '02/12/2000, 15:00',
      mgs: 'coucou comment tu vas ?'
    },
  ];
  currentUser = localStorage.getItem('idUser');
  externalUser = this.navParams.get('info');
  newMsg: string;
  username;
  ref = firebase.database().ref('User/');
  ref2 = firebase.database().ref('Messages/');
  message = [];
  items = [];
  proprio;
  Socket;
  @ViewChild('MessagesGrid') content:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController, private socket: Socket, private alertCtrl: AlertController) {
    this.username = this.navParams.get('username');
    //console.log(JSON.stringify(this.navParams.get('info')));
    //console.log(JSON.stringify(this.navParams.get('proprietaire')));
    this.proprio = this.navParams.get('proprietaire');





    //console.log(localStorage.getItem('nameUser'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageContentPage');
    /*this.socket.connect();
    this.socket.emit('hello', 'zidane')*/
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

    this.Socket = new WebSocket(SERVER_SOCKET_APP + "ws/chat/admin5522/zidane2332155/");

    this.Socket.onopen = function() {
      console.log('socket connected ');
      /*socket.send('message');*/
      alert.present();

    }


    this.Socket.onerror = (e) => {
      console.log(e);
      alert2.present();
    }




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


  addItem(item) {
    if (item !== undefined && item !==null){
      let newItem = this.ref2.push();
      newItem.set(item);

    }
    console.log('added to database ' + JSON.stringify(item));

  }

  send () {
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

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
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


  sendMessage() {


    let mgs = {
      id : "-T-" + new Date().getTime() + "@" + "lastagram" ,
      idSender : localStorage.getItem('idUser'),
      idReceiver : this.proprio.id,
      nameSender : localStorage.getItem('name2User') + ' ' + localStorage.getItem('nameUser'),
      nameReceiver : this.externalUser.last_name + ' ' + this.externalUser.first_name,
      mgs : this.newMsg,
      createdAt : new Date().toLocaleDateString(),
    }

    //this.addItem(mgs);

    this.Socket.send(JSON.stringify({ message : this.newMsg }));

    console.log("message to : " + mgs);



    this.newMsg = '';
    setTimeout( () => {
//      this.content.scrollToBottom(200);
      let itemList = document.getElementById('MessagesGrid');
      itemList.scrollTop = itemList.scrollHeight;
//      console.log(itemList);

    }, 10);
  }




  goBack() {
    this.navCtrl.pop();
  }

}
