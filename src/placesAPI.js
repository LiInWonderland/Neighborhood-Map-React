
const api= 'https://api.foursquare.com/v2/venues/search?client_id=BNGGCRPLT0QETUUADGH5KTQX4AZTR5FXKCLTBT2HTRTL1ZJW&client_secret=2J3ODAZ0HRDNSIU3H0ZTRUPADZNFPT2RDDOZVSJFBQYMTZ3T&v=20180323&'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
  export const getPlaces = ()=>
    fetch(`${api}ll=56.95149,24.113304&query=restaurant`)
    // Code for handling API response
    .then(res => res.json())
    .then(data => data.response.venues)
    .catch(function() {
        // Code for handling errors
        alert('Error loading placesAPI')
    });
