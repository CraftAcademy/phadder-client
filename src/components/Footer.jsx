import React from "react";
import "../css/style.css";

const Footer = () => {
  return (
    <div>
      <div id="footer">
        <div id="logo-bg">
          <div id="phadder-logo" />
        </div>
        <div>
          <h3 id="footer-title">Contact</h3>
          <p id="footer-links">Support</p>
          <p id="footer-links">Facebook</p>
          <p id="footer-links">Instagram</p>
        </div>
        <div>
          <h3 id="footer-title">Platform</h3>
          <p id="footer-links">About</p>
          <p id="footer-links">Pricing</p>
        </div>
        <div>
          <h3 id="footer-title">Resources</h3>
          <p id="footer-links">Resources</p>
          <p id="footer-links">User Stories</p>
        </div>
        <div>
          <h3 id="footer-title">News</h3>
          <p id="footer-links">Latest News</p>
        </div>
      </div>
      <div id="footer-bot">Made with Love by CraftAcademy</div>
    </div>
  );
    
};

export default Footer;
