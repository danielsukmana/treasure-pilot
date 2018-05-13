// @flow

// NOTE: distance calculation was created by Movable Type https://www.movable-type.co.uk/scripts/latlong.html

type Coordinate = {
  lat: number,
  lon: number,
};

export default function calculateDistance(
  coord1: Coordinate,
  coord2: Coordinate,
): number {
  let toRadians = (val) => val * Math.PI / 180;
  let {lat: lat1, lon: lon1} = coord1;
  let {lat: lat2, lon: lon2} = coord2;
  let R = 6371e3; // metres
  let dLat = toRadians(lat2 - lat1);
  let dLon = toRadians(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
}
