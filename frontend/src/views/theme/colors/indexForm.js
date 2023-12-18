import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
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

const IndexForm = () => {
  const { state } = useLocation();

  var [defaultLoading, setdefaultLoading] = useState(true);
  // var [isLoading, setIsLoading] = useState(false);
  const { setValue } = useForm();
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8500/v1/list/list-sexual"
      );
      // console.log(response.data.data.getSexual[0]);
      // const data = await response.data();
      const mappedOptions = response.data.data.getSexual.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      // console.log(mappedOptions);
      setSexual(mappedOptions);
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };
  useEffect(() => {
    fetchDataPets();
  }, []);

  const fetchDataPets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8500/v1/list/list-pets"
      );
      // console.log(response.data.data.getPet[0]);
      // const data = await response.data();
      const mappedOptions = response.data.data.getPet.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      // console.log(mappedOptions);
      setPet(mappedOptions);
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };

  useEffect(() => {
    fetchDataSigns();
  }, []);
  const fetchDataSigns = async () => {
    try {
      const response = await axios.get("http://localhost:8500/v1/sign/list");
      console.log(response.data);
      // const data = await response.data();
      const mappedOptions = response.data.data.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      console.log(mappedOptions);
      setSign(mappedOptions);
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };

  useEffect(() => {
    fetchDataInterests();
  }, []);
  const fetchDataInterests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8500/v1/list/list-interest"
      );
      console.log(response.data);
      // const data = await response.data();
      const mappedOptions = response.data.data.getHob.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      console.log(mappedOptions);
      setInterest(mappedOptions);
    } catch (error) {
      console.error("Error fetching Sexual data:", error);
    }
  };

  // const validateInterest = (value) => {
  //   // Validate that at least 3 options are selected
  //   return value && value.length >= 3;
  // };

  // axios.get("http://localhost:8500/v1/admin/user-list").then((response) => {
  //   console.log(response.data);
  // });

  // const onSubmit = async () => {
  //   // setIsLoading(true);
  //   axios
  //     .post("http://localhost:8500/v1/admin/create-user")
  //     .then((response) => {
  //       console.log(response.data.data);
  //       // setdata(...data,[response.data]);
  //     });
  // };
  // const calculateAge = (birthdate) => {
  //   const today = new Date();
  //   const birthDate = new Date(birthdate);
  //   let age = today.getFullYear() - birthDate.getFullYear();

  //   const monthDiff = today.getMonth() - birthDate.getMonth();
  //   if (
  //     monthDiff < 0 ||
  //     (monthDiff === 0 && today.getDate() < birthDate.getDate())
  //   ) {
  //     age--;
  //   }

  //   return age;
  // };

  const onSubmit = async (data) => {
    try {
      await console.log(data);
      // setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8500/v1/admin/create-user",
        data
      );

      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", response);
      // Add any logic or state updates after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors or set an error state
    } finally {
      // setIsLoading(false);
    }
  };

  // const handleOnChange = (e) => {
  //   setdata({ ...data, [e.target.name]: e.target.value });
  // };

  return (
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
                <CFormLabel htmlFor="formFile">
                  Default file input example
                </CFormLabel>
                <CFormInput type="file" id="formFile" />
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
              <CFormFeedback invalid>Please enter a birthDate</CFormFeedback>
            </CCol>

            <CCol md={4}>
              <CFormLabel htmlFor="gender">Gender Selection</CFormLabel>

              <CFormSelect {...register("gender")} className="mb-3">
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormLabel htmlFor="sexual">Sexual</CFormLabel>

              <Controller
                name="sexual"
                control={control}
                render={({ field }) => (
                  <Select {...field} options={sexual} isMulti />
                )}
              />
            </CCol>

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
  );
};
// };

export default IndexForm;
