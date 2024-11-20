import React from 'react'
import { Container, Divider } from "@mui/material";
import { FiEye, FiHelpCircle, FiTruck } from "react-icons/fi";
import { BsFillBasketFill } from "react-icons/bs";

function Additional() {
  return (
    <Container maxWidth="lg">
          <div className="addi-container">
            <ul className="addi-list">
              <li className="addi-item">
                <div className="addi-icon">
                    <BsFillBasketFill/>
                </div>
                <div className="addi-title">
                  <h6>Local Pickups.</h6>
                </div>
                <div className="addi-para">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima unde asperiores molestiae quo.</p>
                </div>
              </li>
              <Divider orientation="vertical" flexItem />
              <li className="addi-item">
                <div className="addi-icon">
                  <FiTruck/>
                </div>
                <div className="addi-title">
                  <h6>Same Day Delivery.</h6>
                </div>
                <div className="addi-para">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima unde asperiores molestiae quo, incidunt repellat sapiente.</p>
                </div>
              </li>
              <Divider orientation="vertical" flexItem />

              <li className="addi-item">
                <div className="addi-icon">
                  <FiHelpCircle/>
                </div>
                <div className="addi-title">
                  <h6>Help & Support.</h6>
                </div>
                <div className="addi-para">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima unde asperiores .</p>
                </div>
              </li>
              <Divider orientation="vertical" flexItem />

              <li className="addi-item">
                <div className="addi-icon">
                    <FiEye/>
                </div>
                <div className="addi-title">
                    <h6>Helth & Safety Rules</h6>
                </div>
                <div className="addi-para">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima unde asperiores moles.</p> 
                </div>
              </li>

            </ul>
          </div>
        </Container>
  )
}

export default Additional