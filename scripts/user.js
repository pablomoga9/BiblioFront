let logged;
let userName = document.getElementById("userName");


userName.style.display = "none";

const createUser = (user) => {
    db.collection("users")
      .doc(user.email)
      .set(user)
      .then((docRef) => console.log("Usuario añadido con ID: ", user.email))
      .catch((error) => console.error("Error adding document: ", error));
  };


  document.getElementById("form1").addEventListener("submit", event =>{
        event.preventDefault();
        let email = event.target.elements.email.value;
        let password = event.target.elements.pass.value;
        let emailElement = event.target.elements.email;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        //email.split('@')[0]
        signInUser(email,password);
    }
    else{
        
        const form1 = document.getElementById("form1");
        form1.reset();
        event.target.elements.email.placeholder = "El email debe contener '@' y '.com'"
        event.target.elements.email.style.backgroundColor = "red";
    }
  })

  const form2 = document.getElementById("form2").addEventListener("submit", event =>{
    event.preventDefault();
    let email = event.target.elements.email2.value;
    let password1 = event.target.elements.pass1.value;
    let password2 = event.target.elements.pass2.value;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password1,password2))
    {
   
        password1===password2?signUpUser(email,password1):swal({ title: "Error en el campo de contraseña",
        icon: "error",
        text: "Se debe introducir la misma contraseña en ambos campos",
        button: "Ok",});
    
        
    }
    else{
        swal({
            title: "Error en el campo de contraseña o email",
            icon: "error",
            text: "El email debe tener '@' y '.com'. La contraseña debe contener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula y 1 número",
            button: "Ok",
          });
    }
  })

  const signInUser = (email,password) =>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
        // Signed in
        let user = userCredential.user;
        await swal({
          title: "Inicio de sesión",
          icon: "success",
          text: `Has iniciado sesión con ${email}`,
          closeOnClickOutside: false,
          timer: 2000,
          buttons: false
        });
        // location.reload();
        

      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        const form1 = document.getElementById("form1");
        form1.reset();
        logged = true;
        let passInput = document.getElementsByName("pass");
        passInput.placeholder= "La contraseña o el usuario es incorrecto";
        //passInput.style.color = "red";
        console.log(errorCode)
        console.log(errorMessage)
      });
};

const signUpUser = (email, password) => {
   console.log(email);
   
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("in");
        let user = userCredential.user;
       
        document.getElementById("modal2").close();
        swal({
          title: "Registro",
          icon: "success",
          text: `Registro completado con éxito. Inicia sesión con ${email}`,
          closeOnClickOutside: false,
          timer: 2000,
          buttons: false
        });
        createUser({
          id:user.uid,
          email:user.email,
          favs:""
          });

         
  
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("Error en el sistema"+error.message);
      });
  };

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
            location.reload();

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



  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(firebase.auth().currentUser);
      console.log("state = logged")
      let btnLogin = document.getElementById("btnLogin");
      let btnSignup = document.getElementById("btnSignup");
      let btnLogout = document.getElementById("btnLogout");
      let nickName = user.email.split('@')[0];
      let heartImage = document.getElementById("heartImage");
      let navImage = document.getElementById("navImage");
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
      let navImage = document.getElementById("navImage");
      if(doc.data().imageUrl != null){
        profileImage.src = doc.data().imageUrl
        navImage.src = doc.data().imageUrl
        console.log(doc.data().imageUrl)
      }
      
    })
  })
  })
}


getProfileImage();
