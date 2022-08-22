const fs = require('fs');
const hexToRGB = require('color-convert').hex.rgb;

const COLOR_ARRAY = JSON.parse(fs.readFileSync('./color-list.json'))

class RGB {
  constructor(r, g, b) {
    this.r = r, this.g = g, this.b = b;
  }

  distanceTo(other) {
    return Math.sqrt(
      (this.r - other.r) * (this.r - other.r) +
      (this.g - other.g) * (this.g - other.g) + 
      (this.b - other.b) * (this.b - other.b)
    );
  }

  static fromHex(hex) {
    return new RGB(...hexToRGB(hex));
  }
}

function sortByDistanceToRGB(rgb) {
  return COLOR_ARRAY.sort(function (one, two) {
    const [colorOne, colorTwo] = [RGB.fromHex(one.hex), RGB.fromHex(two.hex)]
    return rgb.distanceTo(colorOne) - rgb.distanceTo(colorTwo);
  });
}

function getClosestColorRGB(rgb) {
  return sortByDistanceToRGB(rgb)[0];
}

function getClosestColorHex(hex) {
  return getClosestColorRGB(RGB.fromHex(hex));
}

module.exports = getClosestColorHex;