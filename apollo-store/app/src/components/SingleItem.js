import React, { Component } from "react";
import { GiCrossMark } from "react-icons/gi";

class SingleItem extends Component {
  checkType = (type, value) => {
    return type === "swatch"
      ? {
          backgroundColor: `${value}`,
          width: "45px",
          height: "45px",
          borderRadius: "50%",
        }
      : null;
  };

  setClassName = (attributeName, value) => {
    return `${
      this.props.selectedAttributes.find(
        (attribute) =>
          attribute.name === attributeName && attribute.value === value
      )
        ? "active-attribute btn attributes-control-btn"
        : "btn attributes-control-btn"
    } ${this.props.inStock ? null : "disabled"}`;
  };

  displayValue = (type, value, attributeName) => {
    return type !== "swatch" ? (
      value
    ) : this.props.selectedAttributes.find(
        (attribute) =>
          attribute.name === attributeName && attribute.value === value
      ) ? (
      <GiCrossMark className="color-icon" />
    ) : null;
  };

  render() {
    const { id: attributeID, name: attributeName, type } = this.props.attribute;
    const { value } = this.props.item;

    return (
      <button
        style={this.checkType(type, value)}
        type="button"
        onClick={() => {
          this.props.setAttributes(attributeName, value, type, attributeID);
        }}
        className={this.setClassName(attributeName, value)}
      >
        {this.displayValue(type, value, attributeName)}
      </button>
    );
  }
}

export default SingleItem;
