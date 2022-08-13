let favArray = [];


async function tryFav(title){
   firebase.auth().onAuthStateChanged(user => {
      if(user){
        
       
         let favPush;
         var docRef = db.collection('users')
         .where("email","==",user.email)
         .get()
         .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
              let dbData = doc.data().favs;
             
              dbData!==""?favArray = dbData:console.log("no register yet")
              })
         })
         .then((querySnapshot)=>{
            favArray.push(title)

        
         db.collection("users")
         .doc(user.email)
         .set({favs:favArray},{merge:true})
         .then(console.log("added book" + title))
         .catch((error)=>{console.log(error)})
         })
         
      }
      else{
         swal({
            title: "Inicia sesión",
            icon: "warning",
            text: "Debes iniciar sesión para poder añadir libros a tu lista de favoritos",
            closeOnClickOutside: true,
            buttons: true
          })
      }
   })
}


// async function updateFav(arr){
//    firebase.auth().onAuthStateChanged(user => {
//       if(user){
//          let colRef = db.collection("users").doc(user.email)
//       }
//    })
// }




