import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CFormLabel,
  CSpinner,
  CFormInput,
} from '@coreui/react'
import { useForm, Controller } from 'react-hook-form'
import CustomInput from '../../components/CustomInput'
import { handleInputChange } from '../../components/formUtils'
import { UpdateProfile } from '../../apiController'
import { toast } from 'react-toastify'
import { useUserState } from '../../context/UserContext'
import { Form } from 'react-router-dom'

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    control,
    setError,
    reset,
  } = useForm()
  var [isLoading, setIsLoading] = useState(false)
  const { userRole, user } = useUserState()
  const [imgPreviews, setImgPreview] = useState([]);


  // console.log(user.userImage)

  const onSubmit = async (data) => {
    // console.log(data)
    setIsLoading(true);
    const formData= new FormData();
    formData.append('admin_name', data.admin_name);
      formData.append('email', data.email);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('admin_image', data.admin_image);

    UpdateProfile(formData)
      .then((response) => {
        console.log(response.data.data)
 
      })

  }
  const handleImageChange = (e) => {
    const file = e.target.files;
    // const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    // setImgPreview(previews);
    // Set the value of the form field
    // setValue("user_img", e.target.files);
    if (file) {
      setImgPreview(URL.createObjectURL(file));
    }
    setValue("logo", e.target.files);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-6">
          <CCardHeader>
            <strong>Update Profile</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
              <CCol md={6}>
                <CustomInput
                  name="admin_name"
                  type="text"
                  label="Name"
                  {...register('admin_name', { required: 'Name is required' })}
                  error={!!errors.admin_name}
                  helperText={errors.admin_name && errors.admin_name.message}
                  defaultValue={getValues('admin_name')}
                  onChange={(e) =>
                    handleInputChange('admin_name', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>

              <CCol md={6}>
                <CustomInput
                  name="email"
                  type="text"
                  label="Email"
                  {...register('email', { required: 'Email is required' })}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                  defaultValue={getValues('email')}
                  onChange={(e) =>
                    handleInputChange('email', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>

              <CCol md={6}>
                <CustomInput
                  name="phoneNumber"
                  type="text"
                  label="Mobile No"
                  {...register('phoneNumber', { required: 'Mobile No is required' })}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber && errors.phoneNumber.message}
                  defaultValue={getValues('phoneNumber')}
                  onChange={(e) =>
                    handleInputChange('phoneNumber', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>
            
              <CCol md={4}>
                <CFormLabel htmlFor="admin_image">Image</CFormLabel>
                <Controller
                  name="admin_image"
                  control={control}
                  render={({ field }) => (
                    <>
                      <CFormInput
                        type="file"
                        id="admin_image"
                        accept='image/*'
                        onChange={handleImageChange}
                        multiple
                      />
                      {imgPreviews && (
                        <img
                          key={1}
                          src={imgPreviews}
                          alt="img"
                          width="60"
                          height="60"
                        />
                      )}
                    </>
                  )}
                />
              </CCol>


              <CCol xs={12}>
                  <CButton color="primary" type="submit" className="theme-btn-background">
                    Update
                  </CButton>
                {/* {isLoading ? (
                  <CSpinner className="theme-spinner-color" />
                ) : (
                )} */}
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile