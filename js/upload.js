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
});