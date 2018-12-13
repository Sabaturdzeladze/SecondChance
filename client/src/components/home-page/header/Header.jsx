import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../../context-api/Context";

const Account = props => {
  // console.log(!props.loggedIn)
  return !props.value.isLogged ? (
    <>
      <Link to="/login">Log in</Link>
      <Link to="/register">Register</Link>
    </>
  ) : (
    <>
      <Link
        to="/"
        onClick={() => {
          props.value.onStateChange({ user: {}, isLogged: false });
        }}
      >
        Log out
      </Link>
      <Link to="/dashboard">My Account</Link>
    </>
  );
};

class Header extends Component {
  state = {};

  render() {
    return (
      <Consumer>
        {value => (
          <header>
            <div className="shipping-info">
              <p>Free 2 day shipping & Return!</p>
            </div>

            <div className="headerTop">
              <div className="headerTop--search">
                <form>
                  <input
                    type="text"
                    placeholder="Search for products"
                    name="search"
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <i className="fa fa-search" />
                  </button>
                </form>
              </div>
              <div className="headerTop--logo">
                {/* <img src="./logo.jpg" alt="" className="logo-image" /> */}
                <h1 className="header-heading">Second Chance</h1>
              </div>
              <div className="headerTop--account-cart">
                <div className="headerTop--account-cart__items">
                  <Account value={value} />
                </div>
              </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Clothing
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <div className="dropdown-menu--flexed">
                        <ul className="dropdown-menu--flexed__category">
                          <Link
                            className="dropdown-item dropdown-menu--flexed__category--title"
                            to="/products/search?gender=men&category=clothing"
                          >
                            Men
                          </Link>
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/products/search?gender=men&subCategory=polos"
                            >
                              Polos
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=outerwear_coats">
                              Coats & Outerwears
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=sweaters_hoodies">
                              Sweaters & Hoodies
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=shirts">
                              Shirts
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=Tshirts_tops">
                              T-shirts & Tops
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=jeans">
                              Jeans
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=pants">
                              Pants
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=joggers_shorts">
                              Joggers & Shorts
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=winter_pants">
                              Winter Pants
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=winter_jacket">
                              Winter Jacket
                            </Link>
                          </li>
                        </ul>
                        <ul className="dropdown-menu--flexed__category">
                          <Link
                            className="dropdown-item dropdown-menu--flexed__category--title"
                            to="/products/search?gender=women&category=clothing"
                          >
                            Women
                          </Link>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=dresses_skirts">
                              Dresses & Skirts
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=coats_outwears">
                              Coats & Outerwears
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=sweaters_hoodies">
                              Sweaters & Hoodies
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=shirts">
                              Shirts
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=Tshirts_tops">
                              T-shirts & Tops
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=jeans">
                              Jeans
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=pants">
                              Pants
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=joggers_shorts">
                              Joggers & Shorts
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=winter_pants">
                              Winter Pants
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=winter_jacket">
                              Winter Jacket
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Shoes
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <div className="dropdown-menu--flexed">
                        <ul className="dropdown-menu--flexed__category">
                          <Link
                            className="dropdown-item dropdown-menu--flexed__category--title"
                            to="/products/search?gender=men&category=shoes"
                          >
                            Men
                          </Link>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=sneakers_athletics">
                              Sneakers & Athletics
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=boots">
                              Boots
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=sandals">
                              Sandals
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=flats">
                              Flats
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=men&subCategory=heels">
                              Heels
                            </Link>
                          </li>
                        </ul>
                        <ul className="dropdown-menu--flexed__category">
                          <Link
                            className="dropdown-item dropdown-menu--flexed__category--title"
                            to="/products/search?gender=women&category=shoes"
                          >
                            Women
                          </Link>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=sneakers_athletics">
                              Sneakers & Athletics
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=boots">
                              Boots
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=sandals">
                              Sandals
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=oxfords">
                              Oxfords
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/products/search?gender=women&subCategory=loafers">
                              Loafers
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Accesories
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <Link className="dropdown-item" to="/">
                        Hats
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Belts
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Sunglasses
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Watches
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Jewelry
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Wallets
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Bags
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <Link className="dropdown-item" to="/">
                        Handbags
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Backpacks
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Luggage
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Deals & Sales
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        )}
      </Consumer>
    );
  }
}

export default Header;