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
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  var [isLoading, setIsLoading] = useState(false);
  var [AuthError, setAuthError] = useState();
  const { token, userid } = useParams();
  var [success, setSuccess] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState("");

  const onSubmit = async (data) => {
    // console.log(data);
    // setIsLoading(true);
    const response = await axios
      .put("http://localhost:9500/v1/admin/resetPassword", data)
      //   // resetPassword(data)
      .then((response) => {
        console.log(response.data.message); //check what is back response data in consloe
        setSuccess(response.data.message);
        navigate("/");
        reset();
      })
      .catch((err) => {
        if (err.response.data.status === 403) {
          setAuthError(err.response.data.message);
          setIsLoading(false);
        } else if (
          err.response.data.status === 401 ||
          !err.response.data.isSuccess
        ) {
          Object.keys(err.response.data.message).forEach((key) => {
            // Set the error message for each field
            setError(key, {
              type: "manual",
              message: err.response.data.message[key],
            });
          });
          setIsLoading(false);
        } else {
          setAuthError(err.response.data.message);
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <ToastContainer />
        <CRow className="justify-content-center">
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
                          name="newPassword"
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
                          name="confirmPassword"
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
