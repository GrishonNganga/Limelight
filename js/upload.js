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
        $('.body').show();
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

    $('.live-div').click(()=>{
        $('.body').hide();
        $('.live').show();
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

    $('.cancel-btn').click(()=>{
        window.location.href = "index.html";
    });

    $(".upload-btn").click(function () {
        $('.upload-btn').toggle();
        $(".upload-loading-btn").toggle();
        var body = document.getElementById('body').value;
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