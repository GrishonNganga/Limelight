$(document).ready(() => {

    //Check if user is logged in or not. If user is not logged in.
    checkStatus();

    $('.body-div').click(() => {
        $('.live').hide();

        $('.body').show();
        $('.live-div').removeClass('selected');
       
        $('.body-div').removeClass('unselected');
        $('.body-div').removeClass('selected');
        $('.post-img').removeClass('inactive-img');
        $('.post-img').addClass('active-img');
        $('.link-img').removeClass('active-img');
        $('.link-img').addClass('inactive-img');
        
        $('.body-div').removeClass('inactive');
        $('.body-div').addClass('active');
        $('.live-div').removeClass('active');
        $('.live-div').addClass('inactive');
       
        $('.live-txt').removeClass('active-txt');
        $('.live-txt').addClass('inactive-txt');
        
        $('.body-txt').removeClass('inactive-txt');
        $('.body-txt').addClass('active-txt');

    });

    $('.live-div').click(() => {
        $('.body').hide();
       
        $('.live').show();
        $('.body-div').removeClass('selected');
       
        $('.live-div').removeClass('unselected');
        $('.live-div').addClass('selected');
        $('.link-img').removeClass('inactive-img');
        $('.link-img').addClass('active-img');
        $('.post-img').removeClass('active-img');
        $('.post-img').addClass('inactive-img');
       
        $('.live-div').removeClass('inactive');
        $('.live-div').addClass('active');
        $('.body-div').removeClass('active');
        $('.body-div').addClass('inactive');
       
        $('.body-txt').removeClass('active-txt');
        $('.body-txt').addClass('inactive-txt');
        
        $('.live-txt').removeClass('inactive-txt');
        $('.live-txt').addClass('active-txt');
    });

    $('.btn-light').click(() => {

        $('.image-preview').show();
    })

    $('.cancel-btn').click(() => {
        window.location.href = "index.html";
    });

    $(".upload-btn").click(function() {
        $('.upload-btn').toggle();
        $(".upload-loading-btn").toggle();
        let body = CKEDITOR.instances['body'].getData();
        let live = document.getElementById('live').value;
        if (body === "") {
            $('.upload-btn').toggle();
            $(".upload-loading-btn").toggle();
            textError = "Post description cannot be empty!";
            document.getElementById("errors").innerHTML = textError;
            document.getElementById("errors").style.color = "red";
            return;
        }
        if (live == "") {
            $('.upload-btn').toggle();
            $(".upload-loading-btn").toggle();
            textError = "Please provide a live link to your work!";
            document.getElementById("errors").innerHTML = textError;
            document.getElementById("errors").style.color = "red";
            return;
        }

        if (user == null) {
            $('.upload-btn').toggle();
            $(".upload-loading-btn").toggle();
            window.location.href = "login.html";
            console.log("Nothing to be done here there is no user!");
        } else {
            uid = user.uid;

            //Upload the images and get their file paths!
            
            uploadPost(uid, body, live);

        }

    });

    //This checks if user is logged in or not. If logged in. Sets the global variables.
    
    document.getElementById('logout').onclick = (event)=>{
        event.preventDefault();
        firebase.auth().signOut().then(()=>{
            console.log("Logged out the user!");
            window.location.href = "upload.html";
        })
    }
});

//Check if user is logged in or not!
function checkStatus() {
    let caretUserDiv = document.getElementById("caret-username");
    
    firebase.auth().onAuthStateChanged(async (userLoggedIn) => {
        if (userLoggedIn) {

            await firebase.database().ref("users/" + userLoggedIn.uid).once("value", (usernameToGet) => {
                username = usernameToGet.val().name;

            });
            user = userLoggedIn;
            caretUserDiv.innerHTML = username;
        } else {
            console.log("No user logged in.");
            caretUserDiv.innerHTML = "Anonymous";
            window.location.href = "login.html";
        }
    })

}

//Upload selected files to database storage.

//Upload the name to the files uploaded to the db.
function uploadPost(uid, body, live){
    firebase.database().ref("users/" + uid).once("value", (usernameToGet) => {
        username = usernameToGet.val().name;

        firebase.database().ref("posts").push({
            user: uid,
            username: username,
            body: body,
            live: live,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
        }).then((snap)=>{
            firebase.database().ref("userPost/" + uid).child(snap.key).set(snap.key).then(() => {
                //window.location.href = "index.html";
                $('.upload-btn').toggle();
                $(".upload-loading-btn").toggle();
                window.location.href = "index.html";
            });
        }).catch((err)=>{
            console.log("Post was not successful due to "+err.message);
        });
    });
}