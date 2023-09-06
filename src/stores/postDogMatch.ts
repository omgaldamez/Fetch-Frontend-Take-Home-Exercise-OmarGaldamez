import axios from 'axios';

export async function postDogs(selectedBreeds: string[]) {
  let resMatch = ""; 
  try {
    const res = await axios.post(
      'https://frontend-take-home-service.fetch.com/dogs/match',
      selectedBreeds,
      {
        withCredentials: true 
      }
    );

    const cookies = res.headers['set-cookie'];
    if (cookies) {
      console.log('Cookies received:', cookies);
    }
    // Log the response data if needed
    resMatch = res.data.match;
    //console.log('Response data:', resMatch);
    
    // Set resMatch to the match value if the request was successful
  } catch (error) {
    console.error(error); // Handle any errors here
  }

  return resMatch; // Return the resMatch value
}
