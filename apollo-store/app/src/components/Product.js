import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { ProductConsumer } from "../context";
import Price from "./Price";

class Product extends Component {
  render() {
    const { id, name, gallery, prices, inStock, brand } = this.props.product;

    return (
      <ProductConsumer>
        {(value) => {
          const { openModal, addToCart, mainCurrency } = value;

          return (
            <article className={`${inStock ? "card" : "card card-layout"}`}>
              <div className="card-img-container">
                <Link
                  to={`/product/${id}`}
                  key={id + new Date().getTime().toString()}
                  className="route-link"
                >
                  <img src={gallery[0]} alt="card" className="img" />
                </Link>
                <div
                  className={`${
                    inStock ? "card-text" : "card-text show-card-text"
                  }`}
                >
                  out of stock
                </div>
                {inStock && (
                  <button
                    type="button"
                    className="card-bag"
                    onClick={() => {
                      addToCart(this.props.product);
                      openModal(this.props.product);
                    }}
                  >
                    <BsCart />
                  </button>
                )}
              </div>
              <Link
                to={`/product/${id}`}
                key={id + new Date().getTime().toString()}
                className="route-link"
              >
                <div className="card-info">
                  <p>
                    {brand} {name}
                  </p>
                  <Price prices={prices} mainCurrency={mainCurrency} />
                </div>
              </Link>
            </article>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default Product;
