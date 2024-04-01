export const fetchVehicles = (_callback) => {
  let apiURL = "https://emjheypb.github.io/VehicleAPI_G01/vehicles.json";
  fetch(apiURL)
    .then((response) => {
      // console.log(
      //   "fetchVehicles",
      //   response.ok ? "OK" : "NOT OK",
      //   response.status
      // );
      if (response.ok) {
        return response.json();
      } else {
        _callback(null, response.status);
      }
    })
    .then((result) => {
      // console.log("fetchVehicles", result.length);
      _callback(result, null);
    })
    .catch((err) => {
      console.log("fetchVehicles", err);
      _callback(null, err);
    });
};
