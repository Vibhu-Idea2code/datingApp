import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
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

const UserForm = () => {
  const [imgPreviews, setImgPreviews] = useState([]);
  const { state } = useLocation();
  console.log(state);
  const [isupdate, setisupdate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    handleSubmit,
    control,
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  var [defaultLoading, setdefaultLoading] = useState(true);
  useEffect(() => {
    // getActiveMedicalCon().then((response) => {
    //   // setMedicalCon(response.data.info);
    // });

    // setIsLoading(false);
    if (state) {
      setValue("pass1", "123456");
      // Access the state data (editdata and baseUrl)
      const { editdata, baseurl } = state;

      setisupdate(editdata._id);
      setValue("first_name", editdata.first_name);
      setValue("last_name", editdata.last_name);
      setValue("email", editdata.email);
      setValue("phoneNumber", editdata.phoneNumber);
      const birthDate = new Date(editdata.birthDate);
      const formattedBirthDate = birthDate.toISOString().split("T")[0];
      setSelectedDate(birthDate);
      setValue("birthDate", formattedBirthDate);
      setValue("active_status", editdata.active_status);
      // setValue("user_img", editdata.user_img);
      console.log(editdata.user_img);
      editdata.user_img
        ? setNewUrl(baseurl + editdata.user_img)
        : setNewUrl(no_profile);
      setdefaultLoading(false);
    } else {
      setNewUrl(no_profile);
      setdefaultLoading(false);
    }
  }, [state]);
  const [newUrl, setNewUrl] = useState("");
  var [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      // console.log(data);

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
      if (isupdate === "") {
        await axios.post(
          "http://localhost:9500/v1/admin/create-user",
          formData
        );
        localStorage.setItem("redirectSuccess", "true");
        localStorage.setItem("redirectMessage", "Added successfully!");
        navigate("/users");
      } else {
        await axios.post(
          `http://localhost:9500/v1/admin/update-user/${id}`,
          formData,
          isupdate
        );
        // await updateUserProfile(formData, isupdate);
        localStorage.setItem("redirectSuccess", "true");
        localStorage.setItem("redirectMessage", "Updated successfully!");
        navigate("/users");
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
        console.error("Something Went Wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
                  defaultValue={getValues("first_name")}
                  onChange={(e) => setValue("first_name", e.target.value)}
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
                  defaultValue={getValues("last_name")}
                  onChange={(e) => setValue("last_name", e.target.value)}
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
                  defaultValue={getValues("email")}
                  onChange={(e) => setValue("email", e.target.value)}
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
                    defaultValue={getValues("phoneNumber")}
                    onChange={(e) => setValue("phoneNumber", e.target.value)}
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
                  defaultValue={getValues("birthDate")}
                  onChange={(e) => setValue("birthDate", e.target.value)}
                  invalid={!!errors.birthdate}
                />
                <CFormFeedback invalid>Please enter a BirthDate</CFormFeedback>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="gender">Gender</CFormLabel>

                <CFormSelect
                  {...register("gender")}
                  className="mb-3"
                  defaultValue={getValues("gender")}>
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

export default UserForm;
