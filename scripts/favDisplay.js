
let list = document.getElementById("categoryList");

async function displayFavList(){
   
    firebase.auth().onAuthStateChanged(user => {
    var docRef = db.collection('users')
    .where("email","==",user.email)
    .get()
    .then((querySnapshot)=>{
       querySnapshot.forEach((doc)=>{
        console.log("in")
         const printFavs = doc.data().favs.map((element)=>{
            return `<li class="books">
            <img class="bookImage" src="${element.image}">
            <p>${element.title}</p>
            </li>`
         })
         .join('')
         list.innerHTML = printFavs;
          })
       })
    })
 }

 displayFavList()