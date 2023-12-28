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

const AddSign = () => {
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
      setValue("name", editdata.name);
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
          `http://localhost:9500/v1/sign/update/${isupdate}`,
          data
        );
      } else {
        await axios.post("http://localhost:9500/v1/sign/create-sign", data);
      }
      localStorage.setItem("redirectSuccess", "true");
      localStorage.setItem(
        "redirectMessage",
        isupdate === "" ? "Added successfully!" : "Updated successfully!"
      );
      navigate("/zodiac_sign_list");
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
            <strong>{isupdate === "" ? "Add" : "Update"} Zodiac Sign</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              onSubmit={handleSubmit(onSubmit)}>
              <CCol md={4}>
                <CFormLabel htmlFor="name"> Name</CFormLabel>
                <CFormInput
                  type="text"
                  name="name"
                  {...register("name", {
                    required: "This field is required",
                  })}
                  defaultValue={getValues("name")}
                  onChange={(e) => setValue("name", e.target.value)}
                  invalid={!!errors.name}
                />
                <CFormFeedback invalid>Please Enter Zodiac Sign</CFormFeedback>
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

export default AddSign;
