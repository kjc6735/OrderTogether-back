import axios from 'axios';

// export const googleMaps = axios.create({
//   baseURL: `${process.env.GEOLOCATION_API_URL}`,
//   // baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
// });

export const changeAddressToCoordinate = async (address_ko) => {
  console.log(address_ko);
  const result = await axios.get(`${process.env.GEOLOCATION_API_URL}`, {
    params: {
      address: address_ko,
      key: process.env.GEOLOCATION_API_KEY,
    },
  });
  return result.data;
};
