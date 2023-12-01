import React from "react";
import { adminLogin } from "../apiController";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
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

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, data, navigate, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  adminLogin(data)
  .then((response) => {          
      if (response.data.status === 401 || !response.data.isSuccess) {        
        setError(response.data.message);
        setIsLoading(false);
      } else {                             
          localStorage.setItem("token", response.data.info.token);          
          // localStorage.setItem("refreshToken", response.data.info.refresh_token);          
          setError("");
          setIsLoading(false);
          dispatch({ type: "LOGIN_SUCCESS" });
          navigate("/dashboard");
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