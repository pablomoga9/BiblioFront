

let favArray = [];

//Add to fav list a book by its title

async function tryFav(titleName){
   firebase.auth().onAuthStateChanged(user => {
      if(user){
        
       
        
         var docRef = db.collection('users')
         .where("email","==",user.email)
         .get()
         .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
              let dbData = doc.data().favs;
              console.log(dbData);
              const dataFilter = dbData.filter(item=>item.title !== titleName);
              console.log(dataFilter);
              (dbData!=="")?favArray = dataFilter:console.log("ya se ha añadido")
              })
         })
         .then((querySnapshot)=>{
           
            
            favArray.push(titleName)
           

        
         db.collection("users")
         .doc(user.email)
         .set({favs:favArray},{merge:true})
         .then(console.log("added book" + titleName))
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







