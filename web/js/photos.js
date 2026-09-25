// photos.js — photographic room images, which replace the drawn scenes
// room by room as they are added. Files live in web/photos/.
//
// PHOTOS[caseId][roomId] = {
//   src: 'photos/<file>.jpg', w, h,        // the image and its pixel size
//   items:  { itemId:    [x, y, w, h] },   // click areas, in image pixels
//   people: { suspectId: [x, y, w, h] },
// }
// A room with no entry here keeps its drawn (SVG) scene.

export const PHOTOS = {
  'blackwood-1926': {},
  'alpine-express-1932': {},
  'greymoor-1899': {},
  'gull-rock-1938': {},
};
