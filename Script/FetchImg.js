img = document.getElementById('MyImg')

class FetchImg {
  constructor() {
    this.state = {
      image: "#",
    };
  }

  fetchImage = async(imageName) => {
    var storageRef = await firebase
      .storage()
      .ref()
      .child("sst/" + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({
          image: url,
        });
      })
      .catch((error) => {
        this.setState({
          image: "#",
        });
      });
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };
}

img.value= FetchImg.fetchImage(download)
