window.onload = (() => {
    checkStatus();
});

function checkStatus() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("User logged in!");
        } else {
            console.log("No user logged in.");
            window.location.href = "login.html";
        }
    })

}

$(document).ready(() => {

    let imageDisplay;
    document.getElementById('file').onchange = (event) => {
        loadFile(event)
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
        var body = CKEDITOR.instances['body'].getData();
        var live = document.getElementById('live').value;
        if (body === "") {
            $('.upload-btn').toggle();
            $(".upload-loading-btn").toggle();
            textError = "Post description cannot be empty!";
            document.getElementById("errors").innerHTML = textError;
            document.getElementById("errors").style.color = "red";
            return;
        }
        if (imageDisplay == null) {
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

        var database = firebase.database();
        var storage = firebase.storage();
        var user = firebase.auth().currentUser;
        if (user == null) {
            $('.upload-btn').toggle();
            $(".upload-loading-btn").toggle();
            console.log("Nothing to be done here there is no user!");
        } else {
            var uid = user.uid;
            var username;
            let postsImages = storage.ref("posts");
            let newPost = database.ref('posts');

            let allImages = [];
            console.log(imageDisplay);
            for (let i = 0; i < imageDisplay.length; i++) {
                let file = imageDisplay[i];
                let name = new Date() + '-' + imageDisplay[i].name;
                let metadata = {
                    contentType: imageDisplay[i].type
                }
                postsImages.child(name).put(file, metadata)
                    .then(() => {
                        console.log("Upload successful!");
                    });
                allImages.push(name);
            }
            database.ref("users/" + uid).once("value", (usernameToGet) => {
                username = usernameToGet.val().name;

                //This code should be refactored with legit promises...

                var addedPost = newPost.push({
                    user: uid,
                    username: username,
                    body: body,
                    live: live,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    images: allImages
                });

                var postId = addedPost.key;
                console.log(postId);

                database.ref("userPost/" + uid).child(postId).set(postId).then(() => {
                    window.location.href = "index.html";
                    $('.upload-btn').toggle();
                    $(".upload-loading-btn").toggle();
                });

            });
        }

    });

    function loadFile(event) {
        $('.image-preview').show();
        var image = document.getElementById('imageUpload');
        let imageList = document.getElementById('addPic');


        imageDisplay = event.target.files;
        if (imageDisplay.length > 0) {
            console.log(imageDisplay);
            for (let i = 0; i < imageDisplay.length; i++) {
                let imageLi = document.createElement('li');
                let imgElement = document.createElement('img');
                let image = imageDisplay[i];
                const imageURL = window.URL.createObjectURL(image);
                console.log(imageURL);
                imgElement.setAttribute('src', imageURL);
                imageLi.appendChild(imgElement);
                imageList.appendChild(imageLi);
            }
        } else {
            $('.image-preview').hide();
        }


    };
});