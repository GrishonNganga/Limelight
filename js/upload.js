$(document).ready(() => {
    
    let images;

    //Check if user is logged in or not. If user is not logged in.
    checkStatus();

    //Set listener for images uploaded.
    document.getElementById('file').onchange = (event) => {
        images = loadFile(event);
    }

    $('.body-div').click(() => {
        $('.live').hide();
        $('.images').hide();
        $('.image-preview').hide();
        $('.body').show();
        $('.live-div').removeClass('selected');
        $('.images-div').removeClass('selected');
        $('.body-div').removeClass('unselected');
        $('.body-div').removeClass('selected');
        $('.post-img').removeClass('inactive-img');
        $('.post-img').addClass('active-img');
        $('.link-img').removeClass('active-img');
        $('.link-img').addClass('inactive-img');
        $('.images-img').removeClass('active-img');
        $('.images-img').addClass('inactive-img');
        $('.body-div').removeClass('inactive');
        $('.body-div').addClass('active');
        $('.live-div').removeClass('active');
        $('.live-div').addClass('inactive');
        $('.images-div').removeClass('active');
        $('.images-div').addClass('inactive');
        $('.live-txt').removeClass('active-txt');
        $('.live-txt').addClass('inactive-txt');
        $('.images-txt').removeClass('active-txt');
        $('.images-txt').addClass('inactive-txt');
        $('.body-txt').removeClass('inactive-txt');
        $('.body-txt').addClass('active-txt');

    });

    $('.live-div').click(() => {
        $('.body').hide();
        $('.images').hide();
        $('.image-preview').hide();
        $('.live').show();
        $('.body-div').removeClass('selected');
        $('.images-div').removeClass('selected');
        $('.live-div').removeClass('unselected');
        $('.live-div').addClass('selected');
        $('.link-img').removeClass('inactive-img');
        $('.link-img').addClass('active-img');
        $('.post-img').removeClass('active-img');
        $('.post-img').addClass('inactive-img');
        $('.images-img').removeClass('active-img');
        $('.images-img').addClass('inactive-img');
        $('.live-div').removeClass('inactive');
        $('.live-div').addClass('active');
        $('.body-div').removeClass('active');
        $('.body-div').addClass('inactive');
        $('.images-div').removeClass('active');
        $('.images-div').addClass('inactive');
        $('.body-txt').removeClass('active-txt');
        $('.body-txt').addClass('inactive-txt');
        $('.images-txt').removeClass('active-txt');
        $('.images-txt').addClass('inactive-txt');
        $('.live-txt').removeClass('inactive-txt');
        $('.live-txt').addClass('active-txt');
    });

    $('.images-div').click(() => {
        $('.body').hide();
        $('.live').hide();
        $('.images').show();
        $('.image-preview').show();
        $('.live-div').removeClass('selected');
        $('.body-div').removeClass('selected');
        $('.images-div').removeClass('unselected');
        $('.images-div').addClass('selected');
        $('.images-img').removeClass('inactive-img');
        $('.images-img').addClass('active-img');
        $('.post-img').removeClass('active-img');
        $('.post-img').addClass('inactive-img');
        $('.link-img').removeClass('active-img');
        $('.link-img').addClass('inactive-img');
        $('.images-div').removeClass('inactive');
        $('.images-div').addClass('active');
        $('.body-div').removeClass('active');
        $('.body-div').addClass('inactive');
        $('.live-div').removeClass('active');
        $('.live-div').addClass('inactive');
        $('.body-txt').removeClass('active-txt');
        $('.body-txt').addClass('inactive-txt');
        $('.live-txt').removeClass('active-txt');
        $('.live-txt').addClass('inactive-txt');
        $('.images-txt').removeClass('inactive-txt');
        $('.images-txt').addClass('active-txt');
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
        body = CKEDITOR.instances['body'].getData();
        live = document.getElementById('live').value;
        if (body === "") {
            $('.upload-btn').toggle();
            $(".upload-loading-btn").toggle();
            textError = "Post description cannot be empty!";
            document.getElementById("errors").innerHTML = textError;
            document.getElementById("errors").style.color = "red";
            return;
        }
        if (images == null) {
            $('.upload-btn').toggle();
            $(".upload-loading-btn").toggle();
            textError = "Upload at least one image!";
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
            let imagesArr = uploadImagesToFirebaseStorage(images);
            
            uploadImagesToFirebaseDatabase(imagesArr, uid);

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


//Load the files selected by a user. To populate accordingly on the UI!
function loadFile(event) {
    $('.image-preview').show();
    let imageList = document.getElementById('addPic');

    imageDisplay = event.target.files;
    if (imageDisplay.length > 0) {
        console.log(imageDisplay);
        for (let i = 0; i < imageDisplay.length; i++) {
            let imageLi = document.createElement('li');
            let imgElement = document.createElement('img');
            let image = imageDisplay[i];
            const imageURL = window.URL.createObjectURL(image);
            imgElement.setAttribute('src', imageURL);
            imageLi.appendChild(imgElement);
            imageList.appendChild(imageLi);

        }
        console.log(imageDisplay.toString());
    } else {
        $('.image-preview').hide();
    }

    return imageDisplay;

}

//Upload selected files to database storage.
function uploadImagesToFirebaseStorage(images){
    let allImgs = [];
    try{
        
        const imagesURLS = Promise.all(
            [...images].map((image)=>{
                let metadata = {
                    contentType: image.type
                }
                let name = Date.now() + "-" +image.name;
                let date = new Date().getMonth().toString()
                const savedSnapshot = firebase.storage().ref("posts").child(name).put(image,metadata)

                savedSnapshot.catch((err)=>{console.log(err.message)})
                savedSnapshot.then(()=>{
                    console.log("Everything is done here!");
                })

                allImgs.push(savedSnapshot.snapshot.ref.fullPath);
            })
        )
    }catch(err){
        console.log(err.message);
    }
    return allImgs;
}


//Upload the name to the files uploaded to the db.
function uploadImagesToFirebaseDatabase(image, uid){
    firebase.database().ref("users/" + uid).once("value", (usernameToGet) => {
        username = usernameToGet.val().name;

        firebase.database().ref("posts").push({
            user: uid,
            username: username,
            body: body,
            live: live,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            images: image
        }).then((snap)=>{
            firebase.database().ref("userPost/" + uid).child(snap.key).set(snap.key).then(() => {
                //window.location.href = "index.html";
                $('.upload-btn').toggle();
                $(".upload-loading-btn").toggle();
                //window.location.href = "index.html";
            });
        }).catch((err)=>{
            console.log("Post was not successful due to "+err.message);
        });
    });
}