import React from "react";
import { Link } from "react-router-dom";
// import { Consumer } from "../../../context-api/Context";

export const Footer = () => {
  return (
    <footer>
      <div className="footer--container">
        <div className="footer--container-shop">
          <div className="footer-header">SHOP</div>
          <div className="footer-container__shop--container">
            <div className="footer-div">
              <Link to="/products/search?gender=women">WOMEN</Link>
            </div>
            <div className="footer-div">
              <Link to="/products/search?gender=men">MEN</Link>
            </div>
            <div className="footer-div">
              <Link to="/products/search?category=bags">BAGS</Link>
            </div>
            <div className="footer-div">
              <Link to="/products/search?category=accessories">
                ACCESSORIES
              </Link>
            </div>
            <div className="footer-div">
              <Link to="/">SALE</Link>
            </div>
          </div>
        </div>
        <div className="footer-container__brand">
          <div>
            <i className="fab fa-pied-piper-hat" />
          </div>
          <small className="footer-header">SecondChance</small>
          <div className="footer-container__header">
            Clothes worth living for
          </div>
        </div>
        <div className="footer-contact">
          <div className="footer-header">My Account</div>
          <div className="footer-div">
            <i className="fas fa-shopping-cart my-account__logo"> My Cart</i>
          </div>
          <div className="footer-div">
            <i className="fas fa-history my-account__logo" /> Order History{" "}
          </div>
          <div className="footer-div">
            <i className="far fa-heart my-account__logo" /> Wishlist{" "}
          </div>
          <div className="footer-div">
            <i className="fas fa-sign-out-alt my-account__logo" /> Log out{" "}
          </div>
        </div>
      </div>
      <div className="footer3">
        <div>
          <div className="aboutus">SECURE ONLINE SHOPPING</div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9xFHOvT3ccJ1u-I2mbjc1AiaT-qyREcmoam-V9V-7UpNV_PzVjQ"
            alt="visa/master"
            width="250px"
            height="50px"
          />
        </div>
        <div className="footer-container__icons">
          <div className="footer-header">Follow SecondChance</div>
          <Link to="/">
            <i className="fab fa-pinterest footerSM" />
          </Link>
          <Link to="/">
            <i className="fab fa-twitter footerSM" />
          </Link>
          <Link to="/">
            <i className="fab fa-instagram footerSM" />
          </Link>
          <Link to="/">
            <i className="fab fa-facebook footerSM" />
          </Link>
          <Link to="/">
            <i className="fab fa-youtube footerSM" />
          </Link>
        </div>
        <div className="aboutus">
          <div>About Us</div>
          <div>&copy;TecHub {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
};
