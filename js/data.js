// Generate the data
const getData = () => [
  { imgSrc: "../img/beatles.jpeg", id: 1, name: "beatles" },
  { imgSrc: "../img/blink182.jpeg", id: 2, name: "blink 182" },
  { imgSrc: "../img/fkatwigs.jpeg", id: 3, name: "fka twigs" },
  { imgSrc: "../img/fleetwood.jpeg", id: 4, name: "fleetwood" },
  { imgSrc: "../img/joy-division.jpeg", id: 5, name: "joy division" },
  { imgSrc: "../img/ledzep.jpeg", id: 6, name: "lep zeppelin" },
  { imgSrc: "../img/metallica.jpeg", id: 7, name: "metallica" },
  { imgSrc: "../img/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
  { imgSrc: "../img/beatles.jpeg", id: 9, name: "beatles" },
  { imgSrc: "../img/blink182.jpeg", id: 10, name: "blink 182" },
  { imgSrc: "../img/fkatwigs.jpeg", id: 11, name: "fka twigs" },
  { imgSrc: "../img/fleetwood.jpeg", id: 12, name: "fleetwood" },
  { imgSrc: "../img/joy-division.jpeg", id: 13, name: "joy division" },
  { imgSrc: "../img/ledzep.jpeg", id: 14, name: "lep zeppelin" },
  { imgSrc: "../img/metallica.jpeg", id: 15, name: "metallica" },
  { imgSrc: "../img/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
];

// Randomize the cards for us
const randomizedData = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};
