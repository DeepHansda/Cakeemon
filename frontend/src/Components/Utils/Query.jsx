import { Box, Button, CircularProgress, Container, TextField } from '@mui/material'
import React from 'react'
import SocialContactBar from './ContactBar/ContactBar'

function Query() {
  return (
    <div className="main-contact-container">
    <div className="address-container">
      <div className="address-details">
        <div className="address-container-heading">
          <h2>Come & Visit</h2>
        </div>
        <div className="address-container-para">
          <p>Maheshpur,Salanpur,Asansol,West Bengal , 713357</p>
        </div>
      </div>

      <div className="address-container-map">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d703.8247203321246!2d86.84474375743781!3d23.783331320660714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6def704429701%3A0x9f82d18c327f5436!2sRadha%20Krishna%20Temple%20-%20Maheshpur%2C%20Salanpur%2C%20Paschim%20Bardhaman!5e0!3m2!1sen!2sin!4v1661570108583!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
    <Container maxWidth="sm">
      <div className="address-container-heading">
        <h2>Any Query</h2>
      </div>
      <form>
        <Container>
          <TextField
            id="standard-basic"
            label="Full Name"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            type="email"
          />
          <TextField
            id="standard-basic"
            label="Phone Number"
            variant="outlined"
            type="number"
            margin="normal"
            fullWidth
            size="small"
          />
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <div>
            <Button
              variant="contained"
              type="submit"
              sx={{ borderRadius: 0, marginRight: "10px" }}
            >
              Submit
            </Button>

            <CircularProgress color="success" size="30px" />
          </div>

          <Box sx={{marginTop:'10px'}}>
            <SocialContactBar/>
          </Box>
        </Container>
      </form>
    </Container>
  </div>
  )
}

export default Query