import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
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
import no_profile from "../../assets/images/users/no_profile.jpg";
import { MenuItem, Select } from "@mui/material";

const AddPlans = () => {

  const [showBoostFields, setShowBoostFields] = useState(true);
  const { state } = useLocation();

  const [isupdate, setisupdate] = useState("");
  let navigate = useNavigate();
  const {
    handleSubmit,
    control,
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  var [defaultLoading, setdefaultLoading] = useState(true);
  var [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
   
    setIsLoading(false);
    if (state) {
      const { editdata } = state;

      setisupdate(editdata._id);
      setValue("planType", editdata.planType);
      setValue("planName", editdata.planName);
      setValue("description", editdata.description);
      setValue("price", editdata.price);
      setValue("duration", editdata.duration);
      setValue("freeBoost", editdata.freeBoost);
      setValue("boostDuration", editdata.boostDuration);
      setValue("freeSuperLike", editdata.freeSuperLike);
      setValue("SuperLikeduration", editdata.SuperLikeduration);
      setValue("limit", editdata.limit);
      setValue("duration", editdata.duration);
      setValue("feature", editdata.feature);
      setValue("active_status", editdata.active_status);
      handlePlanTypeChange(editdata.planType); 
    }
    setdefaultLoading(false);
  }, []);


  const onSubmit = async (data) => {
    try {
      // console.log(data);

      if (isupdate) {
        await axios.put(
          `http://localhost:9500/v1/plan/update/${isupdate}`,
          data
        );
      } else {
        await axios.post("http://localhost:9500/v1/plan/create-plan", data);
      }
      localStorage.setItem("redirectSuccess", "true");
      localStorage.setItem(
        "redirectMessage",
        isupdate === "" ? "Added successfully!" : "Updated successfully!"
      );
      navigate("/plans");
      // Additional logic or navigation if needed
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  const handlePlanTypeChange = (selectedPlanType) => {
    // Set the state to determine whether to show boost fields based on the selected plan type
    setShowBoostFields(selectedPlanType === "premium" || selectedPlanType=== "gold");
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Plans</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              onSubmit={handleSubmit(onSubmit)}>
              {/*====================== planType ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="planType">Plan Type</CFormLabel>

                <CFormSelect
                  {...register("planType", {
                    required: "Please select a planType",
                  })}
                  className="mb-3"
                  defaultValue={getValues("planType")}
                  onChange={(e) => {
                    setValue("planType", e.target.value);
                    handlePlanTypeChange(e.target.value);
                  }}>


                  <option value="">Select Plan Type</option>
                  <option value="premium">Premium</option>
                  <option value="gold">Gold</option>
                  <option value="boosts">Boosts</option>
                  <option value="superlikes">Super Likes</option>

                </CFormSelect>
                {errors.planType && (
                  <CFormFeedback invalid>{errors.planType.message}</CFormFeedback>
                )}
              </CCol>
           
                
              {/*====================== planName ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="planName">Plan Name</CFormLabel>
                <CFormInput
                  type="text"
                  name="planName"
                  id="planName"
                  // onChange={handleOnChange}
                  {...register("planName", {
                    required: "This field is required",
                  })}
                  defaultValue={getValues("planName")}
                  onChange={(e) => setValue("planName", e.target.value)}
                  invalid={!!errors.planName}
                />
                <CFormFeedback invalid>Please Enter Plan Name</CFormFeedback>
              </CCol>

              {/*====================== description ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormTextarea
                 rows={1}
                  type="text"
                  placeholder="Descriptions"
                  id="description"
                  {...register("description")}
                  defaultValue={getValues("description")}
                  onChange={(e) => setValue("description", e.target.value)}
                />
              </CCol>
              

                    {/*====================== price ===================== */}
                    <CCol md={4}>
                      <CFormLabel htmlFor="price">price</CFormLabel>
                      <CInputGroup>
                        <CFormInput
                          type="number"
                          id="price"
                          {...register("price", {
                            required: "This field is required",
                          })}
                          defaultValue={getValues("price")}
                          onChange={(e) => setValue("price", e.target.value)}
                          invalid={!!errors.price}
                        />
                        <CFormFeedback invalid>
                          Please enter a Price{" "}
                        </CFormFeedback>
                      </CInputGroup>
                    </CCol>

   {/*====================== limit ===================== */}
   <CCol md={4}>
                <CFormLabel htmlFor="limit">Limit</CFormLabel>
                <CFormInput
                  type="number"
                  id="limit"
                  {...register("limit")}
                  defaultValue={getValues("limit")}
                  onChange={(e) => setValue("limit", e.target.value)}              
                />
              </CCol>


              {showBoostFields && (
                <>
                {/*====================== feature ===================== */}
                <CCol md={4}>
                <CFormLabel htmlFor="feature">Feature</CFormLabel>
                <CFormTextarea
                 rows={1}
                  type="text"
                  id="feature"
                  placeholder="Multiple Features Add In Using ,"
                  {...register("feature")}
                  defaultValue={getValues("feature")}
                  onChange={(e) => setValue("feature", e.target.value)}              
                />
              </CCol>


             

              {/*======================Duration  ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="duration">Duration</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="number"
                    placeholder="Enter In  Days"
                    id="duration"
                    {...register("duration")}
                    defaultValue={getValues("duration")}
                    onChange={(e) => setValue("duration", e.target.value)}    
                  />
                </CInputGroup>
              </CCol>
              {/*====================== freeBoost ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="freeBoost">Free Boost</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="number"
                    id="freeBoost"
                    {...register("freeBoost")}
                    defaultValue={getValues("freeBoost")}
                    onChange={(e) => setValue("freeBoost", e.target.value)}
                  />
                </CInputGroup>
              </CCol>

              {/*====================== Boost Duration ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="boostDuration">Boost Duration</CFormLabel>

                <CFormSelect
                  {...register("boostDuration", {
                    required: "Please select a boostDuration",
                  })}
                  className="mb-3"
                  defaultValue={getValues("boostDuration")}>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </CFormSelect>
                {errors.boostDuration && (
                  <CFormFeedback invalid>{errors.boostDuration.message}</CFormFeedback>
                )}
              </CCol>
              {/*====================== Free Super Like ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="freeSuperLike">Free Super Like</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="number"
                    id="freeSuperLike"
                    {...register("freeSuperLike")}
                    defaultValue={getValues("freeSuperLike")}
                    onChange={(e) => setValue("freeSuperLike", e.target.value)}
                  />
                </CInputGroup>
              </CCol>

              {/*====================== SuperLikeduration ===================== */}

              <CCol md={4}>
                <CFormLabel htmlFor="SuperLikeduration">Super Like Duration</CFormLabel>

                <CFormSelect
                  {...register("SuperLikeduration", {
                    required: "Please select a SuperLikeduration",
                  })}
                  className="mb-3"
                  defaultValue={getValues("SuperLikeduration")}>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </CFormSelect>
                {errors.SuperLikeduration && (
                  <CFormFeedback invalid>{errors.SuperLikeduration.message}</CFormFeedback>
                )}
              </CCol>
              </>
              )}
       

              <CCol xs={12}>
                <CButton color="primary" type="submit" className="commanBtn">
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

export default AddPlans;
