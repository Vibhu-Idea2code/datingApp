import { TextField } from '@mui/material'
import React from 'react'

const Form = () => {
  return (
    <div>
      <TextField
            label="email"
            placeholder="enter your email"
            variant="outlined"
            fullwidth
          />
    </div>
  )
}

export default Form
