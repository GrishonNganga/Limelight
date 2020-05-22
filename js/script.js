//Backend Logic


function User(f_name, s_name, username, email, password, community) {
    this.f_name = f_name;
    this.s_name = s_name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.communities = [community];
    this.posts = [];
}

User.prototype.post = function(post) {
    this.posts.push(post);
}

User.prototype.join = function(community) {
    this.communities.push(community)
}

function Community(name, image) {
    this.communityName = name;
    this.coverImage = image;
    this.users = [];
}
Community.prototype.addUser = function(user) {
    this.users.push(user);
}

Community.prototype.changeImage = function(image) {

    this.coverImage = image;
}

function Comment(user, message, post) {
    this.post = post;
    this.message = message;
    this.user = user;
    this.stars = 0;
    this.comments = [];
}

Comment.prototype.comment = function(comment) {
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

Post.prototype.comment = function(comment) {
    this.comments.push(comment);
}

Post.prototype.star = function() {
    this.stars++;
}

//Create objects to populate index.

//Default Community everyone is added to...
var communityAll = new Community("All", "C:\Moringa\Limelight\images\cute-lime.jpg");
var jkuatHackers = new Community("JKUAT Hackers", "C:\Moringa\Limelight\images\cute-lime.jpg");
var uonDevs = new Community("UoN Devs", "C:\Moringa\Limelight\images\cute-lime.jpg");
var tukTechTurks = new Community("TUK Tech Turks", "C:\Moringa\Limelight\images\cute-lime.jpg");
var dekutMasters = new Community("Dekut Masters", "C:\Moringa\Limelight\images\cute-lime.jpg");
var strathGeeks = new Community("Strath Geeks", "C:\Moringa\Limelight\images\cute-lime.jpg");
var moiUniDevs = new Community("Moi Uni Devs", "C:\Moringa\Limelight\images\cute-lime.jpg");
var usiuTitans = new Community("USIU Titans", "C:\Moringa\Limelight\images\cute-lime.jpg");

var communities = [communityAll, jkuatHackers, uonDevs, tukTechTurks, dekutMasters, strathGeeks, moiUniDevs, usiuTitans];


var grishon = new User("Grishon", "Ng'ang'a", "grishonnganga", "grishon.nganga01@gmail.com", "123@Iiht", communityAll);
var karen = new User("Karen", "Ngala", "karen.ngala@gmail.com", "123@Iiht", communityAll);
var arnold = new User("Arnold", "Lifereze", "arnold@gmail.com", "123@Iiht", communityAll);
var josphat = new User("Josphat", "Mwangi", "josphat.kungu@gmail.com", "123@Iiht", communityAll);
var bruno = new User("Bruno", "Kiplang'at", "bruno.kiplangat@gmail.com", "123@Iiht", communityAll);
var maryann = new User("Maryann", "Makena", "maryanne.makena@gmail.com", "123@Iiht", communityAll);
var sospeter = new User("Sospeter", "Kung'u", "sospeter.kungu@gmail.com", "123@Iiht", communityAll);

var users = [grishon, karen, arnold, josphat, bruno, maryann];

console.log(users);

var limelightPost = new Post(grishon, "We built this for us. So ofcourse the first post will be ours!!", moiUniDevs, "https://grishonnganga.github.io/Limelight/");
var grishonPost = new Post(grishon, "In an effort to put myself out there I made my portfolio site. Please tell me what you think of it.", communityAll, "https://grishonnganga.github.io/Portfolio/");
var karenPost = new Post(karen, "I think it's very important to get more women into computing. My slogan is: Computing is too important to be left to men. Check my work.", strathGeeks, "https://karenngala.github.io/Portfolio/");
var arnoldPost = new Post(arnold, "My tech journey is none to be played with. So watch this space. Look at this work in 15 weeks.", communityAll, "https://lifereze.github.io/portfolio-IP/");
var josphatPost = new Post(josphat, "Better known as Jopa. Young ninja not to mess with. Check my work and hmu for collabs!", communityAll, "https://josphat-mwangi.github.io/Portfolio/");
var brunoPost = new Post(bruno, "There is a reason they call me BTG. Ask and might be granted.", communityAll, "https://btg001.github.io/my-portforlio/");
var maryannPost = new Post(maryann, "I don't fancy much. A good life and super loud bike is all. Oh! I make these projects too. So check out my work!!", communityAll, "https://makena-maryann.github.io/portfolio-landing-page/");
var sospeterPost = new Post(sospeter, "Open your code. Code never lies!", communityAll, "https://sospeterkungu.github.io/resubmission-myportfoliowk1/");

var posts = [limelightPost, grishonPost, karenPost, arnoldPost, josphatPost, brunoPost, maryannPost];



//Frontend ~ Backend Logic


$(document).ready(function() {
    //carousel
    $('.all-posts').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: $(".next"),
        prevArrow: $(".prev"),
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $(".btn").click(function() {
        $(".hidden").show();

    });

    $("h6").click(function(event) {
        event.preventDefault();
    });

    $(document).ready(function() {
        $(".btn").click(function() {
            $(".hidden").show();
        });

        $("#url-upload").click(function() {
            $(".upload-form").show();
            $(".upload-button").hide();
        });
    });


    //Post Comments...
    var postsCount = 0;
    posts.forEach((post) => {
        postsCount++;
        var user = post.user.f_name;
        var message = post.message;
        var link = post.link;
        var comments = post.comments;
        var commentStars = post.stars;
        var community = post.community;

        var commentsCounter = 0;
        comments.forEach((comment) => {
            counter++;
        });

        $('.posts').html($('.posts').html() + "<div class=\"container " + postsCount + " card card-post\"><a href=" + link + " target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-dark font-weight-bold\"><div class=\"row\"><div class=\" col-2 col-sm-1\"><div class=\"upVote\"><i class=\"fa fa-caret-up fa-2x\" ></i></div><div class=\"votesNumber\">200</div><div class=\"downVote\"><i class=\"fa fa-caret-down fa-2x\" ></i></div></div><div class=\"col\"><div class=\"row\"><div class=\"col\"><p class=\"owner\">Posted by " + user + " 2 hours ago</p></div></div><div class=\"row\"><div class=\"col\">" + message + "</div></div><div class=\"row feedback-section\"><div class=\"col\"><i class=\"fa fa-comment\">" + commentsCounter + "comments</i></div><div class=\"col\"><li class=\"fa fa-star\">" + commentStars + "stars</li></div></div></div></div> </a></div>");

    });

    var communitiesCount = 0;
    communities.forEach((community) => {
    communitiesCount++;
    var name = community.communityName;
        
    $('.card-text').html($('.card-text').html() + "<p class=\"card-text\"><h6 class=\"font-weight-bold\">" + communitiesCount + "      " + name + "</h6>");

   
    $(document).ready(function() {
        $("h6").click(function(event) {
            event.preventDefault();
        });
    });

    $("h6").click(function(event) {
        event.preventDefault();
    });
    //Form validation for login

    $('#url-upload').click(() => {
        if (logIn) {

            //Handle Upload...
            $(".upload-form").show();
            $(".upload-button").hide();
        }
    });

    var trackerr = 0;
    posts.forEach((post) => {
        trackerr++;
        $('.' + trackerr.toString()).click((event) => {
            var id = event.currentTarget;
            console.log(id);
            id.attr('class').split(' ').map(function(clssName) {
                $("#message").append(clssName + " ");
                console.log(clssName);
            });
            // console.log(tracker);
        });
    });
});

$(document).ready(() => {

    $('.login-submit').click(() => {
        var username = document.getElementById('login-name').value;
        var password = document.getElementById('login-password').value;

        validateField(username);
        validateField(password);

        users.forEach((user) => {
            if (user.username == username && user.password == password) {
                alert('Done');
                location.href = "index.html";
                setTimeout(() => { console.log("World!"); }, 2000);

            } else {

                return;
            }
        })
    });

    // users.forEach(()=>{

    // })
});



function validateField(field) {

    if (field == "") {
        alert('Error! Empty Field. Please Check and retry.');
        return;
    }
}
});
