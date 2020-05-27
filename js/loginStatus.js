window.onload = ()=>{
    checkStatus();
  }

  function checkStatus(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("User logged in.");
        console.log(user);
        // ...
        
      } else {
        // User is signed out.
        //User is not logged in.
      
      }
    });
  }