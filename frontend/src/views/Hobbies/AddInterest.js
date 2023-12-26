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

const AddInterest = () => {
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
          key === "logo" &&
          typeof value === "object" &&
          !Array.isArray(value)
        ) {
          // Check if 'user_img' is an object with numeric keys
          Object.values(value).forEach((file) => {
            formData.append("logo", file); // Use "user_img" without index
          });
        } else if (Array.isArray(data[key])) {
          data[key].forEach((value) => {
            formData.append(key, value);
          });
        } else {
          formData.append(key, data[key]);
        }
      });

      await axios.post("http://localhost:9500/v1/interest/create", formData);
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
    setValue("logo", e.target.files);
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
                <CFormLabel htmlFor="name">Hobbies</CFormLabel>
                <CFormInput
                  type="text"
                  name="name"
                  {...register("name", {
                    required: "This field is required",
                  })}
                  invalid={!!errors.name}
                />
                <CFormFeedback invalid>Please Your Hobbies</CFormFeedback>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="logo">Image</CFormLabel>
                <Controller
                  name="logo"
                  control={control}
                  render={({ field }) => (
                    <>
                      <CFormInput
                        type="file"
                        id="logo"
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

export default AddInterest;
