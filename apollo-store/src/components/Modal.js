import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import Price from "./Price";

export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { modalOpen, closeModal, mainCurrency } = value;
          const { gallery, name, prices, brand } = value.modalProduct;

          if (!modalOpen) {
            return null;
          } else {
            return (
              <div className="modal-container">
                <div className="modal">
                  <h5 className="text-success">item added to the cart</h5>
                  <div className="modal-img-container">
                    <img src={gallery[0]} className="img" alt="product" />
                  </div>
                  <h5>
                    {brand} {name}
                  </h5>
                  <h5 className="text-muted">
                    price :{" "}
                    <Price prices={prices} mainCurrency={mainCurrency} />
                  </h5>
                  <Link to="/">
                    <button
                      type="button"
                      className="btn modal-btn"
                      onClick={() => closeModal()}
                    >
                      back to store
                    </button>
                  </Link>
                  <Link to="/cart">
                    <button
                      type="button"
                      className="btn modal-btn modal-cart-btn"
                      onClick={() => closeModal()}
                    >
                      go to cart
                    </button>
                  </Link>
                </div>
              </div>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}
