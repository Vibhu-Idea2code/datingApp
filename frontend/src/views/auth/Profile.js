import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CSpinner,
} from '@coreui/react'
import { useForm, Controller } from 'react-hook-form'
import CustomInput from '../../components/CustomInput'
import { handleInputChange, handleFileInputChange } from '../../components/formUtils'
import noImg from '../../assets/images/users/no_image.jpg'
import { useUserState, useUserDispatch, updateUser } from '../../context/UserContext'

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useForm()
  var [isLoading, setIsLoading] = useState(false)
  var [defaultLoading, setdefaultLoading] = useState(true)
  const {  user } = useUserState()
  // console.log(user)
  const [previewImage, setPreviewImage] = useState(noImg)
  var dispatch = useUserDispatch()

  useEffect(() => {
    if (user) {
      setValue('admin_name', user.username)
      setValue('email', user.useremail)
      setPreviewImage(user.userimage)
      setdefaultLoading(false)
    }
  }, [])

  const onSubmit = async (data) => {
    updateUser(dispatch, data, setIsLoading) 
  }

  return (
    <CRow>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Profile</strong>
          </CCardHeader>
          {defaultLoading ? (
            <p>Loading...</p>
          ) : (
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
                    readOnly={true}
                    disabled={true}
                    onChange={(e) =>
                      handleInputChange('email', e.target.value, { clearErrors, setValue })
                    }
                  />
                </CCol>

                <CCol md={12} className="d-fex">
                  <CustomInput
                    name="admin_image"
                    type="file"
                    label="Image"
                    style={{ width: '100%' }}
                    {...register('admin_image')}
                    defaultValue={getValues('admin_image')}
                    onChange={(e) =>
                      handleFileInputChange(e, 'admin_image', { clearErrors, setValue, setPreviewImage })
                    }
                  />
                  {previewImage ? <img src={previewImage} style={{width:'100px'}} className="img-preview" /> : ''}
                </CCol>


                <CCol xs={12}>
                  {isLoading ? (
                    <CSpinner className="theme-spinner-color" />
                  ) : (
                    <CButton color="primary" type="submit" className="theme-btn-background">
                      Update
                    </CButton>
                  )}
                </CCol>
              </CForm>
            </CCardBody>
          )}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile