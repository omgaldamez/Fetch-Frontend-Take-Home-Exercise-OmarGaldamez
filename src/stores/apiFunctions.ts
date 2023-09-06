import axios from 'axios';

export const tryGet = (selectedBreed: string, size = 50) => {
  return axios
    .get(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${selectedBreed}&size=${size}`, {
      withCredentials: true
    })
    .then((res) => {
      // Process the response as needed
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error; // Re-throw the error to handle it in the component
    });
};

export const postDogs = async (dogsId: string) => {
  return axios
    .post('https://frontend-take-home-service.fetch.com/dogs', dogsId, {
      withCredentials: true
    })
    .then((res) => {
      // Process the response as needed
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error; 
    });
};
