import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Consumer } from "../../context-api/Context";
import Spinner from "../common/Spinner";
import Success from "../common/Success";

export default class Checkout extends Component {
  state = {
    loading: false
  };

  totalCalculator = cart => {
    let total = 0;
    cart.forEach(item => {
      let increment = item.priceSale ? item.priceSale : item.price;
      total += parseInt(increment);
    });
    return total;
  };

  grandTotal = total => {
    return total >= 25 ? total : total + 4.99;
  };

  onClickHandler = value => {
    this.setState(() => ({ loading: true }));
    let user = value.user;
    user.balance = parseInt(user.balance);
    user.balance -= this.grandTotal(this.totalCalculator(value.user.cart));
    user.boughtItems = [...user.cart, ...user.boughtItems];
    user.cart = [];
    localStorage.setItem("user", JSON.stringify(user));
    axios
      .post(`/api/users/${value.user.id}/dashboard/checkout`, {
        balance: user.balance
      })
      .then(res => {
        const newest = res.data.products.slice(0, 4);
        const saleItems = res.data.products
          .filter(item => item.priceSale > 0);
        this.setState(() => ({ loading: false }));
        value.onStateChange({ user: res.data.user, newest, saleItems });
      });
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { user } = value;
          return !user.username ? (
            <Redirect to="/login" />
          ) : user.cart.length ? (
            <div className="container">
              <h2 style={{ textAlign: "center", padding: "20px" }}>
                Shipping Address
              </h2>
              <div className="row">
                <form action="#">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="firstname">Firstname</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        placeholder="Firstname"
                        required=""
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="lastname">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        placeholder=""
                        required=""
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="AddressLine1">Address Line 1</label>
                      <input
                        type="text"
                        className="form-control"
                        id="AddressLine1"
                        placeholder="Address Line 1"
                        required=""
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="Address Line 1">Address Line 2</label>
                      <input
                        type="text"
                        className="form-control"
                        id="AddressLine2"
                        placeholder="Address Line 2"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="city">City / Town</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="city"
                        required=""
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="State">State / Province / Region</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="State / Province / Region"
                        required=""
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="zip">Zip / Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder="Zip ore Postal Code"
                        required=""
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="Country">Country</label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country"
                        className="form-control"
                      >
                        <option value="selected">
                          (please select a country)
                        </option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AS">American Samoa</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antarctica</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BA">Bosnia and Herzegowina</option>
                        <option value="BW">Botswana</option>
                        <option value="BV">Bouvet Island</option>
                        <option value="BR">Brazil</option>
                        <option value="IO">
                          British Indian Ocean Territory
                        </option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CV">Cape Verde</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CX">Christmas Island</option>
                        <option value="CC">Cocos (Keeling) Islands</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CD">
                          Congo, the Democratic Republic of the
                        </option>
                        <option value="CK">Cook Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CI">Cote d'Ivoire</option>
                        <option value="HR">Croatia (Hrvatska)</option>
                        <option value="CU">Cuba</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="TP">East Timor</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FK">Falkland Islands (Malvinas)</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="FX">France, Metropolitan</option>
                        <option value="GF">French Guiana</option>
                        <option value="PF">French Polynesia</option>
                        <option value="TF">French Southern Territories</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GL">Greenland</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GU">Guam</option>
                        <option value="GT">Guatemala</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HM">Heard and Mc Donald Islands</option>
                        <option value="VA">
                          Holy See (Vatican City State)
                        </option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran (Islamic Republic of)</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="KP">
                          Korea, Democratic People's Republic of
                        </option>
                        <option value="KR">Korea, Republic of</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">
                          Lao People's Democratic Republic
                        </option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libyan Arab Jamahiriya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MO">Macau</option>
                        <option value="MK">
                          Macedonia, The Former Yugoslav Republic of
                        </option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MQ">Martinique</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="YT">Mayotte</option>
                        <option value="MX">Mexico</option>
                        <option value="FM">
                          Micronesia, Federated States of
                        </option>
                        <option value="MD">Moldova, Republic of</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="MS">Montserrat</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="AN">Netherlands Antilles</option>
                        <option value="NC">New Caledonia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="NU">Niue</option>
                        <option value="NF">Norfolk Island</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PW">Palau</option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PN">Pitcairn</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="QA">Qatar</option>
                        <option value="RE">Reunion</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russian Federation</option>
                        <option value="RW">Rwanda</option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint LUCIA</option>
                        <option value="VC">
                          Saint Vincent and the Grenadines
                        </option>
                        <option value="WS">Samoa</option>
                        <option value="SM">San Marino</option>
                        <option value="ST">Sao Tome and Principe</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SK">Slovakia (Slovak Republic)</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="GS">
                          South Georgia and the South Sandwich Islands
                        </option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SH">St. Helena</option>
                        <option value="PM">St. Pierre and Miquelon</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SJ">
                          Svalbard and Jan Mayen Islands
                        </option>
                        <option value="SZ">Swaziland</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syrian Arab Republic</option>
                        <option value="TW">Taiwan, Province of China</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania, United Republic of</option>
                        <option value="TH">Thailand</option>
                        <option value="TG">Togo</option>
                        <option value="TK">Tokelau</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TC">Turks and Caicos Islands</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="UM">
                          United States Minor Outlying Islands
                        </option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Viet Nam</option>
                        <option value="VG">Virgin Islands (British)</option>
                        <option value="VI">Virgin Islands (U.S.)</option>
                        <option value="WF">Wallis and Futuna Islands</option>
                        <option value="EH">Western Sahara</option>
                        <option value="YE">Yemen</option>
                        <option value="YU">Yugoslavia</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>




              <div className="checkout-cart-total">
                <table className="cart-total__table">
                  <tbody>
                    <tr>

                      <td>
                        <h5>Subtotal <br /> Estimated shipping <br /> </h5>
                        <h3>Total</h3>
                      </td>

                      <td className="text-right">
                        <h5><strong>{this.totalCalculator(user.cart).toFixed(2)}$
                          <br />{this.totalCalculator(user.cart) >= 25 ? "0.00$" : "4.99$"}{" "} </strong>
                        </h5>
                        <h3>{this.grandTotal(this.totalCalculator(user.cart)).toFixed(2)}$
                        </h3>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Link to="/dashboard/cart" className="back-to-cart__button">
                          <i className="fas fa-shopping-cart"></i> Back To Cart
                        </Link>
                      </td>
                      <td>
                        <button className="checkout-button" onClick={e => this.onClickHandler(value)}>
                          Submit Order
                        </button>
                      </td>
                    </tr>

                  
                  </tbody>
                </table>
              </div>
            </div>

          ) : this.state.loading ? (
            <Spinner />
          ) : (
                  <div
                    style={{ width: "50%", margin: "0 auto", textAlign: "center" }}
                  >
                    <h2 style={{ margin: "20px 0" }}>
                      Your order has been placed successfully <br />
                      <Success />
                    </h2>
                    <Link style={{ display: "block" }} to="/">
                      Home
              </Link>
                    <Link style={{ display: "block" }} to="/dashboard">
                      My Account
              </Link>
                  </div>
                );
        }}
      </Consumer>
    );
  }
}
