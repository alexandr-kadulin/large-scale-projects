import React, { Component } from "react";
import { Link } from "react-router-dom";

class CartTotalCenter extends Component {
  render() {
    return (
      <div className="cart-total-center">
        <Link to="/">
          <button
            type="button"
            className="btn clear-cart-btn"
            onClick={() => this.props.clearCart()}
          >
            clear cart
          </button>
        </Link>
        <button
          type="button"
          className="btn clear-cart-btn check-out-btn disabled"
        >
          check out
        </button>
        <div className="cart-total-info">
          Total : {this.props.mainCurrency} {this.props.cartTotal}
        </div>
      </div>
    );
  }
}

export default CartTotalCenter;
