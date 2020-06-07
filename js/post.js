var postID;
var uid;
var database = firebase.database();
var storage = firebase.storage().ref('posts');
$(document).ready(()=>{
    var query = window.location.search;
    var post = query.substring(6);
    postID = post;    

    checkState();

    database.ref("posts/"+postID).once("value", (postToView)=>{
        var incomingPost = postToView.val();

        var username = incomingPost.username;
        var body = incomingPost.body;
            
        var timestamp = new Date(incomingPost.timestamp);
        console.log(timestamp);

        var when;
        var postedAgoText;
       
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

        document.getElementById('post-username').innerHTML = "Posted by "+ username+" "+when +" "+ postedAgoText;
        document.getElementById('body').innerHTML = body;


    });

    $('.post-comment').click(()=>{
        console.log("Starting to upload!");
        var commentToBePosted = document.getElementById('comment-box').value;
        console.log(commentToBePosted);
        console.log("We are in here.");
        database.ref("users/"+uid).on("value", (usernameToGet)=>{
            var usernameToDisplay = usernameToGet.val().name;
            var newComment = database.ref("comments/" +postID);
            newComment.push({
                user: uid,
                comment: commentToBePosted,
                username: usernameToDisplay,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(()=>{
                console.log("Done uploading!");
            })
        });
        
         
    });

    pullComments();
});

function checkState(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            console.log("Logged in!");
            uid = user.uid;
            console.log(uid);

            $('.un-authed').hide();
            $('.authed').show();
        }else{
            console.log("Not logged in");
            $('.authed').hide();
            $('.un-authed').show();
        }
    });
}
function pullComments(){
    database.ref("comments/"+postID).on("child_added", (comments)=>{

         console.log(comments.val());
         
        if(comments.val()){
            $('.present-comments-toggle').hide();

            var commentUsername = comments.val().username;
            var commentText = comments.val().comment;
            var timestamp = new Date(comments.val().timestamp);

            var when;
            var postedAgoText;
            
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

            $('.no-posts').hide();
            $(".comments-section").html(
                $('.comments-section').html()+
                '<div class=" container row original comment">'+
                '<div class="col-2 col-sm-1">'+
                    '<div class="row">'+
                        '<div class="col">'+
                            '<i class="fa fa-caret-up upvote fa-2x" ></i>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col votes-number">'+
                            
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col">'+
                            '<i class="fa fa-caret-down downvote fa-2x" ></i>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="col">'+
                    '<div class="row">'+
                        '<div class="col posted-info">'+
                            'Posted by '+ commentUsername + " "+ when+" "+ postedAgoText+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col">'+
                            commentText+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
            );
        }else{

        }
    });
}