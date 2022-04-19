import axios from "axios";

export default axios.create({
  // baseURL: 'http://localhost:8080'
  baseURL: 'https://aqueous-cliffs-95954.herokuapp.com'
});