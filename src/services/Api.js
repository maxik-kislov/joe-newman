import axios from "axios";

const instance = axios.create({
  baseURL: "https://magiclab-twitter-interview.herokuapp.com/joe-newman",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default instance;
