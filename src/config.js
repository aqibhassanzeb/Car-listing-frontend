import axios from "axios";

// base url 

export const apiURL= axios.create({
  baseURL: "http://localhost:3333/api/v1/"
});

