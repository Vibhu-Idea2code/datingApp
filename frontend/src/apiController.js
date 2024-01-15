import axios from "axios";

const mainUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9500"
    : "http://167.71.227.102:9500";

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 402 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         const response = await axios.post(`${mainUrl}/v1/admin/refreshToken`, { refreshToken });
//         const token = response.data.refreshToken;
//         console.log(response.data.refreshToken);
//         localStorage.setItem("token", token);
//         // Retry the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
//         // console.log(originalRequest);
//         return axios(originalRequest);
//       } catch (error) {
//         // Handle refresh token error or redirect to login
//       }
//     }

//     if (error.response.status === 405) {
//       localStorage.removeItem("token");
//       window.location.reload();
//     }

//     return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(
  // console.log("dhgfdhfh")
  (response) => response,
  async (error) => {
    console.log(error);
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${mainUrl}/v1/admin/refreshToken`, {
          refreshToken,
        });
        const token = response.data.refreshToken;
        console.log(
          response.data.refreshToken,
          "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
        );
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
export const adminLogin = (data) =>
  axios.post(`${mainUrl}/v1/admin/login`, data);
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
export const changePasswords = (data) =>
  axios.post(`http://localhost:9500/v1/admin/change-password`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
    },
  });

//Update Admin Profile
// export const UpdateProfile = (id) =>
//   axios.put(`${mainUrl}/v1/admin/update/${id}`,
//   //  {
//   //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   // }
//   );

//Update Admin Profile
export const updateUserStatus = (data, id) =>
  axios.put(
    `${mainUrl}/v1/admin/updateUserStatus/${id}`,
    data
    //  {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // }
  );

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
  return axios.delete(`${mainUrl}/v1/admin/deleteMultiUser`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { Ids: data },
  });
};

// export const deleteMultiUser = (data) => {
//   return axios.delete(`${mainUrl}/admin/user/deleteMultiUser`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//     data: { Ids: data }
//   });
// };
//Add User Profile
export const addUser = (data) =>
  axios.post(
    `${mainUrl}/admin/user/addUser`,
    data
    //  {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}`
    // }
    // }
  );

//Update Admin Profile
export const UpdateProfile = (data) =>
  axios.put(`${mainUrl}/v1/admin/update`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

/* ------------------------------- SEXUAL ORIENTATION PART ------------------------------ */
//Update sexual  Status
export const updateSexualStatus = (data, id) =>
  axios.put(
    `${mainUrl}/v1/sexual/updateSexualOrientationStatus/${id}`,
    data
    //  {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // }
  );

// delete multiple Users
export const deleteMultiSexualOrientation = (data) => {
  return axios.delete(`${mainUrl}/v1/sexual/delete-many`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { id: data },
  });
};

/* ------------------------------- INTEREST PART ------------------------------ */
//Update sexual  Status
export const updateInterestStatus = (data, id) =>
  axios.put(
    `${mainUrl}/v1/interest/updateInterestStatus/${id}`,
    data
    //  {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // }
  );

// delete multiple Users
export const deleteMultiInterest = (data) => {
  return axios.delete(`${mainUrl}/v1/interest/deleteMultiInterest`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { Ids: data },
  });
};

/* ------------------------------- Pet PART ------------------------------ */
//Update sexual  Status
export const updatePetStatus = (data, id) =>
  axios.put(
    `${mainUrl}/v1/pet/updatePetStatus/${id}`,
    data
    //  {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // }
  );

// delete multiple Users
export const deleteMultiPet = (data) => {
  return axios.delete(`${mainUrl}/v1/pet/delete-many`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { id: data },
  });
};

/* ------------------------------- zodiac sign PART ------------------------------ */
//Update sexual  Status
export const updateZodiacSignStatus = (data, id) =>
  axios.put(
    `${mainUrl}/v1/sign/updateSignStatus/${id}`,
    data
    //  {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // }
  );

// delete multiple Users
export const deleteMultiZodiacSign = (data) => {
  return axios.delete(`${mainUrl}/v1/sign/delete-many`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { id: data },
  });
};

/* ------------------------------ NOTIFICATION ------------------------------ */

export const notification = (data) =>
axios.get(`${mainUrl}/v1/notification/list`, data);

export const updateNotificationStatus = (data, id) =>
  axios.put(
    `${mainUrl}/v1/notification/update/${id}`,
    data
    //  {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // }
  );

  // export const updateNotificationStatus = (data, id) =>
  // axios.put(
  //   `${mainUrl}/v1/notification/update/${id}`,
  //   data
  //   //  {
  //   //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //   // }
  // );

  // delete multiple Users
export const deleteMultiNotification = (data) => {
  return axios.delete(`${mainUrl}/v1/notification/delete-many`,
   {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { id: data },
  }
  );
};

//Delete Single User
export const deleteNotification = (id) =>
  axios.delete(`${mainUrl}/v1/notification/delete/${id}`, 
  // {
  //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  // }
  );
