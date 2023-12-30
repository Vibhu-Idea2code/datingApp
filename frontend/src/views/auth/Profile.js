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
} from '@coreui/react'
import { useForm, Controller } from 'react-hook-form'
import CustomInput from '../../components/CustomInput'
import { handleInputChange } from '../../components/formUtils'
import { changePassword } from '../../apiController'
import { toast } from 'react-toastify'
import { useUserState } from '../../context/UserContext'

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    setError,
    reset,
  } = useForm()
  var [isLoading, setIsLoading] = useState(false)
  const { userRole, user } = useUserState()

  console.log(user.userImage)

  const onSubmit = async (data) => {
    setIsLoading(true)
    console.log(data)
    // changePassword(data)
    //   .then((response) => {
    //     if (response.data.status === 200 && response.data.isSuccess) {
    //       reset()
    //       toast.success(response.data.info)
    //       setIsLoading(false)
    //     } else {
    //       setError(response.data.messages)
    //       setIsLoading(false)
    //     }
    //   })
    //   .catch((err) => {
    //     if ((err.response.data.status === 401 || 400) && !err.response.data.isSuccess)
    //       // toast.error(err.response.data.message)
    //       Object.keys(err.response.data.message).forEach((key) => {
    //         // Set the error message for each field
    //         setError(key, {
    //           type: 'manual',
    //           message: err.response.data.message[key],
    //         })
    //       })
    //     setIsLoading(false)
    //   })
  }

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Profile</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
              <CCol md={6}>
                <CustomInput
                  name="name"
                  type="text"
                  label="Name"
                  {...register('name', { required: 'Name is required' })}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                  defaultValue={getValues('name')}
                  onChange={(e) =>
                    handleInputChange('name', e.target.value, { clearErrors, setValue })
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
                  name="mo_no"
                  type="text"
                  label="Mobile No"
                  {...register('mo_no', { required: 'Mobile No is required' })}
                  error={!!errors.mo_no}
                  helperText={errors.mo_no && errors.mo_no.message}
                  defaultValue={getValues('mo_no')}
                  onChange={(e) =>
                    handleInputChange('mo_no', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>

              <CCol md={6}>
                <CustomInput
                  name="mo_no"
                  type="text"
                  label="Mobile No"
                  {...register('mo_no', { required: 'Mobile No is required' })}
                  error={!!errors.mo_no}
                  helperText={errors.mo_no && errors.mo_no.message}
                  defaultValue={getValues('mo_no')}
                  onChange={(e) =>
                    handleInputChange('mo_no', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>

              <CCol md={6}>
                <CustomInput
                  name="experience"
                  type="text"
                  label="Experience (Years)"
                  {...register('experience', { required: 'Experience is required' })}
                  error={!!errors.experience}
                  helperText={errors.experience && errors.experience.message}
                  defaultValue={getValues('experience')}
                  onChange={(e) =>
                    handleInputChange('experience', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>

              <CCol md={6}>
                <CustomInput
                  name="specialist"
                  type="text"
                  label="Specialist"
                  {...register('specialist', { required: 'Specialist is required' })}
                  error={!!errors.specialist}
                  helperText={errors.specialist && errors.specialist.message}
                  defaultValue={getValues('specialist')}
                  onChange={(e) =>
                    handleInputChange('specialist', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>

              <CCol md={6}>
                <CustomInput
                  name="work_place"
                  type="text"
                  label="Work Place Name"
                  {...register('work_place', { required: 'Work Place Name is required' })}
                  error={!!errors.work_place}
                  helperText={errors.work_place && errors.work_place.message}
                  defaultValue={getValues('work_place')}
                  onChange={(e) =>
                    handleInputChange('work_place', e.target.value, { clearErrors, setValue })
                  }
                />
              </CCol>

              <CCol md={6}>
                <CustomInput
                  name="work_place_address"
                  type="text"
                  label="Work Place Address"
                  {...register('work_place_address', {
                    required: 'Work Place Address is required',
                  })}
                  error={!!errors.work_place_address}
                  helperText={errors.work_place_address && errors.work_place_address.message}
                  defaultValue={getValues('work_place_address')}
                  onChange={(e) =>
                    handleInputChange('work_place_address', e.target.value, {
                      clearErrors,
                      setValue,
                    })
                  }
                />
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
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile