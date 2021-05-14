//get elements
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");
var path = "";
function Science() {
  document.getElementById("Science").checked = true;
  document.getElementById("SSt").checked = false;
  document.getElementById("Maths").checked = false;
  path = "Science/";
}
function SSt() {
  document.getElementById("Science").checked = false;
  document.getElementById("SSt").checked = true;
  document.getElementById("Maths").checked = false;
  path = "SSt/";
}
function Maths() {
  document.getElementById("Science").checked = false;
  document.getElementById("SSt").checked = false;
  document.getElementById("Maths").checked = true;
  path = "maths/";
}

//Listen for file selection
fileButton.addEventListener("change", function (e) {
  if (path !== "") {
    
    //Get the file
    var file = e.target.files[0];

    //Create a storage ref
    var storageRef = firebase.storage().ref(path + file.name); //own names for folder and file

    //Upload file
    var task = storageRef.put(file);
    document.getElementById("error").innerHTML = "";

    //Update prgress bar
    task.on(
      "state_changed",

      function progress(snapshort) {
        var percentage =
          (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
        uploader.value = percentage;
      },

      function error(err) {
        console.log(err);
      },

      function complete() {}
    );
  } else {
    document.getElementById("error").innerHTML = "Please Enter the Subject";
  }
});
