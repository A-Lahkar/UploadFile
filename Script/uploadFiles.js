//get elements
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");

function Science() {
  document.getElementById("Science").checked = true;
  document.getElementById("SSt").checked = false;
  document.getElementById("Maths").checked = false;
}
function SSt() {
  document.getElementById("Science").checked = false;
  document.getElementById("SSt").checked = true;
  document.getElementById("Maths").checked = false;
}
function Maths() {
  document.getElementById("Science").checked = false;
  document.getElementById("SSt").checked = false;
  document.getElementById("Maths").checked = true;
}

//Listen for file selection
fileButton.addEventListener("change", function (e) {
  //Get the file
  var file = e.target.files[0];

  //Create a storage ref
  var storageRef = firebase.storage().ref("sst/" + file.name); //own names for folder and file

  //Upload file
  var task = storageRef.put(file);

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
});
