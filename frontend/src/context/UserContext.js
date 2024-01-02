import React from "react";
import PropTypes from "prop-types";
import { adminLogin, adminRegister } from "../apiController";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  // console.log(action," login___________________")
  // console.log(state," login___________________")

  // console.log()
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false, user: null };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
    // console.log(state)
   
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null, // Set the default userRole here
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  // console.log(context);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

// Add propTypes validation
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, data, navigate, setIsLoading, setError) {
  console.log(data)
  // setError(false)
  setIsLoading(true);
  adminLogin(data)
    .then((response) => {
      console.log(response.data.data);
      if (response.data.error)  {
        // setError(response.data.message)
        setIsLoading(false);
      } else {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        // localStorage.setItem("role", response.data.info.admin.role);
          console.log(response.data.baseUrl);
        const userObject = {
          username: response.data.data.admin_name,
          useremail: response.data.data.email,
          userimage: response.data.data.admin_image
            ? response.data.baseUrl + response.data.data.admin_image
            : null,
          };
          // console.log(userObject.username,"dfhfghfhg")
          localStorage.setItem("user", JSON.stringify(userObject));

          setIsLoading(false);
          dispatch(
            {
              type: "LOGIN_SUCCESS",
              payload: {  user: userObject },
              
            }
            );
            navigate("/dashboard");
      }
    })
    .catch((err) => {
      if (err.response) {
        // setError(err.response.data.message)

        // Iterate through the error object to extract keys and values
        Object.keys(err.response.data.message).forEach((key) => {
          // Set the error message for each field
          setError(key, {
            type: "manual",
            message: err.response.data.message[key],
          });
        });

        setIsLoading(false);
      } else {
        // setError('Something is wrong!')
        setIsLoading(false);
      }
    });
}

function signOut(dispatch, navigate) {
  localStorage.removeItem("token");
  // localStorage.removeItem("role");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("redirectMessage");
  localStorage.removeItem("user");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  navigate("/");
}
