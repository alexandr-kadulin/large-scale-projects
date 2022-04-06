import React, { Component } from "react";

class Price extends Component {
  displayPrice = (prices, mainCurrency) => {
    return prices[
      prices.findIndex((price) => price.currency.symbol === mainCurrency)
    ].amount;
  };

  render() {
    return (
      <span>
        {this.props.mainCurrency}{" "}
        {this.displayPrice(this.props.prices, this.props.mainCurrency)}
      </span>
    );
  }
}

export default Price;
