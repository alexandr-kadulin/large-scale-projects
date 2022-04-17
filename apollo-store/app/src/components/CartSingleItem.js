import React, { Component } from "react";
import { GiCrossMark } from "react-icons/gi";

class CartSingleItem extends Component {
  checkType = (type, value) => {
    return type === "swatch"
      ? {
          backgroundColor: `${value}`,
          width: `${this.props.dimension}`,
          height: `${this.props.dimension}`,
          borderRadius: "50%",
        }
      : null;
  };

  setClassName = (attributeName, value) => {
    return `${
      this.props.selectedAttributes.length > 0
        ? this.props.selectedAttributes.find(
            (attribute) =>
              attribute.name === attributeName && attribute.value === value
          )
          ? "active-attribute btn attributes-control-btn disabled"
          : "btn attributes-control-btn disabled"
        : this.props.index === 0
        ? "active-attribute btn attributes-control-btn disabled"
        : "btn attributes-control-btn disabled"
    }`;
  };

  displayValue = (type, value, attributeName) => {
    return type !== "swatch" ? (
      value
    ) : this.props.selectedAttributes.length > 0 ? (
      this.props.selectedAttributes.find(
        (attribute) =>
          attribute.name === attributeName && attribute.value === value
      ) ? (
        <GiCrossMark className="color-icon" />
      ) : null
    ) : this.props.index === 0 ? (
      <GiCrossMark className="color-icon" />
    ) : null;
  };

  render() {
    const { value } = this.props.item;
    const { name: attributeName, type } = this.props.attribute;

    return (
      <button
        style={this.checkType(type, value)}
        type="button"
        className={this.setClassName(attributeName, value)}
      >
        {this.displayValue(type, value, attributeName)}
      </button>
    );
  }
}

export default CartSingleItem;
