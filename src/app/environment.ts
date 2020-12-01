export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDmp1zpllHRG2Kd6cbryw-MAKaMy5Z9jLM",
  authDomain: "lastagram-b4743.firebaseapp.com",
  databaseURL: "https://lastagram-b4743.firebaseio.com",
  projectId: "lastagram-b4743",
  storageBucket: "lastagram-b4743.appspot.com",
  messagingSenderId: "834178532426",
  appId: "1:834178532426:web:cbbb1a34f417457efcd2b3",
  measurementId: "G-NQV8GVBRBY"
};

//export const DOMAIN_APP = "http://192.168.1.41:8000/";

//export const SERVER_SOCKET_APP = "ws://192.168.1.41:9000/";

export const SERVER_SOCKET_APP = "https://lastagram-chat.herokuapp.com/";

export const SOCKET_SERVER = "ws://lastagram-chat.herokuapp.com/";
export const DOMAIN_APP = "https://lastagram.herokuapp.com/";

export const snapshotToArray = snapshot =>{
  let returnArray = [];
  snapshot.forEach(element => {
    let item = element.val();
    item.key = element.key;
    returnArray.push(item);
  });
  return returnArray;
};


export let Messages = [];
