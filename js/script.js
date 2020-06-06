var user;
var postsForFilter;
var postsToUse;

window.onload = ()=>{

  user = false;
  checkStatus();

}

$(document).ready(()=>{

  launchUI();

  const searchEvent = document.getElementById("search-input");
  searchEvent.addEventListener("keydown", (event)=>{
    if(event.keyCode === 13){
      event.preventDefault();
    }
  })
  searchEvent.addEventListener("keyup", (event)=>{
    if(event.keyCode === 13){
    
      event.preventDefault();
      console.log("Return pressed");
      let search = searchEvent.value;
      
      const searchResults = searchForPost(search);

      $('.posts').empty();
      if(searchResults.length > 0){
      
        $('.posts').html(
          $('.posts').html()+ '<span class="badge badge-pill badge-danger mb-3"  id="remove-filter">'+search+'  <i class="fas fa-window-close"></i></span>');

        displayPosts(searchResults);


        document.getElementById("remove-filter").addEventListener("click", ()=>{
          console.log("This has been run!")
         
          $('remove-filter').empty();
         $('.posts').empty();
         $('.posts').html(
          $('.posts').html()+ '<p>Latest posts.</p>'
        )
        $('.spinner-grow').toggle();
          displayPosts(postsToUse);
          $('.spinner-grow').toggle();
        })
      }else{
        $('.posts').html(
          $('.posts').html()+ '<p>Sorry no records match your request.</p>'
        )
      }
    }
    

    
  
  })


  

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

  document.getElementById('logout').onclick = (event)=>{
    event.preventDefault();
    firebase.auth().signOut().then(() => {
      console.log('Successful log out');
      window.open('index.html');
    })
  }
});

function checkStatus(){
  let caretUserDiv = document.getElementById('caret-username');
  
  let username;
  firebase.auth().onAuthStateChanged( async(user)=> {
    if (user) {
      // User is signed in.
      await firebase.database().ref("users/" +user.uid).once("value", (userObject)=>{
        username = userObject.val().name;
        caretUserDiv.innerHTML = username;
        console.log(username);
      });
      
      console.log(user.uid);
      // ...
      
    } else {
      // User is signed out.
      caretUserDiv.innerHTML = "Anonymous";
      //User is not logged in.
    
      user = false;
    }
  });
}

function searchForPost(search){
  let filteredArray = [];
  

    postsForFilter.forEach((post)=>{
      if(post.val().body === undefined){
        return;
      }
      if(post.val().body.includes(search)){
        filteredArray.push(post);
      }
    });
    
    return filteredArray;
}
function displayPosts(posts){
  posts.forEach((post)=>{
  

    var postId = post.key;
   var post = post.valueOf("body").val();
   console.log(post);
   var message = post.body;
   var link = post.live;
   var user = post.username;
   var timestamp = new Date(post.timestamp);
   var when;
   var postedAgoText;
   var commentsCounter = 0;
  
   var date = new Date();
   var year = date.getFullYear();
   var month = date.getMonth();
   var dayOfMonth = date.getDay();
   var hourOfDay = date.getHours();
   var minsOfHour = date.getMinutes();
   var secsOfMins = date.getSeconds();

   var postYear = timestamp.getFullYear();
   var postMonth = timestamp.getMonth();
   var postDay = timestamp.getDay();
   var postTimeMins = timestamp.getMinutes();
   var postTimeHours = timestamp.getHours();
   var postTimeSecs = timestamp.getSeconds();

   if(year === postYear){
       if(month === postMonth){
         if(dayOfMonth === postDay){
           if(hourOfDay === postTimeHours){
             if(minsOfHour === postTimeMins){
               when = secsOfMins - postTimeSecs ;
               postedAgoText = "seconds ago";
             }else if(minsOfHour - postTimeMins === 1){
                 when = minsOfHour - postTimeMins ;
                 postedAgoText = "minute ago";
             }else{
                 when = minsOfHour - postTimeMins ;
                 postedAgoText = "minutes ago";   
             }
           }else if(hourOfDay - postTimeHours === 1){
               when = hourOfDay - postTimeHours ;
               postedAgoText = "hour ago";
           }else{
               when = hourOfDay - postTimeHours ;
               postedAgoText = "hours ago";   
           }
         }else if(dayOfMonth - postDay === 1){
             when = dayOfMonth -  postDay;
             postedAgoText = "day ago";
         }else{
           when = dayOfMonth - postDay ;
           postedAgoText = "days ago";
         }
       }else if(month - postMonth === 1){
           when = month - postMonth ;
           postedAgoText = "month ago";
       }
       else{
           when = month - postMonth;
           postedAgoText = "months ago";
       }
   }else if(year - postYear === 1){
       when = year - postYear ;
       postedAgoText = "year ago";
   }
   else{
       when = year - postYear ;
       postedAgoText = "years ago";
   }

   $(".posts").html(
     $(".posts").html() +
       '<div class="container card card-post"><div class="row"><div class=" col-2 col-sm-1"><div class="upVote"><i class="fa fa-caret-up fa-2x" ></i></div><div class="votesNumber">200</div><div class="downVote"><i class="fa fa-caret-down fa-2x" ></i></div></div><div class="col"><a href='+link+' target ="_blank" rel="noopener noreferrer"><div class="row"><div class="col"><p class="owner">Posted by ' +
       user + ' ' +
       when +" "+postedAgoText+'</p></div></div><div class="row"><div class="col">' + 
       message +
       '</div></div><div class="row feedback-section"><a href="post.html?post='+postId+'"><div class="col"><i class="fas fa-comment-alt"> ' +
       commentsCounter +
       ' comments</i></div></a><div class="col"><i class="fa fa-flag offset-5">' +
       " report</i></div></div></a></div></div></div>"
   );
 });
}

async function launchUI(){
  //Get data from database.
  $('.spinner-grow').toggle();
  const posts = await getPostsFromDB();
  postsToUse = posts;  


  postsForFilter = posts;
  //Pass gotten data to be displayed...
  displayPosts(posts);
  $('.spinner-grow').toggle();
}

function getPostsFromDB(){
  var database = firebase.database();
  return database.ref("posts").once('value');
}