import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm,Controller } from "react-hook-form";
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
import { cilEnvelopeClosed, cilLockLocked, cilUser } from "@coreui/icons";
import { ToastContainer, toast } from 'react-toastify'




const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  var [isLoading, setIsLoading] = useState(false)
  var [success, setSuccess] = useState()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:9500/v1/admin/forgot",
        {
       email: data.email,
        }
      );

      console.log("Forgot Password successfully:", response.data);
      setShowSuccessAlert(true);
      setIsLoading(false)
      setSuccess('Check your mail box.')
      // toast.success(response.data.message)

      setTimeout(() => {
        setShowSuccessAlert(false);
        // navigate("/reset-password");
      }, 1000);
    } catch (err) {
      setError("email", {
        type: "manual",
        message: "Invalid email address",
      });
      console.error("Forgot Password error:", err);
    }
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
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                  <h3 className="theme-color mb-3">Forgot Password</h3>

                    <div in={success}>
                      <p className="success-msg">{success ? success : ''}</p>
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilEnvelopeClosed} />
                        </CInputGroupText>
                        <Controller
                          name="email"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Email is required" }}
                          render={({ field }) => (
                            <>
                              <CFormInput
                                {...field}
                                placeholder="Email"
                                autoComplete="email"
                                variant="outlined"
                              />
                            </>
                          )}
                        />
                      </CInputGroup>
                      {errors.email && (
                        <div className="error-msg mb-3">
                          {errors.email.message}
                        </div>
                      )}
                    </CInputGroup>
                    {/* <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <Controller
                          name="password"
                          control={control}
                          defaultValue=""
                          rules={{ required: 'Password is required' }}
                          render={({ field }) => (
                            <>
                              <CFormInput
                                {...field}
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                variant="outlined" // Custom prop for the outlined variant
                              />
                            </>
                          )}
                        />
                      </CInputGroup>
                      {errors.password && (
                        <div className="error-msg mb-2">{errors.password.message}</div>
                      )} */}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Submit
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {' '}
                        <CButton color="link" className="px-0 forgot-link">
                            Back to Login?
                          </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AdminLogin;
