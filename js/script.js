function Community(name, user, post, links, comments) {
  this.communityName = name;
  this.user = user;
  this.post = post;
  this.links = links;
  this. comments = comments;
}
var newCommunity = new Community("techCommunity", "Bruno", "Check out my new project", "https://btg001.github.io/pizzeria/", "This is really nice!");
console.log(newCommunity);
console.log(newCommunity.communityName);
console.log(newCommunity.user);
console.log(newCommunity.post);
console.log(newCommunity.links);
console.log(newCommunity.comments);

//First name, Second name, Email address

function User(f_name, s_name, email, password) {
  this.f_name = f_name;
  this.s_name = s_name;
  this.email = email;
  this.password = password;
}

function Post(user, message, comments, stars, community) {
  this.user = user;
  this.message = message;
  this.comments = comments;
  this.stars = stars;
  this.community = community;
}


$(document).ready(function() {
  $(".btn").click(function() {
    $(".hidden").show();
  });
});

$(document).ready(function() {
  $("h6").click(function(event) {
    event.preventDefault();
  })
})


 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyBqKX1_Jmhm809kqW3SBifAjmVfzLfC-0w",
  authDomain: "comments2-a5f2e.firebaseapp.com",
  databaseURL: "https://comments2-a5f2e.firebaseio.com",
  projectId: "comments2-a5f2e",
  storageBucket: "comments2-a5f2e.appspot.com",
  messagingSenderId: "617710094361"
};
firebase.initializeApp(config);
//Rootref is the whole database.
const rootRef = firebase.database().ref();
//commentsRef is just the pageCountsNode
const commentsRef = rootRef.child('comments');
//Listen for click on Submit Comment button, and post comment.
document.getElementById("btnSubmitComment").addEventListener("click", function () {
  //Replace line breaks in comment with br tags.
  var newcomment = document.getElementById('txComment').value.replace(/\n/g, "<br>");
  //Define a new, keyed post.
  var newPostRef = commentsRef.push();
  //Fill tne new keyed post with data
  newPostRef.set({
      name: document.getElementById('tbName').value.trim(),
      comment: newcomment.trim(),
      frompage: location.pathname,
      when: firebase.database.ServerValue.TIMESTAMP
  });
});