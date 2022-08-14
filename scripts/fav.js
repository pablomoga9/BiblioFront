

let favArray = [];

//Add to fav list a book by its title

async function tryFav(title){
   firebase.auth().onAuthStateChanged(user => {
      if(user){
        
       
        
         var docRef = db.collection('users')
         .where("email","==",user.email)
         .get()
         .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
              let dbData = doc.data().favs;
            //   console.log()
            //   dbData.filter(item=>item.title !== title)
              (dbData!=="" && dbData)?favArray = dbData:console.log("no register yet")
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







