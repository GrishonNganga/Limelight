var user;
var posts;

window.onload = ()=>{

  user = false;
  checkStatus();

}

$(document).ready(()=>{

  loadPosts();

  //Carousel...
  $(".all-posts").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: $(".next"),
    prevArrow: $(".prev"),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $("#url-upload").click(function () {
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    if(user == null){
      console.log("Nothing to be done here there is no user!");
    }else{
      var uid = user.uid;
      var username;
      database.ref("users/" +uid).once("value", (usernameToGet)=>{
        username = usernameToGet.val().name;

        //Todo This code should be refactored with legit promises...

        var newPost = database.ref("posts");

        var addedPost = newPost.push({
          user: uid,
          username: username,
          body: "This is the body",
          live: "This is the livelink.",
          timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        var postId = addedPost.key;
        console.log(postId);

        database.ref("userPost/"+uid).child(postId).set(postId);
      });
    }
    
  });
});

function checkStatus(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User logged in.");
      console.log(user);
      console.log(user.uid);
      // ...
      
    } else {
      // User is signed out.
      console.log("No user logged in!");
      //User is not logged in.
    
      user = false;
    }
  });
}
function loadPosts(){
  $('.spinner-grow').toggle();
  var database = firebase.database();
  // database.
  database.ref("posts").once('value', function(posts) {
    console.log(posts.val());
    var postsCount = 0;
    var commentsCounter = 0;

    $('.spinner-grow').toggle();
    posts.forEach((post)=>{
       postsCount++;
     
      var post = post.valueOf("body").val();
      console.log(post);
      var message = post.body;
      var link = post.live;
      var user = post.username;
      var timestamp = new Date(post.timestamp * 1000);
      timestamp = timestamp.getHours();

      $(".posts").html(
        $(".posts").html() +
          '<div class="container ' +
          postsCount +
          ' card card-post"><div class="row"><div class=" col-2 col-sm-1"><div class="upVote"><i class="fa fa-caret-up fa-2x" ></i></div><div class="votesNumber">200</div><div class="downVote"><i class="fa fa-caret-down fa-2x" ></i></div></div><div class="col"><div class="row"><div class="col"><p class="owner">Posted by ' +
          user + ' ' +
          timestamp + ' hours ago</p></div></div><div class="row"><div class="col">' +
          "<a href=" +
          link +
          ' target="_blank" rel="noopener noreferrer" class="text-dark font-weight-bold">' +
          message +
          "</a>" +
          '</div></div><div class="row feedback-section"><div class="col"><i class="fas fa-comment-alt"> ' +
          commentsCounter +
          ' comments</i></div><div class="col"><i class="fa fa-flag offset-5">' +
          " report</i></div></div></div></div></div>"
      );
    });
  });

}
