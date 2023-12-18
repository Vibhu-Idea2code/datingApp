import axios from "axios";

const mainUrl = process.env.NODE_ENV === "http://localhost:8500/v1/";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("token");
        // const response = await axios.post(`${mainUrl}/token/create-token`, { refreshToken });
        // const token = response.data.info;
        // console.log(response.data.info);
        localStorage.setItem("token", token);
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        // console.log(originalRequest);
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    if (error.response.status === 405) {
      localStorage.removeItem("token");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export const adminLogin = (data) => axios.post(`${mainUrl}/admin/login`, data);
export const adminRegister = (data) =>
  axios.post(`${mainUrl}/admin/forgot`, data);

export const checkmailid = (data) =>
  axios.post(`${mainUrl}/admin/verifyotp`, data);

export const resetPassword = (data) =>
  axios.put(`${mainUrl}/admin/resetPassword`, data);

// Get admin details
export const adminDetails = () =>
  axios.get(`${mainUrl}/admin/list`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

// export const adminCreateUserDetails = () =>
//   axios.post(`${mainUrl}/admin/create-user`, {
//     // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   });
// http://localhost:8500/v1/
// Get admin profile
export const changePassword = (data) =>
  axios.post(`${mainUrl}/admin/change-password/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

//Update Admin Profile
export const UpdateProfile = (data) =>
  axios.post(`${mainUrl}admin/update/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

//Get All users
export const allUsers = (data) =>
  axios.get(`${mainUrl}admin/user-list`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

//Delete Single User
export const deleteUser = (id) =>
  axios.post(`${mainUrl}/admin/user/deleteUser/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

// delete multiple Users
export const deleteMultiUser = (data) => {
  return axios.delete(`${mainUrl}/admin/user/deleteMultiUser`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { Ids: data },
  });
};
