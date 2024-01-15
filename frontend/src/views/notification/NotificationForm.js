import React, { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import "../../scss/_custom.scss";

const AddNotification = () => {
  const { state } = useLocation();
  const [isupdate, setisupdate] = useState("");
  let navigate = useNavigate();
  const {
    handleSubmit,
    control,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  var [defaultLoading, setdefaultLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(false);
    if (state) {
      const { editdata, baseurl } = state;
      setisupdate(editdata._id);
      setValue("title", editdata.title);
      setValue("description", editdata.description);
      setdefaultLoading(false);
    } else {
      setdefaultLoading(false);
    }
  }, [state]);

  const onSubmit = async (data) => {
    try {
      console.log(data);

      if (isupdate) {
        await axios.put(
          `http://localhost:9500/v1/notification/update/${isupdate}`,
          data
        );
      } else {
        await axios.post("http://localhost:9500/v1/notification/create-notification", data);
      }
      localStorage.setItem("redirectSuccess", "true");
      localStorage.setItem(
        "redirectMessage",
        isupdate === "" ? "Added successfully!" : "Updated successfully!"
      );
      navigate("/notifications");
      // Additional logic or navigation if needed
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{isupdate === "" ? "Add" : "Update"} Notification</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              onSubmit={handleSubmit(onSubmit)}>
              <CCol md={4}>
                <CFormLabel htmlFor="name"> Name</CFormLabel>
                <CFormInput
                  type="text"
                  name="Title"
                  {...register("title", {
                    required: "This field is required",
                  })}
                  defaultValue={getValues("title")}
                  onChange={(e) => setValue("title", e.target.value)}
                  invalid={!!errors.title}
                />
                <CFormFeedback invalid>Please Enter Title</CFormFeedback>
              </CCol>
            </CForm>

            <CForm
              className="row g-3 needs-validation"
              onSubmit={handleSubmit(onSubmit)}>
              <CCol md={4}>
                <CFormLabel htmlFor="name"> Description</CFormLabel>
                <CFormInput
                  type="text"
                  name="Description"
                  {...register("description", {
                    required: "This field is required",
                  })}
                  defaultValue={getValues("description")}
                  onChange={(e) => setValue("description", e.target.value)}
                  invalid={!!errors.description}
                />
                <CFormFeedback invalid>Please Enter Description</CFormFeedback>
              </CCol>

              <CCol xs={12}>
                <CButton  type="submit" className="commanBtn">
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

export default AddNotification;
