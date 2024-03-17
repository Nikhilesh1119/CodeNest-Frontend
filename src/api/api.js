import axios from "axios";

export const KEY_ACCESS_TOKEN = "access_token";
export const baseURL = "http://localhost:4000/api";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  KEY_ACCESS_TOKEN
)}`;

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;
  if (data.status === "ok") {
    return data;
  }

  const originalReq = response.config;
  const statusCode = data.statusCode;
  const err = data.message;

  if (statusCode === 401 && !originalReq._retry) {
    //access token has expired
    originalReq._retry = true;
    const response = await axios
      .create({ withCredentials: true })
      .get(`${baseURL}/user/refresh`);
    // console.log(res);
    if (response.data.status === "ok") {
      localStorage.setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      originalReq.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;
      return axios(originalReq);
    } else {
      localStorage.removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      return Promise.reject(err);
    }
  }
  return Promise.reject(err);
});

export async function register(data) {
  return await axios.post(`${baseURL}/user/register`, data);
}

export async function login(data) {
  return await axios.post(`${baseURL}/user/login`, data);
}

export async function gettag() {
  return await axios.get(`${baseURL}/tag/gettag`);
}

export async function addquestion(data) {
  return await axios.post(`${baseURL}/question/addquestion`, data);
}

export async function getvotes() {
  return await axios.get(`${baseURL}/question/getallvotes`);
}

export async function getAllQuestions() {
  return await axios.get(`${baseURL}/question/getquestions`);
}

export async function questionById(id) {
  return await axios.get(`${baseURL}/question/getquestion/${id}`);
}

export async function updatequestion(data) {
  return await axios.put(`${baseURL}/question/updatequestion/${data.id}`, data);
}

export async function queupvote(id, user) {
  return await axios.put(`${baseURL}/question/upvote/${id}`, user);
}

export async function quedownvote(id, user) {
  return await axios.put(`${baseURL}/question/downvote/${id}`, user);
}

export async function getUserVotes(id) {
  return await axios.get(`${baseURL}/question/getuservotes/${id}`);
}

export async function getuserquestions(name) {
  return await axios.get(`${baseURL}/question/getquestionbyname/${name}`);
}

export async function deletequestion(id) {
  return await axios.delete(`${baseURL}/question/deletequestion/${id}`);
}

export async function getuserfilteredquestions(data) {
  return await axios.post(`${baseURL}/question/getfiltereduserquestions`, data);
}

export async function points(name) {
  return await axios.get(`${baseURL}/answer/points/${name}`);
}

export async function findNumberOfAns() {
  return await axios.get(`${baseURL}/answer/totalanswer`);
}

export async function getansvotes() {
  return await axios.get(`${baseURL}/answer/getvotes`);
}

export async function ansupvote(id, user) {
  return await axios.put(`${baseURL}/answer/upvote/${id}`, user);
}

export async function ansdownvote(id, user) {
  return await axios.put(`${baseURL}/answer/downvote/${id}`, user);
}

export async function addAnswer(data) {
  return await axios.post(`${baseURL}/answer/addanswer/${data.id}`, data);
}

export async function getAnswer(id) {
  return await axios.get(`${baseURL}/answer/getanswer/${id}`);
}

export async function getUserAnswerVotes(name) {
  return await axios.get(`${baseURL}/answer/getuseransvotes/${name}`);
}

export async function deleteanswer(id) {
  return await axios.delete(`${baseURL}/answer/deleteanswer/${id}`);
}

export async function getuseranswer(name) {
  return await axios.get(`${baseURL}/answer/useranswer/${name}`);
}

export async function getuserfilteredanswer(data) {
  return await axios.post(`${baseURL}/answer/userfilteredanswer`, data);
}

export async function addcomment(data) {
  return await axios.post(`${baseURL}/comment/addcomment/${data.id}`, data);
}

export async function getcomment(id) {
  return await axios.get(`${baseURL}/comment/getcomment/${id}`);
}
