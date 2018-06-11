class FetchHelper {

  constructor(url) {
    this.url = url;
  }

  fetch(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const json = JSON.parse(xhr.responseText);
        const restaurants = json.restaurants;
        callback(null, restaurants);

      } else {
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }

  filterById(id, callback) {
    this.fetch((err, restaurants) => {
      if (err) {
        callback(err, null);
      } else {

        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) {
          callback(null, restaurant);
        } else {
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  filterByCuisine(cuisine, callback) {
    this.fetch((err, restaurants) => {
      if (err) {
        callback(err, null);
      } else {
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        if (results) {

          callback(null, results);
        } else {
          
          callback('Nothing macthed', null);
        }
      }
    });
  }

  filterByNeighborhood(neighborhood, callback) {

    this.fetch((err, restaurants) => {
      if (err) {
        callback(err, null);
      } else {

        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        if (results) {

          callback(null, results);

        } else {
          callback('Nothing macthed', null);
        }
      }
    });
  }

  filterByCuisineAndNeighborhood(cuisine, neighborhood, callback) {

    this.fetch((err, restaurants) => {
      if (err) {
        callback(err, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { 
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') {
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  fetchNeighborhoods(callback) {

    this.fetch((err, restaurants) => {
      if (err) {
        callback(err, null);
      } else {
      
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)

        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  fetchCuisines(callback) {
 
    this.fetch((err, restaurants) => {
      if (err) {
        callback(err, null);
      } else { 

        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
      
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }


  imageUrlForRestaurant(restaurant) {
    return (`/img/${restaurant.photograph}`);
  }

  mapMarker(restaurant, map) {
    // https://leafletjs.com/reference-1.3.0.html#marker  
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
      {title: restaurant.name,
      alt: restaurant.name,
      url: this.urlForRestaurant(restaurant)
      })
      marker.addTo(newMap);
    return marker;
  } 


}

const url = "/data/restaurants.json";

const restaurantsJson = new FetchHelper(url);

restaurantsJson.fetch((err, data) => console.log(data));

restaurantsJson.filterById(7, (err, restaurant) => console.log(restaurant));

restaurantsJson.filterByCuisine('American', (err, restaurant) => console.log(restaurant));

restaurantsJson.filterByNeighborhood('Manhattan', (err, restaurant) => console.log(restaurant));

restaurantsJson.filterByCuisineAndNeighborhood('American', 'Manhattan', (err, restaurant) => console.log(restaurant));

restaurantsJson.fetchNeighborhoods((err, neighborhoods) => console.log(neighborhoods));

restaurantsJson.fetchCuisines((err, cuisines) => console.log(cuisines));