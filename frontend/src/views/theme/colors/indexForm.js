/* -------------- IN ADMIN PANNEL, ADMIN CAN USER ADD WITH API -------------- */

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
// import { adm inCreateUserDetails } from "../../../apiController";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormLabel,
  CFormInput,
  CInputGroup,
  CFormCheck,
  CFormSelect,
  CMultiSelect,
} from "@coreui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const IndexForm = () => {
  /* ------------------------------- State areas ------------------------------ */
  const { state } = useLocation();
  // var [defaultLoading, setdefaultLoading] = useState(true);
  var [isLoading, setIsLoading] = useState(false);
  // const { setValue } = useForm();
  const [isupdate, setisupdate] = useState("");
  // const [data, setdata] = useState({});
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  /* ------------------------ REACT-HOOK-FORM (LIBRARY) DECLARE ----------------------- */
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  /* --------------------- IMAGE UPLOAD AT ONCHANGE EVENT --------------------- */

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file, "e.target.files&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  //   const reader = new FileReader();
  //   console.log(reader, "file-reader******************************");

  //   reader.onloadend = () => {
  //     setImg(reader.result);
  //     console.log(setImg(reader.result), "setimg)))))))))))))))))))))))))))))");
  //   };

  //   reader.readAsDataURL(file);
  // };
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  /* --------------------- FUNCTIONALITY  ON SUBMIT BUTTON WITH POST API -------------------- */
  const onSubmit = async (data) => {
    try {
      // console.log(data.user_img[0]);
      // setIsLoading(false);
      let formData = new FormData(); //formdata object
      console.log(formData);
      Object.keys(data).forEach(function (key) {
        if (key === "user_img") {
          formData.append(key, data[key]);
        } else if (Array.isArray(data[key])) {
          data[key].forEach((value) => {
            formData.append(key, value);
          });
        } else {
          formData.append(key, data[key]);
        }
      });
      await axios.post("http://localhost:9500/v1/admin/create-user", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    /* -------------------------- USING USE EFFECT FROM ------------------------- */
    <div>
      {/* {isLoading ? ( */}
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              {/* FOR FIRST NAME --------------------------------*/}
              <CCol md={4}>
                <CFormLabel htmlFor="first_name">First Name</CFormLabel>
                <CFormInput
                  type="text"
                  name="first_name"
                  {...register("first_name", {
                    required: "This field is required",
                  })}
                  invalid={!!errors.first_name}
                />
                <CFormFeedback invalid>Please Enter First Name</CFormFeedback>
              </CCol>

              {/* FOR LAST NAME --------------------------------*/}
              <CCol md={4}>
                <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
                <CFormInput
                  type="text"
                  name="last_name"
                  id="last_name"
                  // onChange={handleOnChange}
                  {...register("last_name", {
                    required: "This field is required",
                  })}
                  invalid={!!errors.last_name}
                />
                <CFormFeedback invalid>Please Enter Last Name</CFormFeedback>
              </CCol>

              {/* FOR EMAIL--------------------------------*/}
              <CCol md={4}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="text"
                  id="email"
                  {...register("email", {
                    required: "This field is required",
                  })}
                  invalid={!!errors.email}
                />
                <CFormFeedback invalid>Please Enter Last Name</CFormFeedback>
              </CCol>

              {/* FOR PHONE NUMBER--------------------------------*/}
              <CCol md={4}>
                <CFormLabel htmlFor="phoneNumber">phoneNumber</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: "This field is required",
                    })}
                    invalid={!!errors.phoneNumber}
                  />
                  <CFormFeedback invalid>
                    Please enter a phone number
                  </CFormFeedback>
                </CInputGroup>
              </CCol>

              {/* FOR IMAGE --------------------------------*/}
              <CCol md={4}>
                <div className="mb-3">
                  <CFormLabel htmlFor="formFile">add you image</CFormLabel>
                  <Controller
                    name="user_img"
                    accept="image/*"
                    control={control}
                    // onMouseOver={handleMouseOver}
                    // onMouseOut={handleMouseOut}
                    render={({ field }) => (
                      <>
                        <CFormInput type="file" id="formFile" {...field} />
                        {!isHovering ? (
                          <img
                            src={img}
                            alt="user_img"
                            width="100"
                            height={100}
                            style={{ borderRadius: "50%" }}
                          />
                        ) : (
                          <p>image not find</p>
                        )}
                      </>
                    )}
                  />
                </div>
              </CCol>

              {/* FOR BIRTHDATE --------------------------------*/}
              <CCol md={4}>
                <CFormLabel htmlFor="birthDate">Birthdate</CFormLabel>
                <CFormInput
                  type="date"
                  id="birthDate"
                  {...register("birthDate", {
                    required: "This field is required",
                  })}
                  invalid={!!errors.birthdate}
                />
                <CFormFeedback invalid>Please enter a birthDate</CFormFeedback>
              </CCol>

              {/* FOR GENDER --------------------------------*/}
              <CCol md={4}>
                <CFormLabel htmlFor="gender">Gender Selection</CFormLabel>

                <CFormSelect {...register("gender")} className="mb-3">
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
                </CFormSelect>
              </CCol>

              {/* FOR SUBMIT BUTTON--------------------------------*/}
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      {/* ) : (
        "Loading"
      )} */}
    </div>
  );
};
// };

export default IndexForm;
