// formUtils.js
export const handleInputChange = (name, value, { clearErrors, setValue }) => {
    // Clear the error for the specific field when the value is not null
    clearErrors(name)
    // Set the value for the field
    setValue(name, value)
  }