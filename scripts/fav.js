async function tryFav(title){
   firebase.auth().onAuthStateChanged(user => {
      if(user){
         console.log("añadido:" + title);
      }
      else{
         console.log("inicia sesion");
      }
   })
}

