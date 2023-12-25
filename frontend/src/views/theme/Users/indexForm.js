import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  CRow,
  CFormTextarea,
  CInputGroupText,
} from "@coreui/react";
import axios from "axios";
import { DocsExample } from "src/components";
import { array } from "prop-types";

const IndexForm = () => {
  const [imgPreviews, setImgPreviews] = useState([]);

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);

      let formData = new FormData(); //formdata object

      Object.entries(data).forEach(([key, value]) => {
        if (
          key === "user_img" &&
          typeof value === "object" &&
          !Array.isArray(value)
        ) {
          // Check if 'user_img' is an object with numeric keys
          Object.values(value).forEach((file) => {
            formData.append("user_img", file); // Use "user_img" without index
          });
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

  const handleImageChange = (e) => {
    // const file = e.target.files[0];
    const files = e.target.files;
    // Display a preview of the selected image
    // if (file) {
    //   setImgPreview(URL.createObjectURL(file));
    // }

    // Display previews of the selected images
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImgPreviews(previews);

    // Set the value of the form field
    setValue("user_img", e.target.files);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              onSubmit={handleSubmit(onSubmit)}>
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
                <CFormLabel htmlFor="birthDate">Birth Date</CFormLabel>
                <CFormInput
                  type="date"
                  id="birthDate"
                  {...register("birthDate", {
                    required: "This field is required",
                  })}
                  invalid={!!errors.birthdate}
                />
                <CFormFeedback invalid>Please enter a BirthDate</CFormFeedback>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="gender">Gender</CFormLabel>

                <CFormSelect {...register("gender")} className="mb-3">
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">other</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="user_img">Image</CFormLabel>
                <Controller
                  name="user_img"
                  control={control}
                  render={({ field }) => (
                    <>
                      <CFormInput
                        type="file"
                        id="user_img"
                        onChange={handleImageChange}
                        multiple
                      />
                      {imgPreviews.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          width="100"
                          height="100"
                        />
                      ))}
                    </>
                  )}
                />
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
    </CRow>
  );
};

export default IndexForm;
