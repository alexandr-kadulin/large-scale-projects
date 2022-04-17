import React, { Component } from "react";
import { ProductConsumer } from "../context";
import CartItem from "./CartItem";
import CartTotalCenter from "./CartTotalCenter";
import OverlayTotalCenter from "./OverlayTotalCenter";

class CartPlaceholder extends Component {
  displayTitle = (totalAmount) => {
    return this.props.placeholder === "cart" ? (
      <h2>Cart</h2>
    ) : (
      <h2>
        <span>My Bag,</span> {totalAmount}{" "}
        {`${totalAmount > 1 ? "items" : "item"}`}
      </h2>
    );
  };

  checkPlaceholder = (
    clearCart,
    closeAdditionalModal,
    mainCurrency,
    cartTotal
  ) => {
    return this.props.placeholder === "cart" ? (
      <CartTotalCenter
        clearCart={clearCart}
        mainCurrency={mainCurrency}
        cartTotal={cartTotal}
      />
    ) : (
      <OverlayTotalCenter
        mainCurrency={mainCurrency}
        cartTotal={cartTotal}
        closeAdditionalModal={closeAdditionalModal}
      />
    );
  };

  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const {
            cart,
            cartTotal,
            clearCart,
            handleCount,
            removeItem,
            handlePictureIndex,
            mainCurrency,
            totalAmount,
            closeAdditionalModal,
          } = value;

          return (
            <section className={this.props.value}>
              <div className="section-title">
                {this.displayTitle(totalAmount)}
              </div>
              {cart.map((item, index) => {
                return (
                  <CartItem
                    key={item.id + index}
                    item={item}
                    mainCurrency={mainCurrency}
                    handleCount={handleCount}
                    removeItem={removeItem}
                    handlePictureIndex={handlePictureIndex}
                    dimension={this.props.dimension}
                  />
                );
              })}
              {this.checkPlaceholder(
                clearCart,
                closeAdditionalModal,
                mainCurrency,
                cartTotal
              )}
            </section>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default CartPlaceholder;
