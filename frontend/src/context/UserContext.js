import React from "react";
import PropTypes from "prop-types";
import { adminLogin } from "../apiController";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  console.log("🚀 ~ file: UserContext.js:9 ~ userReducer ~ action:", action);
  console.log("🚀 ++++++++++++++++++ state:", state);
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
  });
  // console.log("🚀 state:", state);

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
  // console.log("🚀 ~ useContext:", React.useContext);
  // console.log("🚀 ~ UserStateContext:", UserStateContext);
  // console.log("useUserState", context);
  if (context === undefined) {
    throw  new Error("useUserState must be used within a UserProvider");
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
  // setError(false);
  setIsLoading(true);
  adminLogin(data)
    .then((response) => {
      if (response.data.status === 401 || !response.data.isSuccess) {
        setError(response.data.message);
        setIsLoading(false);
      } else {
        localStorage.setItem("token", response.data.info.token);
        // localStorage.setItem("refreshToken", response.data.info.refresh_token);
        // setError("");
        setIsLoading(false);
        dispatch({ type: "LOGIN_SUCCESS" });
        // navigate("/dashboard");
      }
    })
    .catch((err) => {
      if (err.response.data.status === 401 || !err.response.data.isSuccess) {
        setError(err.response.data.message);
        setIsLoading(false);
      } else {
        setError("Something is wrong!");
        setIsLoading(false);
      }
    });
}

function signOut(dispatch, navigate) {
  localStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  navigate("/");
}
