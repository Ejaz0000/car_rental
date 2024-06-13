import axios from 'axios';



export const getCars = async () => {
  const response = await axios.get('http://localhost:5000/api/cars');
  return response.data;
};