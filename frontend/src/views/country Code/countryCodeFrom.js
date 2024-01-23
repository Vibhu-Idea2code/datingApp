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
import { useLocation, useNavigate } from "react-router-dom";
import no_profile from "../../assets/images/users/no_profile.jpg";
import "../../scss/_custom.scss";

const InterestForm = () => {
  const { state } = useLocation();
 
  const [imgPreviews, setImgPreview] = useState([]);
  const [isupdate, setisupdate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [NewUrl, setNewUrl] = useState(no_profile);
  let navigate = useNavigate();
  const {
    handleSubmit,
    control,
    register,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  var [defaultLoading, setdefaultLoading] = useState(true);

  useEffect(() => {
    // console.log(state.baseurl);
    // setIsLoading(false);
    if (state) {
      const { editdata, baseurl } = state;
      setisupdate(editdata._id);
      setValue("countryCode", editdata.countryCode);
      setImgPreview(baseurl + editdata.countryflag);
      setValue(baseurl + editdata.countryflag);
      
    }
    setdefaultLoading(false);
  }, []);

  var [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      // console.log(data);

      let formData = new FormData(); //formdata object

      Object.entries(data).forEach(([key, value]) => {
        if (
          key === "countryflag" &&
          typeof value === "object" &&
          !Array.isArray(value)
        ) {
          // Check if 'user_img' is an object with numeric keys
          Object.values(value).forEach((file) => {
            formData.append("countryflag", file); // Use "user_img" without index
          });
        } else if (Array.isArray(data[key])) {
          data[key].forEach((value) => {
            formData.append(key, value);
          });
        } else {
          formData.append(key, data[key]);
        }
      });

      if (isupdate) {
        await axios.put(
          `http://localhost:9500/v1/countryCode/update/${isupdate}`,
          formData
        );

        localStorage.setItem("redirectSuccess", "true");
        localStorage.setItem("redirectMessage", "Added successfully!");
        // toast.success("added successfully!")
        navigate("/CountryCode");
      } else {
        await axios.post("http://localhost:9500/v1/countryCode/create", formData);
        // await updateUserProfile(formData, isupdate);
        localStorage.setItem("redirectSuccess", "true");
        localStorage.setItem("redirectMessage", "Updated successfully!");
        navigate("/CountryCode");
      }
    } catch (err) {
      console.error("Something Went Wrong!");
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // const files = e.target.files;
    // Display a preview of the selected image
    if (file) {
      setImgPreview(URL.createObjectURL(file));
    }

    // Display previews of the selected images
    // const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    // setImgPreviews(previews);

    // Set the value of the form field
    setValue("countryflag", e.target.files);
  };

  return (
    <CRow>
      {!defaultLoading ? (
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong> {isupdate === "" ? "Add" : "Update"} country Code</strong>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                onSubmit={handleSubmit(onSubmit)}>
                <CCol md={4}>
                  <CFormLabel htmlFor="countryCode">code name</CFormLabel>
                  <CFormInput
                    type="text"
                    name="countryCode"
                    {...register("countryCode", {
                      required: "This field is required",
                    })}
                    defaultValue={getValues("countryCode")}
                    onChange={(e) => setValue("countryCode", e.target.value)}
                    invalid={!!errors.countryCode}
                  />
                  <CFormFeedback invalid>Please Your country code</CFormFeedback>
                </CCol>

                    {/*====================== image ===================== */}
                    <CCol md={4}>
  <CFormLabel htmlFor="countryflag">Image</CFormLabel>
  <Controller
    name="countryflag"
    control={control}
    rules={{
      required: "Image is required",
     
    }}
    render={({ field }) => (
      <>
        <CFormInput
          type="file"
          id="countryflag"
          onChange={handleImageChange}
          multiple
        />
        {imgPreviews && (
          <img
            key={1}
            src={imgPreviews}
            alt="img"
            width="100"
            height="100"
            style={{ marginTop: "15px" }}
          />
        )}
      </>
    )}
  />
  {errors.countryflag && (
    <span style={{ color: "#e55353" }}>{errors.countryflag.message}</span>
  )}
</CCol>


                <CCol xs={12}>
                  <CButton
                    type="submit"
                    className="commanBtn"
                    // style={{
                    //   background: "#FF4D67",
                    //   borderColor: "#FD788C",
                    //   fontStyle: "Source Sans Pro",
                    // }}
                  >
                    Submit
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      ) : (
        "loading"
      )}
    </CRow>
  );
};

export default InterestForm;


// const onSubmit = async (data) => {
//   setIsLoading(true);

//   const formData = new FormData();
//   formData.append('admin_name', data.admin_name);
//   formData.append('email', data.email);
//   formData.append('phoneNumber', data.phoneNumber);
//   formData.append('profileImage', data.profileImage);

//   UpdateProfile(formData)
//     .then((response) => {
//       console.log(response.data.data);
//     })
//     .finally(() => {
//       setIsLoading(false);
//     });
// };
