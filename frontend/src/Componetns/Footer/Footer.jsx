import React from 'react'
import "./Footer.css"
import InstagramIcon from "../Assets/instagram-icon.jpg"
import WhatsappIcon from "../Assets/whatsapp-icon.jpg"
import Shopper from "../Assets/shopper.png"
// import Shopper from "./Assets"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={Shopper} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className='footer-links'>
        <li>Company</li>
        <li>Products</li>
        <li>Offers</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
            <img src={InstagramIcon}alt="" />
        </div>

        <div className="footer-icon-container">
            <img src={WhatsappIcon}alt="" />
        </div>

        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024 - All Right Reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
