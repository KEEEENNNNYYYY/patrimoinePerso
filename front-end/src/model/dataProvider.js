import axios from "axios";

const baseUrl = "https://patrimoineperso-backend.onrender.com";
const profilUrl = baseUrl+"/users";
const possessionUrl = baseUrl +"/possessions";

export var profilData = axios.get(profilUrl);
export var possessionData = axios.get(possessionUrl);

