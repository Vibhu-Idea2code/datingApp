// import { Button } from "@coreui/coreui";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
// import { useForm, Controller } from "react-hook-form";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const indexForm = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}>
      <CCol md={4}>
        <CFormInput
          type="text"
          defaultValue=""
          placeholder="enter your name"
          feedbackValid="Looks good!"
          id="validationCustom01"
          label="First name"
          name="first_name"
          required
        />
      </CCol>
      <CCol md={4}>
        <CFormInput
          type="text"
          defaultValue=""
          placeholder="enter your last name!like your surName"
          feedbackValid="Looks good!"
          id="validationCustom02"
          label="First name"
          name="last_name"
          required
        />
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText>@</CInputGroupText>
          <CFormInput
            type="text"
            aria-describedby="inputGroupPrependFeedback"
            feedbackValid="Please choose a username."
            id="validationCustomUsername"
            required
          />
        </CInputGroup>
      </CCol>
      <CCol md={6}>
        <CFormInput
          type="text"
          aria-describedby="validationCustom03Feedback"
          feedbackInvalid="Please provide a valid city."
          id="validationCustom03"
          label="City"
          required
        />
      </CCol>
      <CCol md={3}>
        <CFormSelect
          aria-describedby="validationCustom04Feedback"
          feedbackInvalid="Please select a valid state."
          id="validationCustom04"
          label="State"
          required>
          <option disabled>Choose...</option>
          <option>...</option>
        </CFormSelect>
      </CCol>
      <CCol md={3}>
        <CFormInput
          type="text"
          aria-describedby="validationCustom05Feedback"
          feedbackInvalid="Please provide a valid zip."
          id="validationCustom05"
          label="Zip"
          required
        />
      </CCol>
      <CCol xs={12}>
        <CFormCheck
          type="checkbox"
          id="invalidCheck"
          label="Agree to terms and conditions"
          required
        />
        <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  );
};

export default indexForm;
