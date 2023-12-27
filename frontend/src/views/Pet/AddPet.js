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
import { useNavigate, useLocation } from "react-router-dom";

const AddPet = () => {
  const { state } = useLocation();
  console.log(state, "addseexual orientation state  line no :-28");
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
      console.log(data, "addseexualorienattion line no :-74");
      if (isupdate) {
        await axios.put(
          `http://localhost:9500/v1/pet/update/${isupdate}`,
          data
        );
      } else {
        await axios.post("http://localhost:9500/v1/pet/create-pet", data);
      }
      localStorage.setItem("redirectSuccess", "true");
      localStorage.setItem(
        "redirectMessage",
        isupdate === "" ? "Added successfully!" : "Updated successfully!"
      );
      navigate("/pets_list");
      // Additional logic or navigation if needed
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    //   await axios.post("http://localhost:9500/v1/pet/create-pet", data);
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
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
                <CFormLabel htmlFor="name">
                  {" "}
                  {isupdate === "" ? "Add" : "Update"}Pets Name
                </CFormLabel>
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
                <CFormFeedback invalid>
                  Please Enter Your Pets Name
                </CFormFeedback>
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

export default AddPet;
