import React, { Component } from "react";
import { ProductConsumer } from "../context";
import EmptyCart from "./EmptyCart";
import CartPlaceholder from "./CartPlaceholder";

class Cart extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { cart } = value;

          if (cart.length > 0) {
            return (
              <CartPlaceholder
                placeholder={"cart"}
                dimension={"45px"}
                value={"cart-section"}
              />
            );
          } else {
            return <EmptyCart />;
          }
        }}
      </ProductConsumer>
    );
  }
}

export default Cart;
