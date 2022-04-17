import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { ProductConsumer } from "../context";
import { CURRENCIES_QUERY } from "../queries/queries";

class CurrencyModal extends Component {
  render() {
    if (this.props.data.loading) {
      return <div className="loading"></div>;
    }
    const { currencies } = this.props.data;

    return (
      <ProductConsumer>
        {(value) => {
          const { closeAdditionalModal, currencyModalOpen, handleCurrency } =
            value;

          if (!currencyModalOpen) {
            return null;
          } else {
            return (
              <div
                className="currency-modal-container"
                onClick={(e) => closeAdditionalModal(e, "currency")}
              >
                <div className="currency-modal-position">
                  <div className="currency-modal">
                    {currencies.map((currency, index) => {
                      const { label, symbol } = currency;

                      return (
                        <div key={label + index} className="currencies">
                          <div
                            className="currency"
                            onClick={(e) => {
                              closeAdditionalModal(e, "currency");
                              handleCurrency(symbol);
                            }}
                          >
                            {symbol} {label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

export default graphql(CURRENCIES_QUERY)(CurrencyModal);
