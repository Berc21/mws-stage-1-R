
class FetchHelper {

  constructor(url) {
    this.url = url;
  }

  fetch(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.url);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const restaurants = json.restaurants;
        callback(null, restaurants );
       
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }

}


