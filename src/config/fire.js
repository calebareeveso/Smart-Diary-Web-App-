import firebase from 'firebase';

var firebaseConfig = {
    apiKey: `${process.env.REACT_APP_APIKEY}`,
    authDomain:  `${process.env.REACT_APP_AUTHDOMAIN}`,
    databaseURL:`${process.env.REACT_APP_DATABASEURL}`,
    projectId:`${process.env.REACT_APP_PROJECTID}`,
    storageBucket:`${process.env.REACT_APP_STORAGEBUCKET}`,
    messagingSenderId:`${process.env.REACT_APP_MESSAGINGSENDERID}`,
    appId:`${process.env.REACT_APP_APPID}`,
    measurementId:`${process.env.REACT_APP_MEASUREMENTID}`
    // apiKey: "AIzaSyBQFqB2EN0JL3F2I05st7RJsKu5Bcnmyhw",
    // authDomain: "smart-diary-84410.firebaseapp.com",
    // databaseURL: "https://smart-diary-84410.firebaseio.com",
    // projectId: "smart-diary-84410",
    // storageBucket: "smart-diary-84410.appspot.com",
    // messagingSenderId: "321729092767",
    // appId: "1:321729092767:web:85ff8d205a629a7080d6aa",
    // measurementId: "G-QXZZNT5YPD"
  };
  // Initialize Firebase
 const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
export default fire;
