$(document).ready(()=>{
    var query = window.location.search;
    var post = query.substring(6);

    var database = firebase.database();

    database.ref("posts/"+post).once("value", (postToView)=>{
        console.log(postToView.val());
    })
});