import { Fragment } from "react";
import MetaData from "../../Components/Utils/MetaData";
import { Box, Container, Divider, Typography } from "@mui/material";
import img from "../../assets/img.jpg"


function AboutUs() {
  const style = {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    mt: 5,
    textAlign: "center",
    "& h5": {
      fontFamily: "'Poppins',sans-serif",
      fontWeight: "bold",
      textDecoration: "underline",
    },
    "& img": {
      maxWidth: "100%",
    },
  };
  return (
    <Fragment>
      <MetaData title="About Us." />

      <div class="about-section">
        <Container sx={{ margin: "20px auto" }}>
          <Typography
            variant="h2"
            sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: "bold" }}
          >
            About Us.
          </Typography>
          <Divider />
          <Container
            sx={{
              textAlign: "center",
              display: { md: "flex", xs: "block" },
              "& div": { margin: "50px 0" },
              "& div h4": {
                fontFamily: "'Poppins',sans-serif",
                fontWeight: "bold",
              },
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
                Open Monday to Friday 12pm to 10pm <br /> Saturday to Sunday
                12pm to 11pm
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

          <Box maxWidth="sm" sx={{ marginTop: "20px" }}>
            <Typography variant="h4">About Me</Typography>
            <Divider />
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              nulla ipsum asperiores ut veniam cumque tenetur, veritatis optio
              dolor, id quos, numquam nostrum et. Distinctio assumenda veniam
              quia? Rerum nemo autem necessitatibus libero iusto.
            </Typography>
          </Box>
          <Divider sx={{ mt: 5 }} />

          <Container sx={{ textAlign: "center", mt: 5 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: "bold",
              }}
            >
              Our Team
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              nulla ipsum asperiores ut veniam cumque tenetur.
            </Typography>
          </Container>

          <Container sx={style}>
            <Container>
              <div>
                <img src={img} alt="" />
              </div>
              <Typography variant="h5">Deep Hansda</Typography>

              <Typography variant="body1">Coder</Typography>
            </Container>
            <Container>
              <div>
                <img src={img} alt="" />
              </div>
              <Typography variant="h5">Deep Hansda</Typography>

              <Typography variant="body1">Shop Keeper</Typography>
            </Container>
            <Container>
              <div>
                <img src={img} alt="" />
              </div>
              <Typography variant="h5">Deep Hansda</Typography>

              <Typography variant="body1">Marketer</Typography>
            </Container>
          </Container>
        </Container>
      </div>
    </Fragment>
  );
}

export default AboutUs;
