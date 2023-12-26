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
  CRow,
} from "@coreui/react";
import axios from "axios";

const AddSign = () => {
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

      await axios.post("http://localhost:9500/v1/sign/create-sign", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
                <CFormLabel htmlFor="name"> Zodiac Sign</CFormLabel>
                <CFormInput
                  type="text"
                  name="name"
                  {...register("name", {
                    required: "This field is required",
                  })}
                  invalid={!!errors.name}
                />
                <CFormFeedback invalid>Please Enter Zodiac Sign</CFormFeedback>
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

export default AddSign;
