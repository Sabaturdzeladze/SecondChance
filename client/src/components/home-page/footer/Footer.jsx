import React from "react";
import { Link } from "react-router-dom";
// import { Consumer } from "../../../context-api/Context";

export const Footer = () => {
  return (
    <footer>
      <div className="footer--container">
        <div className="footer--container-shop">
          <div className="footer-header">Shopping</div>
          
          <div className="footer--container-shop-items">
            <div className="footer-div">
              <Link to="/products/search?gender=women">Women</Link>
            </div>
            <div className="footer-div">
              <Link to="/products/search?gender=men">Men</Link>
            </div>
            <div className="footer-div">
              <Link to="/products/search?category=bags">Bags</Link>
            </div>
            <div className="footer-div">
              <Link to="/products/search?category=accessories">
                Accessories
              </Link>
            </div>
            <div className="footer-div">
              <Link to="/">Sale</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-container__brand">
          <div>
            <i className="fab fa-pied-piper-hat" />
          </div>
          <small className="footer-header">SecondChance</small>
          <div className="footer-container__header">
            Clothes Worth Living 
          </div>
        </div>
        
        <div className="footer-contact">
          <div className="footer-header">My Account</div>
          <div className="footer-contact__items">
            <div className="footer-div">
              <Link to=""><i className="fas fa-shopping-cart"></i> My Cart</Link>
            </div>
            <div className="footer-div">
              <Link to=""><i className="fas fa-history my-account__logo" /> Order History</Link>
            </div>
            <div className="footer-div">
              <Link to="/dashboard/wishlist"><i className="far fa-heart my-account__logo" /> Wishlist</Link>
            </div>
            <div className="footer-div">
              <Link to=""><i className="fas fa-sign-out-alt my-account__logo" /> Log out</Link>
            </div>
          </div>

        </div>
      </div>
      <div className="footer3">
        <div className="footer-container__payments">
          <div className="aboutus">Secure Online Shopping</div>
          <img
            src="https://www.martinlawgroupllc.com/wp-content/uploads/sites/2557/2018/01/Payment-Methods.png"
            alt="visa/master"
          />
        </div>
        <div className="footer-container__icons">
          <div className="footer-header">Follow SecondChance</div>
          <div className="footer-container__icons-items">
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
            </Link></div>
        </div>
        <div className="aboutus">
          <div>&copy; TecHub {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
};
