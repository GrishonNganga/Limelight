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
function signIn() {
    $('.spinner-grow').toggle();
    var email = document.getElementById('signin-username').value;
    var passwd = document.getElementById('signin-passwd').value;

    var data = {
        emailAddress: email,
        password: passwd
    }
    sanitise("login", data);
}

//For sign up.
function signUp() {
    $('.spinner-grow').toggle();
    var userName = document.getElementById('signup-name').value;
    var email = document.getElementById('signup-email').value;
    var passwd = document.getElementById('signup-passwd').value;

    var data = {
        name: userName,
        mail: email,
        passwd: passwd
    }

    sanitise("signup", data);


}

function sanitise(operation, data) {

    if (operation == "login") {
        var email = data.emailAddress;
        var password = data.password;

        if (email == "") {
            emailError = "This field cannot be empty!";
            document.getElementById("errorEmail").innerHTML = emailError;
            document.getElementById("signin-username").style.backgroundColor = "pink";
            $('.spinner-grow').toggle();
            return;
        }
        if (password == "") {
            emailError = "This field cannot be empty!";
            document.getElementById("errorPass").innerHTML = emailError;
            document.getElementById("signin-passwd").style.backgroundColor = "pink";
            $('.spinner-grow').toggle();
            return;
        }
        signInFirebase(data);
    } else if (operation == "signup") {
        var name = data.name;
        var email = data.mail;
        var password = data.passwd;

        if (name === "") {
            nameError = "This field cannot be empty!";
            document.getElementById("errorText").innerHTML = nameError;
            document.getElementById("signup-name").style.backgroundColor = "pink";
            document.getElementById("signup-email").style.backgroundColor = "white";
            document.getElementById("signup-passwd").style.backgroundColor = "white";
            $('#errorText').show();
            $('#mailError').hide();
            $('#passError').hide();
            $('.spinner-grow').toggle();
            return;
        } else
        if (isNaN(name) === false) {
            nameError = "This field cannot be a number!";
            document.getElementById("errorText").innerHTML = nameError;
            document.getElementById("signup-name").style.backgroundColor = "pink";
            document.getElementById("signup-email").style.backgroundColor = "white";
            document.getElementById("signup-passwd").style.backgroundColor = "white";
            $('#errorText').show();
            $('#mailError').hide();
            $('#passError').hide();
            $('.spinner-grow').toggle();
            return;
        } else
        if (email == "") {
            emailError = "This field cannot be empty!";
            document.getElementById("mailError").innerHTML = emailError;
            document.getElementById("signup-email").style.backgroundColor = "pink";
            document.getElementById("signup-passwd").style.backgroundColor = "white";
            document.getElementById("signup-name").style.backgroundColor = "white";
            $('#errorText').hide();
            $('#mailError').show();
            $('#passError').hide();
            $('.spinner-grow').toggle();
            return;
        } else
        if (password == "") {
            passwordError = "This field cannot be empty!";
            document.getElementById("passError").innerHTML = passwordError;
            document.getElementById("signup-passwd").style.backgroundColor = "pink";
            document.getElementById("signup-email").style.backgroundColor = "white";
            document.getElementById("signup-name").style.backgroundColor = "white";
            $('#errorText').hide();
            $('#mailError').hide();
            $('#passError').show();
            $('.spinner-grow').toggle();
            return;
        } else if (password.length < 8) {
            passwordError = "Password is too short!";
            document.getElementById("passError").innerHTML = passwordError;
            document.getElementById("signup-passwd").style.backgroundColor = "grey";
            document.getElementById("signup-email").style.backgroundColor = "white";
            document.getElementById("signup-name").style.backgroundColor = "white";
            $('#errorText').hide();
            $('#mailError').hide();
            $('#passError').show();
            $('.spinner-grow').toggle();
            return;
        }
        signUpFirebase(data, calledLater);
    }

    console.log("Everything is good!");

    //If everything is good...
}


function signUpFirebase(data) {
    var name = data.name;
    var email = data.mail;
    var password = data.passwd;
    const database = firebase.database();
    firebase.auth().createUserWithEmailAndPassword(email, password).then((dataPassed) => {
        console.log(data);
        console.log(dataPassed.user.uid);
        var createdUser = dataPassed.user.uid;
        database.ref("users/" + createdUser).set({
            name: data.name
        });

    });

}

function signInFirebase(data) {
    var email = data.emailAddress;
    var password = data.password;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        $('.spinner-grow').toggle();
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        logStatus = "Incorrect email or password!";
        document.getElementById("status").innerHTML = logStatus;
        $('#errorPass').hide();
        $('#errorEmail').hide();
        $('#status').show();
        // ...
    });
}


window.onload = () => {
    checkStatus();
}

function checkStatus() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            logStatus = "Successful login!";
            document.getElementById("status").innerHTML = logStatus;
            // console.log(user);
            $('.spinner-grow').toggle();
            window.location.href = "index.html";
            // ...

        } else {
            // User is signed out.
            logStatus = "You are not logged in!";
            document.getElementById("status").innerHTML = logStatus;
        }
    });
}

const calledLater = () => {
    console.log("This is called afterwards");
}