var app_firebase = {};
(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyApjxyWKnNOvb97r6yY886ySMUAffsB44o",
        authDomain: "limelight-80a7a.firebaseapp.com",
        databaseURL: "https://limelight-80a7a.firebaseio.com",
        projectId: "limelight-80a7a",
        storageBucket: "limelight-80a7a.appspot.com",
        messagingSenderId: "862188170974",
        appId: "1:862188170974:web:964c913bf8243a0212dc4f",
        measurementId: "G-JVPKYRK6ER"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    var perf = firebase.performance();

    app_firebase = firebase;
})()