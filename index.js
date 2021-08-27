// const { fetchISSFlyOverTimes} = require('./iss');
const {nextISSTimesForMyLocation} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP('184.65.136.88',(error,coordinates)=>{
//    if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned coordinats:", coordinates);

// })
//  const cords={ latitude: 49.17, longitude: -122.7348 };
//  fetchISSFlyOverTimes(cords,(error,coords)=>{
//   if(error){
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned coordinats:", coords);
// })

const printPassTimes = function(passTimes) {
  console.log("passTimes",passTimes);
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error,passTimes) =>{
  if(error){
    return console.log("It didnot work!",error);
  }
  printPassTimes(passTimes);
  //  console.log(passTimes);
})