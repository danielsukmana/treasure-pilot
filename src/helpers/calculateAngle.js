// @flow

type Coordinate = {
  lat: number,
  lon: number,
};

export default function calculateAngle(
  origin: Coordinate,
  dest: Coordinate,
): number {
  let deg = Math.atan2(dest.y - origin - y, dest.x - origin.x) * 180 / Math.PI;
  // NOTE: atan2 returns -180 ~ 180, so for negative value we + 360 to get the
  //       actual angle from 0 for the image rotational value
  return deg < 0 ? deg + 360 : deg;
}
