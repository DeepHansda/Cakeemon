import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import MetaData from "../../Components/Utils/MetaData";
import Query from "../../Components/Utils/Query";

function ContactUs() {
  return (
    <Fragment>
      <MetaData title="Contact"/>

      <Navbar />
      <Container sx={{ margin: "20px auto" }}>
        <Typography variant="h2" sx={{fontFamily: "'Poppins',sans-serif",fontWeight: "bold",}}>
          Contact Us.
        </Typography>
        <Divider/>
        <Container
          sx={{
            textAlign: "center",
            display: { md: "flex", xs: "block" },
            "& div": { margin: "50px 0" },
            "& div h4":{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: "bold",
            }
          }}
        >
          <Container>
            <Typography variant="h4">Address</Typography>
            <Divider />
            <Typography variant="body1">
              Maheshpur,Salanpur,Asansol,West Bengal , 713357
            </Typography>
          </Container>

          <Container>
            <Typography variant="h4">Hours</Typography>
            <Divider />
            <Typography variant="body1">
              Open Monday to Friday 12pm to 10pm <br /> Saturday to Sunday 12pm
              to 11pm
            </Typography>
          </Container>

          <Container>
            <Typography variant="h4">Contact</Typography>
            <Divider />
            <Typography variant="body1">
              <span>9647750384</span>
              <br />
              <span>deephansda921@gmail.com</span>
            </Typography>
          </Container>
        </Container>
        <Divider />
        <Query />
      </Container>
      <Footer />
    </Fragment>
  );
}

export default ContactUs;
