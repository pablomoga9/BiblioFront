
let list = document.getElementById("favsList");
let navImage = document.getElementById("navImage");
let userName = document.getElementById("userName");
let btnLogout = document.getElementById("btnLogout");
const modal4 = document.querySelector('#modal4');

navImage.style.display = "block";
userName.style.display = "block";
btnLogout.style.display = "block";
async function displayFavList(){
   
    firebase.auth().onAuthStateChanged(user => {
    modal4.showModal()
      db.collection('users')
    .where("email","==",user.email)
    .get()
    .then((querySnapshot)=>{
       querySnapshot.forEach((doc)=>{
        console.log("in")
         const printFavs = doc.data().favs.map((element)=>{
            return `<li class="books">
            <img class="bookImage" src="${element.image}">
            <p id="bookTitle">${element.title}</p>
            <a id="clearOne" onclick="clearOne('${element.title}')">Eliminar de la lista</a>
            </li>`
         })
         .join('')
         list.innerHTML = printFavs;
        
         modal4.close()
        
        //  list.style.display = "block"
        //---
      
          })
       })
    })
 }

 let createBack = document.createElement("a");
 createBack.setAttribute('href', '/');
 createBack.setAttribute('id', 'goBack');
 createBack.innerHTML = "Volver";
 document.getElementById("topFavContainer").appendChild(createBack);
 createBack.style.top = "0px"
 displayFavList()



 async function clearOne(titleName){
   let dataArr = [];
   firebase.auth().onAuthStateChanged(user => {
      if(user){
         db.collection("users").where("email","==", user.email).get().then((querySnapshot)=>{ querySnapshot.forEach((doc)=>{
            dataArr = doc.data().favs;

          })
          })
          .then((querySnapshot)=>{
            const dataFilter = dataArr.filter(item => item.title !== titleName )

            db.collection("users")
            .doc(user.email)
            .set({favs:dataFilter},{merge:true})
            .then(displayFavList())
            .catch((error)=>{console.log(error)})
          })
      }
   })
}

async function clearList(){
   firebase.auth().onAuthStateChanged(user => {
      if(user){
         db.collection("users")
         .doc(user.email)
         .set({favs:""},{merge:true})
         .then(list == "")
         .catch((error)=>{console.log(error)})
      }
   })
}


function showProfile(){
   firebase.auth().onAuthStateChanged(user => {
   let profileTitle = document.getElementById("profileTitle");
   let modalProfile = document.getElementById("modal3");
   let nickName = user.email.split('@')[0];
   profileTitle.innerHTML = `Perfil: ${nickName}`;
   modalProfile.showModal();
   })
 }


 function uploadFile(){
   firebase.auth().onAuthStateChanged(user => {
   
   var storageRef = firebase.storage().ref();
   var file = document.getElementById("files").files[0];
   var thisRef = storageRef.child(file.name);
   console.log(file.name);
   thisRef
   .put(file)
   .then(function (snapshot) {
    var usersRef = db.collection("users").doc(user.email);
     var mergeImageDb = usersRef.set({
       imageName:file.name
     },{merge:true})

     getUrl();
     
   })
  
 })
}


function getUrl(){
 firebase.auth().onAuthStateChanged(user => {
   if(user){
     let fileName;

     db.collection("users")
     .where("email", "==", user.email)
     .get()
     .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
         //Sacar nombre del archivo subido a storage
         fileName = doc.data().imageName;
        //Subir dicho nombre de archivo haciendo merge a un documento de usuario en firestore
        var storageRef = firebase.storage().ref(fileName);
     
        storageRef
        .getDownloadURL()
        .then(function(url){
          //Subir url a bdd
          var usersRef = db.collection("users").doc(user.email);
          console.log(url);
            var mergeImageDb = usersRef.set({
              imageUrl:url
            },{merge:true})
   
            getProfileImage();
          })
        .catch(function(error){
          console.log("error encountered")
        })
       //  let profileImage = document.getElementById("profileImage");
       //  let navImage = document.getElementById("navImage");
       //  profileImage.src = doc.data().imageUrl
       //  navImage.src = doc.data().imageUrl
       })
     })
   
   }
 
 
})
}



function getProfileImage(){
 firebase.auth().onAuthStateChanged(user => {
 db.collection("users")
 .where("email", "==", user.email)
 .get()
 .then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
     let profileImage = document.getElementById("profileImage");
     
     profileImage.src = doc.data().imageUrl
     navImage.src = doc.data().imageUrl
     console.log(doc.data().imageUrl)
   })
 })
 })
}

firebase.auth().onAuthStateChanged(user => {
   if (user) {
     console.log(firebase.auth().currentUser);
     console.log("state = logged")
     let btnLogin = document.getElementById("btnLogin");
     let btnSignup = document.getElementById("btnSignup");
     let btnLogout = document.getElementById("btnLogout");
     let heartImage = document.getElementById("heartImage");
     let navImage = document.getElementById("navImage");
     let nickName = user.email.split('@')[0];
     userName.style.display = "block";
     userName.innerHTML = nickName;
     btnLogin.style.display = "none";
     btnSignup.style.display = "none";
     btnLogout.style.display = "block";
     console.log(firebase.auth().currentUser);
     heartImage.style.display = "block";
     navImage.style.display = "block"



     
   }
   else {
     console.log("state = logged out")
     let btnLogin = document.getElementById("btnLogin");
     let btnSignup = document.getElementById("btnSignup");
     let btnLogout = document.getElementById("btnLogout");
     let heartImage = document.getElementById("heartImage");
     let navImage = document.getElementById("navImage");
     btnLogin.style.display = "block";
     btnSignup.style.display = "block";
     btnLogout.style.display = "none";
     heartImage.style.display = "none";
     navImage.style.display = "none"
   }

   
 })

 const logoutUser = async () => {
  try {
      let user = await firebase.auth().currentUser;
      
      if(user!=null){
         await swal({
              title: "Logout",
              icon: "warning",
              text: "Abandonando sesión",
              closeOnClickOutside: false,
              timer: 2000,
              buttons: false
            });
          await firebase.auth().signOut();
          logged = false
          console.log("Sale del sistema: "+user.email);
          localStorage.clear();
          window.location.pathname = "../index.html";

          let btnLogin = document.getElementById("btnLogin");
          let btnSignup = document.getElementById("btnSignup");
          let btnLogout = document.getElementById("btnLogout");
          btnLogin.style.display = "block";
          btnSignup.style.display = "block";
          btnLogout.style.display = "none";
         
      }
      else{
          location.reload();
      }
      
      
  } catch (error) {
      console.log("hubo un error: "+error);
  }
}
document.getElementById("btnLogout").addEventListener("click", logoutUser);


getProfileImage();