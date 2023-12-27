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
import { useLocation } from "react-router-dom";
import no_profile from "../../assets/images/users/no_profile.jpg";

const InterestForm = () => {
  const { state } = useLocation();
  const [imgPreviews, setImgPreviews] = useState([]);
  const [isupdate, setisupdate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [NewUrl, setNewUrl] = useState("");
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
      setValue("name", editdata.name);
      // setValue("active_status", editdata.active_status);
      setNewUrl(baseurl + editdata.logo);
      // editdata.logo
      // ? setNewUrl(baseurl + editdata.logo)
      // : setNewUrl(no_profile);
      console.log(NewUrl);
    } else {
      setNewUrl(no_profile);
    }
    setdefaultLoading(false);
  }, [state]);

  var [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      // console.log(data);

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

      //   await axios.post("http://localhost:9500/v1/interest/create", formData);
      // } catch (error) {
      //   console.error("Error submitting form:", error);
      // }
      if (isupdate === "") {
        await axios.put(
          `http://localhost:9500/v1/interest/update/${isupdate}`,
          formData
        );

        localStorage.setItem("redirectSuccess", "true");
        localStorage.setItem("redirectMessage", "Added successfully!");
        navigate("/interest");
      } else {
        await axios.post("http://localhost:9500/v1/interest/create", formData);
        // await updateUserProfile(formData, isupdate);
        localStorage.setItem("redirectSuccess", "true");
        localStorage.setItem("redirectMessage", "Updated successfully!");
        navigate("/interest");
      }
    } catch (err) {
      if (err.response && err.response.data && !err.response.data.isSuccess) {
        // Iterate through the error object to extract keys and values
        Object.keys(err.response.data.message).forEach((key) => {
          // Set the error message for each field
          setError(key, {
            type: "manual",
            message: err.response.data.message[key],
          });
        });
      } else {
        console.error("Something Went Wrong!");
      }
      setIsLoading(false);
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
      {!defaultLoading ? (
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
                    {isupdate === "" ? "Add" : "Update"}Hobbies
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
      ) : (
        "loading"
      )}
    </CRow>
  );
};

export default InterestForm;
