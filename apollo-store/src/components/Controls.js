import React, { Component } from "react";
import { BsCart } from "react-icons/bs";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { ProductConsumer } from "../context";

class Controls extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const {
            totalAmount,
            openAdditionalModal,
            mainCurrency,
            currencyModalOpen,
          } = value;

          return (
            <div className={this.props.value}>
              <div className="control-center">
                <div className="control-icon currency-icon">{mainCurrency}</div>
                {currencyModalOpen ? (
                  <RiArrowDropUpLine className="control-icon arrow-bag" />
                ) : (
                  <RiArrowDropDownLine
                    className="control-icon arrow-bag"
                    onClick={() => openAdditionalModal("currency")}
                  />
                )}
                <div
                  className="bag-container"
                  onClick={() => openAdditionalModal("bag")}
                >
                  <BsCart className="control-icon control-bag" />
                  {totalAmount > 0 && (
                    <div className="amount-container">
                      <p className="total-amount">{totalAmount}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default Controls;
