const request = require('request-promise-native');

const fetchMyIP = function(){
  return request('https://api.ipify.org?format=json');
}
// module.exports = {fetchMyIP};

/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip =JSON.parse(body).ip
  return request(`https://freegeoip.app/json/${ip}`);
};

// module.exports = { fetchMyIP, fetchCoordsByIP };
const fetchISSFlyOverTimes = function(body) {
  console.log("json data",JSON.parse(body));
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};
module.exports = { nextISSTimesForMyLocation };