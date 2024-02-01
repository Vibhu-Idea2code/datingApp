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

const UserForm = () => {
  const [sexualOrientationOptions, setSexualOrientationOptions] = useState([]);
  const [sign, setSign] = useState([]);
  const [pet, setPet] = useState([]);
  const [interest, setInterest] = useState([]);

  const [imgPreviews, setImgPreview] = useState([]);
  const { state } = useLocation();
  // console.log(state);
  const [isupdate, setisupdate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  let navigate = useNavigate();
  const [newUrl, setNewUrl] = useState(no_profile);
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
    Sexual();
    Pet();
    ZodiacSign();
    Interest();
    // setIsLoading(false);
    if (state) {
      // Access the state data (editdata and baseUrl)
      const { editdata, baseurl } = state;
console.log(editdata,"editdata")
      setisupdate(editdata._id);
      setValue("first_name", editdata.first_name);
      setValue("last_name", editdata.last_name);
      setValue("email", editdata.email);
      setValue("interest", editdata.interest);
      setValue("sign", editdata.sign);
      setValue("pets", editdata.pets);
      // setValue("sexual", editdata.sexual.name);
      // console.log(editdata.sexual,"editdata.sexual._id")
    //   editdata.sexual.forEach(item => {
    //     // console.log(item, "editdata.sexual item");
    //     console.log(item._id, "editdata.sexual item ID");
    // });
    
      setValue("school", editdata.school);
      setValue("address", editdata.address);
      setValue("jobTitle", editdata.jobTitle);
      setValue("minAge", editdata.minAge);
      setValue("maxAge", editdata.maxAge);
      setValue("phoneNumber", editdata.phoneNumber);
      setValue("lat", editdata.lat);
      setValue("long", editdata.long);
      // setValue("gender", editdata.gender);
      // setValue("showMe", editdata.showMe);

      const birthDate = new Date(editdata.birthDate);
      const formattedBirthDate = birthDate.toISOString().split("T")[0];
      setSelectedDate(birthDate);
      setValue("birthDate", formattedBirthDate);
      setValue("active_status", editdata.active_status);

      const imageUrlArray = editdata.user_img.map((imageName) => {
        return baseurl + imageName;
      });
      editdata.user_img
        ? setImgPreview(imageUrlArray)
        : setImgPreview(no_profile);
    }
    setdefaultLoading(false);
  }, []);

  var [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
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
      if (isupdate) {
        await axios.put(
          `http://localhost:9500/v1/admin/update-user/${isupdate}`,
          formData,
          // {
          //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          // }
        );
        localStorage.setItem("redirectSuccess", "true");
        localStorage.setItem("redirectMessage", "Added user successfully!");
        navigate("/user");
      } else {
        await axios.post(
          "http://localhost:9500/v1/admin/create-user",
          formData,
          // {
          //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          // }
        );
        // await updateUserProfile(formData, isupdate);
        localStorage.setItem("redirectSuccess", "true");
        localStorage.setItem("redirectMessage", "Updated user successfully!");

        navigate("/user");
      }
    } catch (err) {
      console.error("Something Went Wrong!");
      setIsLoading(false);
    }
  };
  const handleImageChange = (e) => {
    const files = e.target.files;
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImgPreview(previews);
    // Set the value of the form field
    setValue("user_img", e.target.files);
  };
  const Sexual = async () => {
    try {
      const response = await axios.get("http://localhost:9500/v1/sexual/list",{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSexualOrientationOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };

  const Pet = async () => {
    try {
      const response = await axios.get("http://localhost:9500/v1/pet/list",{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPet(response.data.data);
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };

  const ZodiacSign = async () => {
    try {
      const response = await axios.get("http://localhost:9500/v1/sign/list",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSign(response.data.data);
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };

  const Interest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9500/v1/interest/list-interest",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setInterest(response.data.data.getHob);
      // console.log(response.data.data.getHob);
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
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
              {/*====================== first name ===================== */}
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
              {/*====================== last name ===================== */}
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
              {/*====================== email ===================== */}
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

              {/*====================== phone number ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="school">phoneNumber</CFormLabel>
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
                    Please enter a phoneNumber{" "}
                  </CFormFeedback>
                </CInputGroup>
              </CCol>
              {/*====================== min age===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="minAge">Min Age</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    id="minAge"
                    {...register("minAge", {
                      required: "This field is required",
                    })}
                    defaultValue={getValues("minAge")}
                    onChange={(e) => setValue("minAge", e.target.value)}
                    invalid={!!errors.minAge}
                  />
                  <CFormFeedback invalid>
                    Please enter a phone number
                  </CFormFeedback>
                </CInputGroup>
              </CCol>
              {/*====================== max age ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="maxAge">Max Age</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    id="maxAge"
                    {...register("maxAge", {
                      required: "This field is required",
                    })}
                    defaultValue={getValues("maxAge")}
                    onChange={(e) => setValue("maxAge", e.target.value)}
                    invalid={!!errors.maxAge}
                  />
                  <CFormFeedback invalid>
                    Please enter a phone number
                  </CFormFeedback>
                </CInputGroup>
              </CCol>

              {/*====================== latitude ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="lat">latitude</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    id="lat"
                    {...register("lat", {
                      required: "This field is required",
                    })}
                    defaultValue={getValues("lat")}
                    onChange={(e) => setValue("lat", e.target.value)}
                    invalid={!!errors.lat}
                  />
                  <CFormFeedback invalid>
                    Please enter a phone number
                  </CFormFeedback>
                </CInputGroup>
              </CCol>
              {/*====================== longitude ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="long">longitude</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    id="long"
                    {...register("long", {
                      required: "This field is required",
                    })}
                    defaultValue={getValues("long")}
                    onChange={(e) => setValue("long", e.target.value)}
                    invalid={!!errors.long}
                  />
                  <CFormFeedback invalid>
                    Please enter a phone number
                  </CFormFeedback>
                </CInputGroup>
              </CCol>

              {/*====================== birth date ===================== */}

              <CCol md={4}>
                <CFormLabel htmlFor="birthDate">Birth Date</CFormLabel>
                <CFormInput
                selected={selectedDate}
                  type="date"
                  id="birthDate"
                  {...register("birthDate", {
                    required: "This field is required",
                  })}
                  defaultValue={getValues("birthDate")}
                  onChange={(e) => setValue("birthDate", e.target.value)}
                  invalid={!!errors.birthDate}
                />
                {errors.birthDate && (
                  <CFormFeedback invalid>
                    {errors.birthDate.message}
                  </CFormFeedback>
                )}
              </CCol>

              {/*====================== sexual orientation ===================== */}

              {/* const options = [{
 { value: "male", label: "Male" },
 { value: "female", label: "Female" },
}]; */}

              {/* return <CMultiSelect options={options} selectionType="tags" /> */}

              <CCol sm={12} md={4}>
                <CFormLabel htmlFor="sexual">Sexual Oreintation</CFormLabel>
                <div>
                  <Controller
                    name="sexual"
                    control={control}
                    defaultValue={isupdate === "" ? [] : getValues("sexual")}
                    error={!!errors.sexual}
                    rules={{ required: "Sexual Orientation is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          labelId="sexual"
                          id="sexual"
                          style={{
                            maxWidth: "100%", // Set maximum width to 100%
                            minWidth: "100%", // Set maximum width to 100%
                          }}
                          autoWidth={false}
                          multiple>
                          {sexualOrientationOptions.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                  {errors.sexual && (
                    <span style={{ color: "#e55353" }}>
                      {errors.sexual.message}
                    </span>
                  )}
                </div>
              </CCol>

              {/*====================== pets ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="pets">Pets</CFormLabel>
                <div>
                  <Controller
                    name="pets"
                    // style={{ marginTop: "16px", marginBottom: "16px" }}
                    control={control}
                    defaultValue={isupdate === "" ? [] : getValues("pets")}
                    error={!!errors.pets}
                    rules={{ required: "pets is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          labelId="pets"
                          id="pets"
                          style={{
                            maxWidth: "100%", // Set maximum width to 100%
                            minWidth: "100%", // Set maximum width to 100%
                          }}
                          autoWidth={false}
                          multiple>
                          {pet.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                  {errors.pets && (
                    <span style={{ color: "#e55353" }}>
                      {errors.pets.message}
                    </span>
                  )}
                </div>
              </CCol>
              {/*====================== interest===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="interest">Interest</CFormLabel>
                <div>
                  <Controller
                    name="interest"
                    // style={{ marginTop: "16px", marginBottom: "16px" }}
                    control={control}
                    defaultValue={isupdate === "" ? [] : getValues("interest")}
                    error={!!errors.interest}
                    rules={{ required: "Interest is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          labelId="interest"
                          id="interest"
                          style={{
                            maxWidth: "100%", // Set maximum width to 100%
                            minWidth: "100%", // Set maximum width to 100%
                          }}
                          autoWidth={false}
                          multiple>
                          {interest.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                  {errors.interest && (
                    <span style={{ color: "#e55353" }}>
                      {errors.interest.message}
                    </span>
                  )}
                </div>
              </CCol>
              {/*====================== zodiac sign ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="sign">Zodiac Sign</CFormLabel>
                <div>
                  <Controller
                    name="sign"
                    // style={{ marginTop: "16px", marginBottom: "16px" }}
                    control={control}
                    defaultValue={isupdate === "" ? [] : getValues("sign")}
                    onChange={(e) => setValue("sign", e.target.value)}
                    error={!!errors.sign}
                    rules={{ required: "zodiac Sign is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          labelId="sign"
                          id="sign"
                          style={{
                            maxWidth: "100%", // Set maximum width to 100%
                            minWidth: "100%", // Set maximum width to 100%
                          }}
                          autoWidth={false}
                          multiple>
                          {sign.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                  {errors.sign && (
                    <span style={{ color: "#e55353" }}>
                      {errors.sign.message}
                    </span>
                  )}
                </div>
              </CCol>
              {/*====================== school===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="school">School</CFormLabel>
                <CFormInput
                  type="text"
                  id="school"
                  {...register("school", {
                    required: "This field is required",
                  })}
                  defaultValue={getValues("school")}
                  onChange={(e) => setValue("school", e.target.value)}
                  invalid={!!errors.school}
                />
                <CFormFeedback invalid>
                  Please Enter Your School Name
                </CFormFeedback>
              </CCol>
              {/*====================== address ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="address">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="address"
                  {...register("address", {
                    required: "This field is required",
                  })}
                  defaultValue={getValues("address")}
                  onChange={(e) => setValue("address", e.target.value)}
                  invalid={!!errors.address}
                />
                <CFormFeedback invalid>Please Enter Your Address</CFormFeedback>
              </CCol>
              {/*====================== job title ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="jobTitle">Job Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="jobTitle"
                  {...register("jobTitle", {
                    required: "This field is required",
                  })}
                  defaultValue={getValues("jobTitle")}
                  onChange={(e) => setValue("jobTitle", e.target.value)}
                  invalid={!!errors.jobTitle}
                />
                <CFormFeedback invalid>
                  Please Enter Your Job Title
                </CFormFeedback>
              </CCol>
              {/*====================== gender ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="gender">Gender</CFormLabel>

                <CFormSelect
                  {...register("gender", {
                    required: "Please select a gender",
                  })}
                  className="mb-3"
                  defaultValue={getValues("gender")}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">other</option>
                </CFormSelect>
                {errors.gender && (
                  <CFormFeedback invalid>{errors.gender.message}</CFormFeedback>
                )}
              </CCol>
              {/*====================== show me ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="show me">Show Me</CFormLabel>

                <CFormSelect
                  {...register("show me")}
                  className="mb-3"
                  defaultValue={getValues("show me")}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">other</option>
                </CFormSelect>
              </CCol>

              {/* <CCol md={4}>
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
                          alt={`preview${index + 1}`}
                          width="60"
                          height="60"
                        />
                      ))}
                    </>
                  )}
                />
              </CCol> */}
              {/*====================== image ===================== */}
              <CCol md={4}>
                <CFormLabel htmlFor="user_img">Image</CFormLabel>
                <Controller
                  name="user_img"
                  control={control}
                  rules={{
                    validate: (files) =>
                      files?.length >= 2 || "At least two images are required",
                  }}
                  render={({ field }) => (
                    <>
                      <CFormInput
                        type="file"
                        id="user_img"
                        onChange={(e) => {
                          field.onChange(e);
                          handleImageChange(e); // Assuming handleImageChange is a function you've defined
                        }}
                        multiple
                      />
                      {imgPreviews &&
                        imgPreviews.map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt={`preview${index + 1}`}
                            width="60"
                            height="60"
                          />
                        ))}
                    </>
                  )}
                />
                {errors.user_img && (
                  <span style={{ color: "#e55353" }}>
                    {errors.user_img.message}
                  </span>
                )}
              </CCol>

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





export default UserForm;
