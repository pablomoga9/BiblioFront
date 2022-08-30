const firebaseConfig = {
    apiKey: "AIzaSyDAuBdwsyWK8_0HWgjDJBSHhYT-TlhHPbM",
    authDomain: "bibliofront.firebaseapp.com",
    projectId: "bibliofront",
    storageBucket: "bibliofront.appspot.com",
    messagingSenderId: "518420590930",
    appId: "1:518420590930:web:f25f74c325387ff475ca8b",
    measurementId: "G-3K5H4JNP81",
  };

  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore();
  
  let provider = new firebase.auth.GoogleAuthProvider();



  
  // db.settings({ ignoreUndefinedProperties: true });