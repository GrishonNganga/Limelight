
//First name, Second name, Email address

function User(f_name, s_name, email, password, community) {
  this.f_name = f_name;
  this.s_name = s_name;
  this.email = email;
  this.password = password;
  this.communities = [community];
  this.posts = [];
}

User.prototype.post = function(post){
  this.posts.push(post);
}

User.prototype.join = function(community){
  this.communities.push(community)
}

function Community(name, image) {
  this.communityName = name;
  this.coverImage = image;
  this.users = [];
}
Community.prototype.addUser = function(user){
  this.users.push(user);
}

Community.prototype.changeImage = function(image){

  this.coverImage = image;
}

function Comment(user, message, post){
  this.post = post;
  this.message = message;
  this.user = user;
  this.stars = 0;
  this.comments = [];
}

Comment.prototype.comment = function(comment){
  this.comments.push(comment);
}

function Post(user, message, community, link) {
  this.user = user;
  this.message = message;
  this.link = link;
  this.stars = 0;
  this.community = community;
  this.comments = [];
}

Post.prototype.comment = function(comment){
  this.comments.push(comment);
}

Post.prototype.star = function(){
  this.stars++;
}


//Default Community everyone is added to...
var communityAll = new Community("All", "C:\Moringa\Limelight\images\cute-lime.jpg");
var jkuatHackers = new Community("JKUAT Hackers", "C:\Moringa\Limelight\images\cute-lime.jpg");
var uonDevs = new Community("UoN Devs", "C:\Moringa\Limelight\images\cute-lime.jpg");
var tukTechTurks = new Community("TUK Tech Turks", "C:\Moringa\Limelight\images\cute-lime.jpg");
var dekutMasters = new Community("Dekut Masters", "C:\Moringa\Limelight\images\cute-lime.jpg");
var strathGeeks = new Community("Strath Geeks", "C:\Moringa\Limelight\images\cute-lime.jpg");
var moiUniDevs = new Community("Moi Uni Devs", "C:\Moringa\Limelight\images\cute-lime.jpg");
var usiuTitans = new Community("USIU Titans", "C:\Moringa\Limelight\images\cute-lime.jpg");



var grishon = new User("Grishon", "Ng'ang'a", "grishon.nganga01@gmail.com", "123@Iiht", communityAll);
var karen = new User("Karen", "Ngala", "karen.ngala@gmail.com", "123@Iiht", communityAll);
var arnold = new User("Arnold", "Lifereze", "arnold@gmail.com", "123@Iiht", communityAll);
var josphat = new User("Josphat", "Mwangi", "josphat.kungu@gmail.com", "123@Iiht", communityAll);
var bruno = new User("Bruno", "Kiplang'at", "bruno.kiplangat@gmail.com", "123@Iiht", communityAll);
var maryann = new User("Maryann", "Makena", "maryanne.makena@gmail.com", "123@Iiht", communityAll);

var users = [grishon, karen, arnold, josphat, bruno, maryann];

console.log(users);

var grishonPost = new Post(grishon, "Check out my account! I am cool",communityAll, "https://github.com/grishonnganga/");
var karenPost = new Post(karen, "https://github.com/grishonnganga",communityAll);
var arnoldPost = new Post(arnold, "https://github.com/grishonnganga",communityAll);
var josphatPost = new Post(josphat, "https://github.com/grishonnganga",communityAll);
var brunoPost = new Post(bruno, "https://github.com/grishonnganga",communityAll);
var maryannPost = new Post(maryann, "https://github.com/grishonnganga",communityAll);

var posts = [grishonPost,karenPost, arnoldPost, josphatPost, brunoPost, maryannPost];

console.log(posts);

// I know merge conflict will arise here. I just move sll the functions inside one ready() function...


$(document).ready(function() {
    //Post Comments...
    posts.forEach((post)=>{
      var user = post.user.f_name;
      var message = post.message;
      var link = post.link;
      var comments = post.comments;
      var commentStars = post.stars;
      var community = post.community;

      var commentsCounter = 0;
      comments.forEach((comment)=>{
        counter++;
      });

      $('.posts').html($('.posts').html() + "<div class=\"container card card-post\"><a href="+link+" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-dark font-weight-bold\"><div class=\"row\"><div class=\"col-2\"><div class=\"upVote\"><i class=\"fa fa-caret-up fa-2x\" ></i></div><div class=\"votesNumber\">200</div><div class=\"downVote\"><i class=\"fa fa-caret-down fa-2x\" ></i></div></div><div class=\"col\"><div class=\"row\"><div class=\"col\"><p class=\"owner\">Posted by" +user+ " 2 hours ago</p></div></div><div class=\"row\"><div class=\"col\">"+message+"</div></div><div class=\"row feedback-section\"><div class=\"col\"><i class=\"fa fa-comment\">"+commentsCounter+ "comments</i></div><div class=\"col\"><li class=\"fa fa-star\">"+commentStars+ "stars</li></div></div></div></div> </a></div>");

    });

    $(".btn").click(function() {
      $(".hidden").show();
        
    });
      
      $("h6").click(function(event) {
      event.preventDefault();
      });
});
