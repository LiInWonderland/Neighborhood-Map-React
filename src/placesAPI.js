
const api= 'https://api.foursquare.com/v2'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

  const headers = {
    'Accept': 'application/json',
    'Authorization': token
  }

  export const getPlaces = ()=>
    fetch(`${api}/venues/search?ll=56.95149,24.113304&oauth_token=OTYPHYN4G4HOTOOWFBJXE0W21XRBSF4CF3YQMZIEVJTUDMEG&v=20180806`)
    .then(res => res.json())
    .then(data => data.response.venues)
