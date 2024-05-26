import axios from "axios";
// const baseURL = "http://localhost:8080";
const baseURL =
  "https://8d614e56-3885-43c8-aef4-bb60def22ab9-00-2f33rivi19atm.spock.replit.dev:8080";

export const request = axios.create({
  baseURL,
});
