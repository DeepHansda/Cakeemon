import React from 'react'
import { BsWhatsapp } from 'react-icons/bs';
import {FiLinkedin,FiFacebook,FiGithub } from "react-icons/fi";
import './socialContactBar.css'

function SocialContactBar() {
    return <div className="social-contact-container">
        <li><a href="https://api.whatsapp.com/send?phone=+919647750384" target="_blank"><p><BsWhatsapp/></p></a></li>
        <li><a href="https://www.linkedin.com/in/deep-hansda-44627a20a/" target="_blank"><p><FiLinkedin/></p></a></li>
        <li><a href="https://github.com/DeepHansda" target="_blank"><p><FiGithub /></p></a></li>
        <li><a href="https://www.facebook.com/deep.hansda.7146" target="_blank"><p><FiFacebook /></p></a></li>
    </div>;
}

export default SocialContactBar;