import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
// import { adm inCreateUserDetails } from "../../../apiController";
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
} from "@coreui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const IndexForm = () => {
  const { state } = useLocation();

  // var [defaultLoading, setdefaultLoading] = useState(true);
  var [isLoading, setIsLoading] = useState(false);
  // const { setValue } = useForm();
  const [isupdate, setisupdate] = useState("");
  // const [data, setdata] = useState({});

  // console.log("data=======", data);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const [sexual, setSexual] = useState({});
  const [pet, setPet] = useState([]);
  const [sign, setSign] = useState([]);
  const [interest, setInterest] = useState([]);
  const [img, setImg] = useState(null);

  const fetchData = async () => {
    setIsLoading(false);
    try {
      await axios
        .get("http://localhost:9500/v1/list/list-sexual")
        .then((response) => {
          setSexual(response.data.data.getSexual);
          setIsLoading(true);
        });
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };

  const fetchDataPets = async () => {
    setIsLoading(false);
    try {
      await axios
        .get("http://localhost:9500/v1/list/list-pets")
        .then((response) => {
          setPet(response.data.data.getPet);
          setIsLoading(true);
        });
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // console.log("SDfds");
    fetchDataPets();
    fetchDataSigns();
    fetchDataInterests();
  }, []);
  const [isHovering, setIsHovering] = useState(false);

  const fetchDataSigns = async () => {
    setIsLoading(false);
    try {
      const response = await axios
        .get("http://localhost:9500/v1/sign/list")
        .then((response) => {
          setSign(response.data.data);

          setIsLoading(true);
        });
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };

  // useEffect(() => {
  //   fetchDataInterests();
  // }, []);
  const fetchDataInterests = async () => {
    setIsLoading(false);
    try {
      const response = await axios
        .get("http://localhost:9500/v1/list/list-interest")
        .then((response) => {
          setInterest(response.data.data.getHob);

          setIsLoading(true);
        });
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImg(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const onSubmit = async (data) => {
    try {
      console.log(data);
      // setIsLoading(false);
      let formData = new FormData(); //formdata object
      console.log(formData);
      Object.keys(data).forEach(function (key) {
        if (key === "user_img") {
          formData.append(key, data[key]);
        } else if (Array.isArray(data[key])) {
          data[key].forEach((value) => {
            formData.append(key, value);
          });
        } else {
          formData.append(key, data[key]);
        }
      });
      await axios.post("http://localhost:9500/v1/admin/create-user", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>User</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit(onSubmit)}>
                <CCol md={4}>
                  <CFormLabel htmlFor="first_name">First Name</CFormLabel>
                  <CFormInput
                    type="text"
                    name="first_name"
                    {...register("first_name", {
                      required: "This field is required",
                    })}
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
                      invalid={!!errors.phoneNumber}
                    />
                    <CFormFeedback invalid>
                      Please enter a phone number
                    </CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={4}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="formFile">add you image</CFormLabel>
                    <Controller
                      name="user_img"
                      accept="image/*"
                      control={control}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      render={({ field }) => (
                        <>
                          <CFormInput
                            type="file"
                            id="formFile"
                            onChange={handleFileUpload}
                          />
                          {!isHovering ? (
                            <img
                              src={img}
                              alt="user_img"
                              width="100"
                              height={100}
                              style={{ borderRadius: "50%" }}
                            />
                          ) : (
                            <p>image not find</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="birthDate">Birthdate</CFormLabel>
                  <CFormInput
                    type="date"
                    id="birthDate"
                    {...register("birthDate", {
                      required: "This field is required",
                    })}
                    invalid={!!errors.birthdate}
                  />
                  <CFormFeedback invalid>
                    Please enter a birthDate
                  </CFormFeedback>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="gender">Gender Selection</CFormLabel>

                  <CFormSelect {...register("gender")} className="mb-3">
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                  </CFormSelect>
                </CCol>

                {/* <CCol md={4}>
                  <CFormLabel htmlFor="sexual">sexual</CFormLabel>
                  <Controller
                    name="sexuals"
                    style={{ marginTop: "16px", marginBottom: "16px" }}
                    control={control}
                    defaultValue={isupdate === "" ? [] : getValues("sexuals")}
                    error={!!errors.sexual}
                    rules={{ required: "Medical Conditions is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          labelId="sexuals"
                          id="sexuals"
                          style={{ marginTop: "16px", marginBottom: "16px" }}
                          multiple>
                          {sexual.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                </CCol> */}
                {/* 
                <CCol md={4}>
                  <CFormLabel htmlFor="pets">pets</CFormLabel>
                  <Controller
                    name="pets"
                    style={{ marginTop: "16px", marginBottom: "16px" }}
                    control={control}
                    defaultValue={isupdate === "" ? [] : getValues("pets")}
                    error={!!errors.pet}
                    rules={{ required: "Medical Conditions is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          labelId="pet"
                          id="pet"
                          style={{ marginTop: "16px", marginBottom: "16px" }}
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
                </CCol> */}

                {/* <CCol md={4}>
                  <CFormLabel htmlFor="interests">interest</CFormLabel>
                  <Controller
                    name="interests"
                    style={{ marginTop: "16px", marginBottom: "16px" }}
                    control={control}
                    defaultValue={isupdate === "" ? [] : getValues("interests")}
                    error={!!errors.interest}
                    rules={{ required: "Medical Conditions is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          labelId="interests"
                          id="interests"
                          style={{ marginTop: "16px", marginBottom: "16px" }}
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
                </CCol> */}

                {/* <CCol md={4}>
                  <CFormLabel htmlFor="pets">Sign</CFormLabel>
                  <Controller
                    name="signs"
                    style={{ marginTop: "16px", marginBottom: "16px" }}
                    control={control}
                    defaultValue={isupdate === "" ? [] : getValues("signs ")}
                    error={!!errors.sign}
                    rules={{ required: "Medical Conditions is required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          labelId="signs"
                          id="signs"
                          style={{ marginTop: "16px", marginBottom: "16px" }}
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
                </CCol> */}
                {/* <CFormLabel htmlFor="pets">Sexual</CFormLabel>
                  <Controller
                    name="sexual"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={sexual.map((option) => ({
                          value: option._id,
                          label: option.name,
                        }))}
                        isMulti
                      />
                    )}
                  /> */}
                {/* </CCol> */}

                {/* <CCol md={4}>
              <CFormLabel htmlFor="pets">Pets</CFormLabel>

              <Controller
                name="pets"
                control={control}
                render={({ field }) => (
                  <Select {...field} options={pet} isMulti />
                )}
              />
            </CCol>

            <CCol md={4}>
              <CFormLabel htmlFor="signs">Sign</CFormLabel>

              <Controller
                name="sign"
                control={control}
                render={({ field }) => (
                  <Select {...field} options={sign} isMulti />
                )}
              />
            </CCol>

            <CCol md={4}>
              <CFormLabel htmlFor="interest">Interst</CFormLabel>

              <Controller
                name="interest"
                rules={{ validate: validateInterest }}
                control={control}
                render={({ field }) => (
                  <Select {...field} options={interest} isMulti />
                )}
              />
            </CCol> */}
                {/* 
            <CCol md={4}>
              <CFormLabel htmlFor="pets">Pets</CFormLabel>

              <Controller
                name="iceCreamType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "chocolate", label: "Chocolate" },
                      { value: "strawberry", label: "Strawberry" },
                      { value: "vanilla", label: "Vanilla" },
                    ]}
                  />
                )}
              />
            </CCol> */}
                {/* <CFormSelect
              size="sm"
              className="mb-3"
              aria-label="Small select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </CFormSelect> */}

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
        "Loading"
      )}
    </div>
  );
};
// };

export default IndexForm;
