
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

   fetchById(id, callback) {
    // fetch all restaurants with proper error handling.
    this.fetch((err, restaurants) =>  {
      const restaurant = restaurants.find(r => r.id == id);
      if (restaurant) { // Got the restaurant
        callback(null, restaurant);
      } else { // Restaurant does not exist in the database
        callback('Restaurant does not exist', null);
      }
    } )
  }

}

const url = "/data/restaurants.json";

const test = new FetchHelper(url);

test.fetchById(5, (err, data) => console.log(data) );

