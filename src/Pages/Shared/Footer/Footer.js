import React from "react";
import { Link } from "react-router-dom";
import footer from "../../../assets/images/footer.png";

const Footer = () => {
  return (
    <footer style={{ backgroundImage: `url(${footer})`, 
                    backgroundSize: "cover"
            }}
         className="p-10 mt-10">
        <div className="footer">
      <nav>
        <h6 className="text-lg footer-title">Services</h6>
        <Link to="/" className="link link-hover">Branding</Link>
        <Link to="/" className="link link-hover">Design</Link>
        <Link to="/" className="link link-hover">Marketing</Link>
        <Link to="/" className="link link-hover">Advertisement</Link>
      </nav>
      <nav>
        <h6 className="text-lg footer-title">Company</h6>
        <Link to="/" className="link link-hover">About us</Link>
        <Link to="/" className="link link-hover">Contact</Link>
        <Link to="/" className="link link-hover">Jobs</Link>
        <Link to="/" className="link link-hover">Press kit</Link>
      </nav>
      <nav>
        <h6 className="text-lg footer-title">Legal</h6>
        <Link to="/" className="link link-hover">Terms of use</Link>
        <Link to="/" className="link link-hover">Privacy policy</Link>
        <Link to="/" className="link link-hover">Cookie policy</Link>
      </nav>
    </div>
    <div className="text-center mt-10">
        <p>Copyright © 2022 - All right reserved</p>
    </div>

    </footer>
  );
};

export default Footer;
