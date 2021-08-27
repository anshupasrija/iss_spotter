const request = require("request");
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    // console.log("data",data);
    if (error) {
      callback(error, null);
      return;
    } if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    return  callback(null, { latitude, longitude });
  });
};
module.exports = { fetchCoordsByIP};



/**
* Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
* Input:
*   - An object with keys `latitude` and `longitude`
*   - A callback (to pass back an error or the array of resulting data)
* Returns (via Callback):
*   - An error, if any (nullable)
*   - The fly over times as an array of objects (null if error). Example:
*     [ { risetime: 134564234, duration: 600 }, ... ]
*/
const fetchISSFlyOverTimes = function(coords, callback) {
 // ...
 request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,(error,response,body) =>{
  if (error) {
    callback(error, null);
    return;
  }
  if (response.statusCode !== 200) {
    callback(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`, null);
    return;
  }
  const passes = JSON.parse(body).response;

   console.log("these are passess",passes);
  callback(null, passes);
 });
};

module.exports ={fetchISSFlyOverTimes};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((err,ip)=>{
    if(!err){
      fetchCoordsByIP(ip,(err,coords)=>{
        if(!err){ console.log("cords",coords);
          fetchISSFlyOverTimes(coords,(err,passes)=>{
            if(!err){
              
              return callback(null,passes);
            }
            return callback(err);
          })
        } 
        return callback(err);
      })
    }
    return callback(err);
  });
}
module.exports= {nextISSTimesForMyLocation}



