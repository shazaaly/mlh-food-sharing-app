import axios from "axios";
const baseUrl = "http://localhost:4000/api";
let token = null;

export function setToken(userToken) {
  token = `Bearer ${userToken}`;
}

export async function register(data) {
  const res = await axios.post(`${baseUrl}/user`, data);
  return login({ name: data.name, password: data.password });
}

export async function login(data) {
  const ress = await axios.post(`${baseUrl}/login`, data);
  setToken(ress.data.token);
  return ress.data;
}

export async function donates(data) {
  const config = { headers: { Authorization: token } };
  data = { ...data, donor: "me", isClaimed: false };

  const res = await axios.post(`${baseUrl}/donation`, data, config);
  return res.data;
}

export async function demand(data) {
  const config = { headers: { Authorization: token } };
  data = { ...data, receiver: "me", isClaimed: false };

  const res = await axios.post(`${baseUrl}/recipient`, data, config);
  return res.data;
}

export async function fetchtarget(target) {
  const res = await axios.get(`${baseUrl}/${target}`);
  return res.data;
}
