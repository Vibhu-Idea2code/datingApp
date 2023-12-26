import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

const test = () => {
  const [img, setImg] = useState(null);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const [isHovering, setIsHovering] = useState(false);
  var [isLoading, setIsLoading] = useState(false);
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
    <div>
      {/* {isLoading ? ( */}
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
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

export default test;
