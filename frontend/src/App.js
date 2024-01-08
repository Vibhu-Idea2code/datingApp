import React, { Component, Suspense } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./scss/style.scss";
import { useUserState } from "./context/UserContext";
import LoginLayout from "./layout/LoginLayout";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
// const LoginLayout = React.lazy(() => import("./layout/LoginLayout"));
const AdminLogin = React.lazy(() => import("./views/auth/AdminLogin"));
const ForgotPassword = React.lazy(() => import("./views/auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./views/auth/ResetPassword"));

// Pages
// const Register = React.lazy(() => import("./views/auth/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  const { isAuthenticated } = useUserState();

  const PublicRoute = () => {
    return isAuthenticated || Boolean(localStorage.getItem("token")) ? (
      <Navigate to="/dashboard" />
    ) : (
      <LoginLayout />  
    );
  };

  const PrivateRoute = () => {
    return isAuthenticated || Boolean(localStorage.getItem("token")) ? (
      <DefaultLayout />
    ) : (
      <Navigate to="/" />
    );
  };
  // render() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<AdminLogin />} />

            <Route
              exact
              path="/forgot-password"
              name="Forgot Password Page"
              element={<ForgotPassword />}
            />
            <Route
              path="reset-password/:token/:userid"
              name="Reset Password Page"
              element={<ResetPassword />}
            />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
// <BrowserRouter>
//   <Suspense fallback={loading}>
//     <Routes>
//       <Route exact path="*" name="Home" element={<DefaultLayout />} />

//       <Route exact path="/404" name="Page 404" element={<Page404 />} />
//       <Route exact path="/500" name="Page 500" element={<Page500 />} />
//       <Route path="/" name="Login Page" element={<AdminLogin />} />
//       <Route path="/register" name="Login Page" element={<Register />} />
//       <Route
//         path="/forgot-password"
//         name="Login Page"
//         element={<ForgotPassword />}
//       />
//       <Route
//         path="/reset-password/:token/:userid"
//         name="Login Page"
//         element={<ResetPassword />}
//       />
//     </Routes>
//   </Suspense>
// </BrowserRouter>

// const App = () => {
//   const { isAuthenticated } = useUserState();

//   const PublicRoute = () => {
//     return isAuthenticated || Boolean(localStorage.getItem("token")) ? (
//       <Navigate to="/dashboard" />
//     ) : (
//       <LoginLayout />
//     );
//   };

//   const PrivateRoute = () => {
//     return isAuthenticated || Boolean(localStorage.getItem("token")) ? (
//       <DefaultLayout />
//     ) : (
//       <Navigate to="/" />
//     );
//   };
//   return (
//     <BrowserRouter>
//       <Suspense fallback={loading}>
//         <Routes>
//           <Route path="/" element={<PublicRoute />}>
//             <Route exact path="/" index element={<AdminLogin />} />
//             <Route
//               exact
//               path="/register"
//               name="Register Page"
//               element={<Register />}
//             />
//             <Route
//               exact
//               path="/forgot-password"
//               name="Forgot Password Page"
//               element={<ForgotPassword />}
//             />
//             <Route
//               path="reset-password/:token/:userid"
//               name="Reset Password Page"
//               element={<ResetPassword />}
//             />
//           </Route>

//           <Route path="/" element={<PrivateRoute />}>
//             <Route path="*" name="Home" element={<DefaultLayout />} />
//           </Route>
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// };

export default App;
