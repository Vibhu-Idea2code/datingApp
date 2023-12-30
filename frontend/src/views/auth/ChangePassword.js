import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CFormLabel,
  CSpinner,
} from '@coreui/react'
import { useForm, Controller } from 'react-hook-form'
import CustomInput from '../../components/CustomInput'
import { handleInputChange } from '../../components/formUtils'
import { changePassword } from '../../apiController'
import { toast } from 'react-toastify';
import axios from "axios";
const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    setError,
    reset,
  } = useForm()
  var [isLoading, setIsLoading] = useState(false)
  var [AuthError, setAuthError] = useState();
  var [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    // console.log(data);
    // setIsLoading(true);
    const response = await axios
      .post("http://localhost:9500/v1/admin/change-password", data)
      //   // resetPassword(data)
      .then((response) => {
        console.log(response.data.message); //check what is back response data in consloe
        setSuccess(response.data.info);
        
        navigate("/");
        reset();
      })
      .catch((err) => {
        // if (err.response.data.status === 403) {
        //   setAuthError(err.response.data.message);
        //   setIsLoading(false);
        // } else if (
        //   err.response.data.status === 401 ||
        //   !err.response.data.isSuccess
        // ) {
        //   Object.keys(err.response.data.message).forEach((key) => {
        //     // Set the error message for each field
        //     setError(key, {
        //       type: "manual",
        //       message: err.response.data.message[key],
        //     });
        //   });
        //   setIsLoading(false);
        // } else {
        //   setAuthError(err.response.data.message);
        //   setIsLoading(false);
        // }
      });
  };
  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Change Password</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CCol md={12} className="mb-3">
                <CustomInput
                  name="oldpass"
                  type="password"
                  label="Old Password"
                  {...register('oldpass', { required: 'Old Password is required' })}
                  error={!!errors.oldpass}
                  helperText={errors.oldpass && errors.oldpass.message}
                  defaultValue={getValues('oldpass')}
                  onChange={(e) =>
                    handleInputChange('oldpass', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>
              <CCol md={12} className="mb-3">
                <CustomInput
                  name="newpass"
                  type="text"
                  label="New Password"
                  {...register('newpass', { required: 'New Password is required' })}
                  error={!!errors.newpass}
                  helperText={errors.newpass && errors.newpass.message}
                  defaultValue={getValues('newpass')}
                  onChange={(e) =>
                    handleInputChange('newpass', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>
              <CCol md={12} className="mb-3">
                <CustomInput
                  name="confirmpass"
                  id="confirmpass"
                  type="text"
                  label="Confirm Password"
                  {...register('confirmpass', { required: 'Confirm Password is required' })}
                  error={!!errors.confirmpass}
                  helperText={errors.confirmpass && errors.confirmpass.message}
                  defaultValue={getValues('confirmpass')}
                  onChange={(e) =>
                    handleInputChange('confirmpass', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>
              <CCol xs={12}>
                {isLoading ? (
                  <CSpinner className="theme-spinner-color" />
                ) : (
                  <CButton color="primary" type="submit" className="theme-btn-background">
                    Submit
                  </CButton>
                )}
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile