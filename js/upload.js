window.onload = (()=>{
    checkStatus();
});

function checkStatus(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            console.log("User logged in!");
        }else{
            console.log("No user logged in.");
            window.location.href = "login.html";
        }
    })

}

$(document).ready(()=>{
    $('.body-div').click(()=>{
        $('.live').hide();
        $('.images').hide();
        $('.body').show();
        $('.live-div').removeClass('selected');
        $('.images-div').removeClass('unselected');
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

    $('.live-div').click(()=>{
        $('.body').hide();
        $('.images').hide();
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

    $('.images-div').click(()=>{
        $('.body').hide();
        $('.live').hide();
        $('.images').show();
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

    $('.cancel-btn').click(()=>{
        window.location.href = "index.html";
    });

    $(".upload-btn").click(function () {
        $('.upload-btn').toggle();
        $(".upload-loading-btn").toggle();
        var body = CKEDITOR.instances['body'].getData();
        var live = document.getElementById('live').value;
        if(body === ""){
            $('.upload-btn').toggle();
            $(".upload-loading-btn").toggle();
            console.log("Post Text can't be empty.")
            return;
        }
        if(live == ""){
            $('.upload-btn').toggle();
            $(".upload-loading-btn").toggle();
            console.log("Where is your live link?");
            return;
        }
        var database = firebase.database();
        var user = firebase.auth().currentUser;
        console.log(user.emailVerified);
        if(user == null){
            $('.upload-btn').toggle();
            $(".upload-loading-btn").toggle();
          console.log("Nothing to be done here there is no user!");
        }else{
          var uid = user.uid;
          var username;
          database.ref("users/" +uid).once("value", (usernameToGet)=>{
            username = usernameToGet.val().name;
    
            //This code should be refactored with legit promises...
    
            var newPost = database.ref("posts");
    
            var addedPost = newPost.push({
              user: uid,
              username: username,
              body: body,
              live: live,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            });
    
            var postId = addedPost.key;
            console.log(postId);
    
            database.ref("userPost/"+uid).child(postId).set(postId).then(()=>{
                window.location.href = "index.html";
                $('.upload-btn').toggle();
                $(".upload-loading-btn").toggle();
            });
            
          });
        }
        
      });
});