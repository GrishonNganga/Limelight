const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

//For sign in.
function signIn(){
  var email = document.getElementById('signin-username').value;
  var passwd = document.getElementById('signin-passwd').value;
  
  var data = {
    emailAddress: email,
    password: passwd
  }
  sanitise("login", data);
}

//For sign up.
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

  if(operation == "login"){
    signInFirebase(data);
  }
  if(operation == "signup"){
    var name = data.name;
    
    if(isNaN(name) === false){
      alert('Name can not be a number');
      return;
    }
    signUpFirebase(data, calledLater);
  }

  console.log("Everything is good!");

  //If everything is good...
}


function signUpFirebase(data){
var name = data.name;
var email = data.emailAddress;
var password = data.password;
const database = firebase.database();
firebase.auth().createUserWithEmailAndPassword(email, password).then((dataPassed)=>{
  console.log(data);
  console.log(dataPassed.user.uid);
  var createdUser = dataPassed.user.uid;
  database.ref("users/" +createdUser).set({
    name: data.name
  });
  
});

}
function signInFirebase(data){
  var email = data.emailAddress;
  var password = data.password;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
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
      // console.log(user);
      window.location.href = "index.html";
      // ...
      
    } else {
      // User is signed out.
      console.log("Users is not logged in");
    
    }
  });
}

const calledLater = ()=>{
  console.log("This is called afterwards");
}
