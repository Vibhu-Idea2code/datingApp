import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CForm,
//   CRow,
//   CFormLabel,
//   CSpinner,
//   CFormInput,
// } from "@coreui/react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilEnvelopeClosed, cilLockLocked } from "@coreui/icons";

// import CustomInput from "../../components/CustomInput";
import { handleInputChange } from "../../components/formUtils";

import { toast } from "react-toastify";
import axios from "axios";
// import { handleInputChange } from "src/components/formUtils";

const changePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    setError,
    control,
    reset,
  } = useForm();
  var [isLoading, setIsLoading] = useState(false);
  var [AuthError, setAuthError] = useState();
  var [isLoading, setIsLoading] = useState(false);
  const { token, userid } = useParams();

  const navigate = useNavigate();
  var [isLoading, setIsLoading] = useState(false);
  var [AuthError, setAuthError] = useState();
  // const { token, userid } = useParams();
  var [success, setSuccess] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState("");

  const [validated, setValidated] = useState(false);
  
  const onSubmit = async (data) => {
    console.log("data", data);
    // console.log(data);
    // setIsLoading(true);
    // const response = await axios
    //   .post("http://localhost:9500/v1/admin/change-password", data)
    //   //   // resetPassword(data)
    //   .then((response) => {
    //     console.log(response.data); //check what is back response data in consloe
    //     setSuccess(response.data.info);

    //     navigate("/");
    //     reset();
    // })
    // .catch((err) => {
    //   if (err.response.data.status === 403) {
    //     setAuthError(err.response.data.message);
    //     setIsLoading(false);
    //   } else if (
    //     err.response.data.status === 401 ||
    //     !err.response.data.isSuccess
    //   ) {
    //     Object.keys(err.response.data.message).forEach((key) => {
    //       // Set the error message for each field
    //       setError(key, {
    //         type: "manual",
    //         message: err.response.data.message[key],
    //       });
    //     });
    //     setIsLoading(false);
    //   } else {
    //     setAuthError(err.response.data.message);
    //     setIsLoading(false);
    //   }
    // });
  };
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-2">
          <CCardHeader>
            <strong>Change Password</strong>
          </CCardHeader>
          {/* <CCardGroup> */}
          <CCard className="p-4">
            <CCardBody>
              <form onSubmit={handleSubmit(onSubmit())}>
                {/* <h3 className="theme-color mb-3">Change Password</h3> */}
                <div in={AuthError}>
                  <p className="error-msg">{AuthError ? AuthError : ""}</p>
                </div>
                <div in={success}>
                  <p className="success-msg">{success ? success : ""}</p>
                </div>

                <div className="mb-3">
                  <CInputGroup>
                    {/* <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText> */}
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
                          rules={{ required: "OTP is required" }}
                        />
                      )}
                    />
                  </CInputGroup>
                  {errors.otp && (
                    <div className="error-msg mb-3">{errors.otp.message}</div>
                  )}
                </div>

                {/* <div className="mb-3">
                  <CFormLabel htmlFor="validationCustom01">
                    Old Password
                  </CFormLabel>
                  <Controller
                    name="oldpass"
                    text="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: "old password is required" }}
                    render={({ field }) => (
                      <CFormInput
                        {...field}
                        placeholder="Old password"
                        autoComplete="oldpass"
                        variant="outlined"
                        rules={{ required: "old password is required" }}
                      />
                    )}
                  />
                  {errors.oldpass && (
                    <div className="error-msg mb-3">
                      {errors.oldpass.message}
                    </div>
                  )}
                </div> */}

                {/* <div className="mb-3">
                  <CFormLabel htmlFor="validationCustom02">
                    New Password
                  </CFormLabel>
                  <Controller
                    name="newpass"
                    control={control}
                    defaultValue=""
                    rules={{ required: "new password is required" }}
                    render={({ field }) => (
                      <CFormInput
                        {...field}
                        placeholder="New password"
                        autoComplete="newpass"
                        variant="outlined"
                        rules={{ required: "new password is required" }}
                      />
                    )}
                  />
                  {errors.newpass && (
                    <div className="error-msg mb-3">
                      {errors.newpass.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="validationCustom03">
                    confirm Password
                  </CFormLabel>
                  <Controller
                    name="confirmpass"
                    control={control}
                    defaultValue=""
                    rules={{ required: "confirm password is required" }}
                    render={({ field }) => (
                      <CFormInput
                        {...field}
                        placeholder="confirm password"
                        autoComplete="confirmpass"
                        variant="outlined"
                        rules={{ required: "confirm password is required" }}
                      />
                    )}
                  />
                  {errors.confirmpass && (
                    <div className="error-msg mb-3">
                      {errors.confirmpass.message}
                    </div>
                  )}
                </div> */}

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
                </CRow>
              </form>
            </CCardBody>
          </CCard>
          {/* </CCardGroup> */}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default changePassword;
