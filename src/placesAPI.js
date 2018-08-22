
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
    console.log('sak meklet')
  const locationDetails = location
      console.log('api locations:', location)
  const pagaiduUrl = `${apiDetails}${locationDetails}?&oauth_token=OTYPHYN4G4HOTOOWFBJXE0W21XRBSF4CF3YQMZIEVJTUDMEG&v=${version}`
    return fetch(pagaiduUrl)
    .then(res => res.json())
    .then(data => data.response.venue)
  }
