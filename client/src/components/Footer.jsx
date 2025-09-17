import React from "react";
import { Link } from "react-router-dom";
import SocialIcons from "./common/SocialIcons";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-300 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link to="terms-conditions">
          <p className="link link-hover">Terms and Conditions</p>
        </Link>
        <Link to="cancellation-refund">
          <p className="link link-hover">Cancellation and Refund</p>
        </Link>
        <Link to="shipping-delivery">
          <p className="link link-hover">Shipping Delivery</p>
        </Link>
        <Link to="privacy-policy">
          <p className="link link-hover">Privacy Policy</p>
        </Link>
        <Link to="contact-us">
          <p className="link link-hover">Contact us</p>
        </Link>
      </nav>

      <SocialIcons/>
      
      <aside>
          Copyright © {new Date().getFullYear()} - All right reserved by Star
          Tribe
      </aside>
    </footer>
  );
};

export default Footer;
