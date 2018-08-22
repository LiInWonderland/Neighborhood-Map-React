
const api= 'https://api.foursquare.com/v2/venues/search?'
const clientID = 'BNGGCRPLT0QETUUADGH5KTQX4AZTR5FXKCLTBT2HTRTL1ZJW';
const clientSecret = '2J3ODAZ0HRDNSIU3H0ZTRUPADZNFPT2RDDOZVSJFBQYMTZ3T';
const version = '20180323';
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
// get all places
  export const getPlaces = ()=>
    fetch(`${api}client_id=${clientID}&client_secret=${clientSecret}&v=${version}&ll=56.95149,24.113304&query=restaurant`)
    // Code for handling API response
    .then(res => res.json())
    .then(data => data.response.venues)

  // get location details for specific location ID
  const apiDetails = 'https://api.foursquare.com/v2/venues/';

  export const getPlacesDetails = (location)=>{
  const locationDetails = location
  const locationDetailUrl = `${apiDetails}${locationDetails}?client_id=${clientID}&client_secret=${clientSecret}&v=${version}`
    return fetch(locationDetailUrl)
    .then(res => res.json())
    .then(data => data.response.venue)
  }
