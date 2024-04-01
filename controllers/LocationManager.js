import * as Location from "expo-location";

export const doForwardGeocode = async (address, _callback) => {
  try {
    // 0. on android, permissions must be granted
    Location.requestForegroundPermissionsAsync()
      // 1. do geocoding setCityFromUI
      .then((result) => {
        // console.log("doForwardGeocode", result.status);
        if (result.status === "granted") {
          return Location.geocodeAsync(address);
        } else {
          throw new Error("Edit Location Permission");
        }
      })
      // 2. Check if a result is found
      .then((location) => {
        // console.log("doForwardGeocode", JSON.stringify(location));
        _callback(location[0], null);
      });
    // 3. do something with results
  } catch (err) {
    console.log(err, "doForwardGeocode");
    _callback(null, err);
  }
};
