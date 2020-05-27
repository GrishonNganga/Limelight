const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function signIn(){
  var email = document.getElementById('signin-username').value;
  var passwd = document.getElementById('signin-passwd').value;
  
  var data = {
    emailAddress: email,
    password: passwd
  }
  sanitise("login", data);
}

function signUp(){
  var userName = document.getElementById('signup-name').value;
  var email = document.getElementById('signup-email').value;
  var passwd = document.getElementById('signup-passwd').value;

  var data = {
    name: userName,
    emailAddress: email,
    password: passwd
  }

  sanitise("signup", data);
  
  
}

function sanitise(operation, data){

  var email = data.emailAddress;
  var password = data.password;

  if(email == ""){
    alert("Email can not be empty!");
    return;
  }
  if(password == ""){
    alert("Password can not be empty!");
    return;
  }
  else if(password.length < 8){
    alert("Password too short!");
    return;
  }

  if(operation == "signup"){
    var name = data.name;
    
    if(isNaN(name) === false){
      alert('Name can not be a number');
      return;
    }
    signUpFirebase(data);
  }

  console.log("Everything is good!");

  //If everything is good...
}


function signUpFirebase(data){
  var email = data.emailAddress;
  var password = data.password;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
}

window.onload = ()=>{
  checkStatus();
}

function checkStatus(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User logged in.");
      console.log(user);
      window.location.href = "index.html";
      // ...
      
    } else {
      // User is signed out.
    
    }
  });
}