//get elements
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");
var path = "";
var imgUrl = "";
var num
var database = firebase.database();
console.log(database)

function Science() {
  document.getElementById("Science").checked = true;
  document.getElementById("SSt").checked = false;
  document.getElementById("Maths").checked = false;
  path = "Subjects/Science/";
}
function SSt() {
  document.getElementById("Science").checked = false;
  document.getElementById("SSt").checked = true;
  document.getElementById("Maths").checked = false;
  path = "Subjects/SSt/";
}
function Maths() {
  document.getElementById("Science").checked = false;
  document.getElementById("SSt").checked = false;
  document.getElementById("Maths").checked = true;
  path = "Subjects/Maths/";
}

//Listen for file selection
fileButton.addEventListener("change", function (e) {
  if (path !== "") {

    document.getElementById("error").innerHTML =" "

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
      function (snapshot) {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },

      function error(err) {
        alert("Error in Uploding The img");
      },

      function () {

        database.ref(path+'Num').on("value", (data) => {
          num = data.val()
          console.log(num)
        }),
        
        task.snapshot.ref.getDownloadURL().then(function(url) {
          imgUrl = url;

          firebase.database().ref(path).update({
            Num: num+1,
          });
          
          firebase.database().ref(path+'items/'+num).update({
              Link: imgUrl,
            });

          
            document.getElementById("error").innerHTML ="File Uploaded Successfully";
        });
      },

      function complete() {}
    );
  } else {
    document.getElementById("error").innerHTML = "Please Enter the Subject";
  }
});
