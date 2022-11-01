import { Container, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react'

function OrderStepper({activeStep}) {
    const steps = ["Shipping address","Review your order","Payment details","Confirm Order"];
  return (
    <Container><Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
    {steps.map((label) => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper></Container>
  )
}

export default OrderStepper