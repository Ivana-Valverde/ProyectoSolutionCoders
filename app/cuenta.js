$(document).ready(function(){

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDV_eWo6ETlb3IvxETjW5TVqhElQNYMLcs",
  authDomain: "redsocial-1a57c.firebaseapp.com",
  projectId: "redsocial-1a57c",
  storageBucket: "redsocial-1a57c.appspot.com",
  messagingSenderId: "200288269355",
  appId: "1:200288269355:web:d5bd5ee3634fae46dfa66e",
  measurementId: "G-YJERJJ4PR4"
};


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

   //INICIALIZAR CON GOOGLE
   var provider = new firebase.auth.GoogleAuthProvider();

 



   
  
  $("#btnFacebook").click(function(e) {
    e.preventDefault();
    signInWithFacebook()
      .then((res) => {
        localStorage.setItem('userName', res.user.displayName);
        localStorage.setItem('userProfileImg', res.user.photoURL);
        window.location.hash = '#/home';
        readCreateUserDB(res.user.uid, res.user.email, imgCoverUserDefault, res.user.photoURL, res.user.displayName, 'Developer');
      })
      .catch((error) => {
        const errorCode = error.code;
        const alertLogInSignUp = document.querySelector('#alertLogInSignUp');
        switch (errorCode) {
          case 'auth/account-exists-with-different-credential':
            alertLogInSignUp.innerHTML = '⚠️ Ya existe una cuenta con esta dirección de correo';
            break;
          case 'auth/credential-already-in-use':
            alertLogInSignUp.innerHTML = '⚠️ La cuenta corresponde a una credencial existente';
            break;
          case 'auth/email-already-in-use':
            alertLogInSignUp.innerHTML = '⚠️ El correo corresponde a una credencial existente';
            break;
          default:
            alertLogInSignUp.innerHTML = '⚠️ Error al autenticar con Facebook';
            break;
        }
      });
  });

    // Inicializar base de datos
  const db = firebase.firestore();

  $("#btnRegistrar").click( function(e){

    e.preventDefault()

    var email = $("#registroEmail").val();
    var password = $("#registroPassword").val();

    //REGISTRO DE USUARIO
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;

    db.collection("usuarios").add({
      "correo": email ,
      "contraseña": password
      
  })

  //INFORMACION DEL USUARIO 
  var user = result.user;
  var nombreUsuario=user.displayName;  //NOMBRE DEL USUARIO- USER.user.displayName
  var imagenUsuario=user.photoURL;     //LA IMAGEN DEL USUARIO - user.photoURL
  console.log(user);
  console.log(nombreUsuario);
  console.log(imagenUsuario);


    let div = $("<div></div>");
    div.addClass("card-body2");

    let name = $("<h5></h5>");
    name.addClass("card-title");
    name.append(nombreUsuario);
    div.append(name);

    let imagen = $("<img></img>");
    imagen.attr("src", imagenUsuario);
    div.append( imagen);

    $("#infomacionUsuario").append(div)

    // let tex = $("<p></p>");
    // tex.addClass("card-text");
  

  

  $("#registroUsuario").trigger("reset");

    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

  })

  $("#btnIngresar").click( function(e){

    e.preventDefault()

    var email = $("#ingresoEmail").val();
    var password = $("#ingresoPassword").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      $("#pagina").show();
      $("#inicio").hide();
      console.log("USUARIO DENTRO DE LA PAGINA")
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
})



$("#btnGoogle").click( function(e){

    e.preventDefault()
    
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      
      var credential = result.credential;
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      var nombre=user.displayName;
      var perfil=user.photoURL;
      console.log(nombre,perfil);
      // IdP data available in result.additionalUserInfo.profile.
        // ...
        localStorage.setItem("nombreUsuario",nombre)
        localStorage.setItem("perfilUsuario",perfil)
        $(location).attr("href","./index2.html")
        
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  
  
  })

  $("#logout").click( function(e){

    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("Usuario cerró sesión")
    }).catch((error) => {
      // An error happened.
    });
  
  })

})