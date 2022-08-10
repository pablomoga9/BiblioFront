const createUser = (user) => {
    db.collection("users")
      .add(user)
      .then((docRef) => console.log("Usuario añadido con ID: ", docRef.id))
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
    .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(`se ha logado ${user.email} ID:${user.uid}`)
        alert(`se ha logado ${user.email} ID:${user.uid}`)
        console.log(user);
        let btnLogin = document.getElementById("btnLogin");
        let btnSignup = document.getElementById("btnSignup");
        btnLogin.style.display = "none";
        btnSignup.style.display = "none";
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        const form1 = document.getElementById("form1");
        form1.reset();
        let passInput = document.getElementById("passInput").placeholder;
        passInput = "La contraseña o el usuario es incorrecto";
        passInput.style.color = "red";
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
        console.log(`se ha registrado ${user.email} ID:${user.uid}`)
        alert(`se ha registrado ${user.email} ID:${user.uid}`)
        // ...
        // Guarda El usuario en Firestore
        createUser({
          id:user.uid,
          email:user.email,
          message:"Hola que tal"
        });
  
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("Error en el sistema"+error.message);
      });
  };