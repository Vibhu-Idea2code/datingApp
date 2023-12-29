import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ToastContainer, toast } from "react-toastify";
import { cilEnvelopeClosed, cilLockLocked } from "@coreui/icons";
// import logo from "../../assets/images/Frame.png";

const ResetPassword = () => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  var [isLoading, setIsLoading] = useState(false);
  var [AuthError, setAuthError] = useState();
  const { token, userid } = useParams();
  var [success, setSuccess] = useState();
  const [showSuccessAlert, setShowSuccessAlert] = useState("");

  const onSubmit = async (data) => {
    try {
      // Make an API call to your login endpoint
      const response = await axios.post(
        "http://localhost:9500/v1/admin/resetPassword",
        {
          email,
          newPassword,
          confirmPassword,
        }
      );
      // Handle successful login (redirect, set authentication token, etc.)
      console.log("Reset Password successfully:", response.data);
      localStorage.setItem("token", response.data.refreshToken);
      console.log(response.data.refreshToken);
      setShowSuccessAlert(true);
      // Hide the success alert after 3 seconds (adjust the timeout as needed)
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Error resetting password",
      });
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <ToastContainer />
        <CRow className="justify-content-center">
          {/* <img
            src={logo}
            height={60}
            width={60}
            alt="logo"
            className="header-logo mb-4"
          /> */}
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="theme-color mb-3">Reset Password</h3>

                    <div in={AuthError}>
                      <p className="error-msg">{AuthError ? AuthError : ""}</p>
                    </div>
                    <div in={success}>
                      <p className="success-msg">{success ? success : ""}</p>
                    </div>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <Controller
                          name="otp"
                          control={control}
                          defaultValue=""
                          rules={{ required: "OTP is required" }}
                          render={({ field }) => (
                            <CFormInput
                              {...field}
                              placeholder="OTP"
                              autoComplete="otp"
                              variant="outlined"
                            />
                          )}
                        />
                      </CInputGroup>
                      {errors.otp && (
                        <div className="error-msg mb-3">
                          {errors.otp.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <Controller
                          name="new_password"
                          control={control}
                          defaultValue=""
                          rules={{ required: "New Password is required" }}
                          render={({ field }) => (
                            <>
                              <CFormInput
                                {...field}
                                type="password"
                                placeholder="New Password"
                                variant="outlined" // Custom prop for the outlined variant
                              />
                            </>
                          )}
                        />
                      </CInputGroup>
                      {errors.new_password && (
                        <div className="error-msg mb-2">
                          {errors.new_password.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <Controller
                          name="confirm_password"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Confirm Password is required" }}
                          render={({ field }) => (
                            <>
                              <CFormInput
                                {...field}
                                type="password"
                                placeholder="Confirm Password"
                                variant="outlined" // Custom prop for the outlined variant
                              />
                            </>
                          )}
                        />
                      </CInputGroup>
                      {errors.confirm_password && (
                        <div className="error-msg mb-2">
                          {errors.confirm_password.message}
                        </div>
                      )}
                    </div>

                    <Controller
                      name="id"
                      control={control}
                      defaultValue={userid}
                      rules={{ required: "ID is required" }}
                      render={({ field }) => (
                        <CFormInput {...field} type="hidden" />
                      )}
                    />

                    <Controller
                      name="resetCode"
                      control={control}
                      defaultValue={token}
                      rules={{ required: "Reset Code is required" }}
                      render={({ field }) => (
                        <CFormInput {...field} type="hidden" />
                      )}
                    />

                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          color=""
                          className="theme-btn-background">
                          Submit
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {" "}
                        <Link to="/">
                          <CButton color="link" className="px-0 forgot-link">
                            Back to Login?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ResetPassword;
