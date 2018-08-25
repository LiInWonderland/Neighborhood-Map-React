
const api= 'https://api.foursquare.com/v2/venues/search?'
const clientID = 'BNGGCRPLT0QETUUADGH5KTQX4AZTR5FXKCLTBT2HTRTL1ZJW';
const clientSecret = '2J3ODAZ0HRDNSIU3H0ZTRUPADZNFPT2RDDOZVSJFBQYMTZ3T';
const version = '20180323';
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

function handleApiErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
    return res;
}
// get all places
  export const getPlaces = (locationLat, locationLng)=>{
    const placeLocationLat = locationLat
    const placeLocationLng = locationLng
    const locationUrl = `${api}client_id=${clientID}&client_secret=${clientSecret}&v=${version}&ll=${placeLocationLat},${placeLocationLng}&query=restaurant`
      return fetch(locationUrl)
      // Code for handling API response
      .then(handleApiErrors)
      .then(res => res.json())
      .then(data => data.response.venues)
  }
  // get location details for specific location ID
  const apiDetails = 'https://api.foursquare.com/v2/venues/';

  export const getPlacesDetails = (place)=>{
    console.log('sak meklet')
  const locationDetails = place
      console.log('api locations:', place)
  const pagaiduUrl = `${apiDetails}${locationDetails}?&oauth_token=OTYPHYN4G4HOTOOWFBJXE0W21XRBSF4CF3YQMZIEVJTUDMEG&v=${version}`
    return fetch(pagaiduUrl)
    .then(res => res.json())
    .then(data => data.response.venue)
  }
