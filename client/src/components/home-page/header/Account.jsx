import React from "react";
import { Link } from "react-router-dom";
import LoginModal from "../../auth/LoginModal";

export class Account extends React.Component {
  state = {
    openLogin: false,
    width: window.innerWidth
  };

  onClickHandler = e => {
    this.setState(() => ({ openLogin: !this.state.openLogin }));
  };

  onLoginClose = () => this.setState(() => ({ openLogin: false }));

  render() {
    const { user } = this.props;
    return !this.props.value.isLogged ? (
      <>
        {this.state.width > 500 ? (
          <button className="login-modal" onClick={this.onClickHandler}>
            Login
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <Link to="/register">Register</Link>
        <LoginModal isOpen={this.state.openLogin} onClose={this.onLoginClose} />
      </>
    ) : (
      <>
        {user.username !== "Admin" && (
          <Link to="/dashboard/cart" className="cart-link">
            <i className="fas fa-shopping-cart" />{" "}
            <span className="cart-length">{user.cart.length}</span>
          </Link>
        )}
        <Link to={user.isAdmin ? `/admin/messenger` : `/dashboard`}>
          Dashboard
        </Link>
        <Link
          to="/"
          onClick={() => {
            this.props.value.onStateChange({ user: {}, isLogged: false });
            localStorage.clear();
            document.getElementById("conversationText").className =
              "conversation-hide";
            document.getElementById("conversationBtn").className =
              "btn conversation-open";
          }}
        >
          <i className="fas fa-sign-out-alt" style={{ fontSize: "16px" }} />{" "}
          Logout
        </Link>
      </>
    );
  }
}
