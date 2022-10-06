const address = [
  '창조관',
  '예술관',
  '동악관',
  '미래관',
  '학술관',
  '치악관',
  '본관',
  '영서관',
];

const prefix = {
  addressKo: `원주 우산동 상지대학교`,
  addressEn: `원주 우산동 상지대학교`,
};

function random(length) {
  return Math.floor(Math.random() * length);
}

export function randomAddress() {
  return `${prefix.addressKo} ${address[random(address.length)]}`;
}
