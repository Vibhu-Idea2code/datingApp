import React, { useState } from "react";
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
  CFormInput,
} from "@coreui/react";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { handleInputChange } from "../../components/formUtils";
import { changePasswords } from "../../apiController";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserState } from "src/context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { toast } from "react-toastify";
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
  const { token, adminid } = useParams();

  // const{user}=

  const onSubmit = (data) => {
    setIsLoading(false);
    
    changePasswords(data)
    .then((response) => {
      console.log(response.success);
      if (response.status == 200 && response.data.success == true) {
        console.log(response.data.message)
        toast.success(response.data.message);
        setIsLoading(false);
        console.log(response);
      } else {
        if ((response.status == 400) && !response.data.success) {
          console.log(response.status)
          toast.error(response.data.message);
          setIsLoading(false);
        }
      }
    })
    .catch((err) => {
      // console.log(err,"sdfdsgdsg");
      // console.log(err.response.data.error,"DATATAATATTAT");

      toast.error(err.response.data.error);
      // if ((err.response.data.status ===  400) && !err.response.data.success) toast.error(err.response.data.message);
      // setIsLoading(false);
    });
 
  };

  return (
    <CRow>
      <CCol xs={6}>
        <ToastContainer />
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
                  {...register("oldpass", {
                    required: "Old Password is required",
                  })}
                  error={!!errors.oldpass}
                  helperText={errors.oldpass && errors.oldpass.message}
                  defaultValue={getValues("oldpass")}
                  onChange={(e) =>
                    handleInputChange("oldpass", e.target.value, {
                      clearErrors,
                      setValue,
                    })
                  }
                />
              </CCol>
              <CCol md={12} className="mb-3">
                <CustomInput
                  name="newpass"
                  type="password"
                  label="New Password"
                  {...register("newpass", {
                    required: "New Password is required",
                  })}
                  error={!!errors.newpass}
                  helperText={errors.newpass && errors.newpass.message}
                  defaultValue={getValues("newpass")}
                  onChange={(e) =>
                    handleInputChange("newpass", e.target.value, {
                      clearErrors,
                      setValue,
                    })
                  }
                />
              </CCol>

              <Controller
                name="adminid"
                control={control}
                defaultValue={adminid}
                // rules={{ required: "ID is required" }}
                render={({ field }) => <CFormInput {...field} type="hidden" />}
              />

              <CCol md={12} className="mb-3">
                <CustomInput
                  name="confirmpass"
                  id="confirmpass"
                  type="password"
                  label="Confirm Password"
                  {...register("confirmpass", {
                    required: "Confirm Password is required",
                  })}
                  error={!!errors.confirmpass}
                  helperText={errors.confirmpass && errors.confirmpass.message}
                  defaultValue={getValues("confirmpass")}
                  onChange={(e) =>
                    handleInputChange("confirmpass", e.target.value, {
                      clearErrors,
                      setValue,
                    })
                  }
                />
              </CCol>
              <CCol xs={12}>
                {isLoading ? (
                  <CSpinner className="theme-spinner-color" />
                ) : (
                  <CButton
                    color="primary"
                    type="submit"
                    className="theme-btn-background">
                    Submit
                  </CButton>
                )}
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default changePassword;
