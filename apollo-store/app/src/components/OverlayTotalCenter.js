import React, { Component } from "react";
import { Link } from "react-router-dom";

class OverlayTotalCenter extends Component {
  render() {
    return (
      <>
        <div className="total-center">
          <div className="total">
            <h2>Total</h2>
          </div>
          <span>
            {this.props.mainCurrency} {this.props.cartTotal}
          </span>
        </div>
        <div className="overlay-center">
          <Link to="/cart">
            <button
              type="button"
              className="btn bag-btn"
              onClick={(e) => this.props.closeAdditionalModal(e, "bag")}
            >
              view bag
            </button>
          </Link>
          <button type="button" className="btn bag-btn check-out-btn disabled">
            check out
          </button>
        </div>
      </>
    );
  }
}

export default OverlayTotalCenter;
