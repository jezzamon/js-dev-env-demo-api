"use strict";

var charSet = {

  aler102: { id: "aler102", name: "Aleria", gender: "female", vocation: "mage", species: "half-elf" },

  thor319: { id: "thor312", name: "Thor", gender: "male", vocation: "warrior", species: "half-orc" },

  rean831: { id: "rean831", name: "Reanna", gender: "female", vocation: "monk", species: "human" },

  gunt615: { id: "gunt615", name: "Gunther", gender: "male", vocation: "smith", species: "human" },

  ness789: { id: "ness789", name: "Nessa", gender: "female", vocation: "mage", species: "human" }

};

var charMap = new Map();
Object.keys(charSet).forEach(function (key) {
  return charMap.set(key, charSet[key]);
});

console.log(charSet);
console.log(charMap);