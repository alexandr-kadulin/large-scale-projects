import React, { Component } from "react";
import { ProductConsumer } from "../context";
import EmptyCart from "./EmptyCart";
import CartPlaceholder from "./CartPlaceholder";

class BagModal extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { cart, bagModalOpen, closeAdditionalModal } = value;

          if (!bagModalOpen) {
            return null;
          } else {
            if (cart.length > 0) {
              return (
                <div
                  className="bag-modal-container"
                  onClick={(e) => closeAdditionalModal(e, "bag")}
                >
                  <div className="bag-modal-position">
                    <div className="bag-modal">
                      <CartPlaceholder
                        placeholder={"bagModal"}
                        dimension={"25px"}
                        value={"cart-section overlay"}
                      />
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="bag-modal-container"
                  onClick={(e) => closeAdditionalModal(e, "bag")}
                >
                  <div className="bag-modal-position">
                    <div className="bag-modal">
                      <EmptyCart />
                    </div>
                  </div>
                </div>
              );
            }
          }
        }}
      </ProductConsumer>
    );
  }
}

export default BagModal;
